<template>
  <div class="app-container">
    <div class="radio-box">
      <el-radio-group
        v-model="queryParams.type"
        @change="changeStatus"
        size="small"
      >
        <el-radio-button :label="'0'">海关商品备案 </el-radio-button>
        <el-radio-button :label="'1'">审核中</el-radio-button>
        <el-radio-button :label="'2'">审核驳回</el-radio-button>
        <el-radio-button :label="'3'">已归档</el-radio-button>
      </el-radio-group>
    </div>
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="商品名称" prop="noticeTitle">
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入商品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['commodity:plaftorm:add']"
          >新增</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="noticeList">
      <el-table-column label="序号" align="center" prop="noticeId" width="100">
        <template slot-scope="scope">
          <div>
            {{
              scope.$index +
              (queryParams.pageNum - 1) * queryParams.pageSize +
              1
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" prop="spmc">
        <template slot-scope="scope">
          {{ scope.row.spmc }}
          <span
            class="copy"
            @click="handelcopy"
            v-if="scope.row.status == '已归档'"
            >【复制】</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="平台编码"
        align="center"
        prop="ptbm"
        width="150"
      />
      <el-table-column
        label="商品品牌"
        align="center"
        prop="sppp"
        width="150"
      />
      <el-table-column
        label="商品条码"
        align="center"
        prop="sptm"
        width="150"
      />
      <el-table-column label="库存" align="center" prop="kc" width="150">
        <template slot-scope="scope">
          <el-tooltip placement="bottom" effect="light">
            <div slot="content">
              <div v-for="(item, index) in scope.row.kcsp" :key="index">
                {{ item.name + item.type + item.size + item.num }}
              </div>
            </div>
            <div class="stock">{{ scope.row.kc }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-check"
            @click="handleApproval(scope.row)"
            v-hasPermi="['commodity:plaftorm:approval']"
            >提交审核</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['commodity:plaftorm:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['commodity:plaftorm:del']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="spmc">
              <el-input
                v-model="form.spmc"
                placeholder="请输入商品名称"
                style="width: 200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告类型" prop="noticeType">
              <el-select
                v-model="form.noticeType"
                style="width: 200px"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in typeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <editor v-model="form.noticeContent" :min-height="192" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listNotice,
  getNotice,
  delNotice,
  addNotice,
  updateNotice,
  exportNotice,
  approvalNotice,
  copyNotice,
} from "@/api/commodity/commodity";
import Editor from "@/components/Editor";

export default {
  name: "commodity",
  components: {
    Editor,
  },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 公告表格数据
      noticeList: [
        {
          id: 1,
          spmc: "薰衣草睡美人沐浴露",
          status: "已归档",
          ptbm: "52134864316",
          sppp: "宝格丽",
          sptm: "BGL205",
          kc: "200",
          kcsp: [
            {
              id: "1",
              name: "薰衣草睡美人",
              type: "沐浴露",
              size: "260g",
              num: "100",
            },
            {
              id: "1",
              name: "薰衣草睡美人",
              type: "沐浴露",
              size: "260g",
              num: "100",
            },
          ],
        },
        {
          id: 1,
          spmc: "薰衣草睡美人沐浴露2",
          status: "已归档",
          ptbm: "52134864316",
          sppp: "宝格丽2",
          sptm: "BGL205",
          kc: "200",
          kcsp: [
            {
              id: "1",
              name: "薰衣草睡美人",
              type: "沐浴露",
              size: "260g",
              num: "100",
            },
            {
              id: "1",
              name: "薰衣草睡美人",
              type: "沐浴露",
              size: "260g",
              num: "100",
            },
          ],
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        createBy: undefined,
        status: undefined,
        type: "0",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        spmc: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
      type: "0",
    };
  },
  created() {
    // this.getList();
    this.getDicts("sys_notice_status").then((response) => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_notice_type").then((response) => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询公告列表 */
    handelcopy() {
      copyNotice().then((res) => {
        this.msgSuccess("复制成功");
      });
    },
    /** 查询公告列表 */
    changeStatus(value) {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      listNotice(this.queryParams).then((response) => {
        this.noticeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 公告状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 公告状态字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.noticeType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        noticeId: undefined,
        noticeTitle: undefined,
        noticeType: undefined,
        noticeContent: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.noticeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      //   this.open = true;
      //   this.title = "添加公告";
      this.$router.push({
          path:'/commodity/edit'
      });
    },
    /** 审核按钮操作 */
    handleApproval(row) {
      const noticeId = row.noticeId || this.ids;
      const noticeIds = row.noticeId || this.ids;
      this.$confirm("是否确认审核该商品?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return approvalNotice(noticeIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("审核成功");
        })
        .catch(() => {});
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.title = "修改海关商品备案";
      this.open = true;
      //   const noticeId = row.noticeId || this.ids;
      //   getNotice(noticeId).then((response) => {
      //     this.form = response.data;
      //     this.open = true;
      //     this.title = "修改公告";
      //   });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.noticeId != undefined) {
            updateNotice(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNotice(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const noticeIds = row.noticeId || this.ids;
      this.$confirm("是否确认删除该商品?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delNotice(noticeIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="scss">
.radio-box {
  margin-bottom: 10px;
}
.stock {
  text-decoration: underline;
}
.copy {
  color: #999;
  cursor: pointer;
}
</style>