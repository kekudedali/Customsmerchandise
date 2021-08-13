<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <el-form-item label="供应商名称" prop="supplierName">
        <el-input
          v-model="queryParams.supplierName"
          placeholder="请输入"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商类别" prop="category">
        <el-select
          v-model="queryParams.category"
          :disabled="isdisable"
          placeholder="请选择"
          style="width: 100%"
          clearable
          @change="handleQuery"
        >
          <el-option
            v-for="item in categoryoptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          >
          </el-option>
        </el-select>
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
      <el-button type="primary" size="small" @click="handleedit('add')"
        >新增</el-button
      >
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table ref="multipleTable" v-loading="loading" :data="supplierList">
      <el-table-column label="序号" align="center" prop="id" width="100">
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
      <el-table-column
        label="供应商名称"
        align="center"
        prop="supplierName"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="国家"
        align="center"
        prop="nation"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ getdictlabel(scope.row, nationoptions, "nation") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="地区"
        align="center"
        prop="district"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="负责人" align="center" prop="userName"  :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="联系方式" align="center" prop="phone"  :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="邮箱" align="center" prop="emall"  :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column label="供应商类别" align="center" prop="category"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{
            getdictlabel(scope.row, categoryoptions, "category")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" align="center" prop="state" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state == '1'"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changestate(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="opration" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleedit('edit', scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-more"
            @click="handleedit('more', scope.row)"
            >更多</el-button
          >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            style="color: red"
            @click="handleDelete('del', scope.row)"
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
    <el-dialog
      :title="title"
      :visible="open"
      width="780px"
      append-to-body
      :before-close="handeclose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="15" :offset="3">
            <el-form-item label="供应商名称：" prop="supplierName">
              <el-input
                v-model="form.supplierName"
                :disabled="isdisable"
                placeholder="请输入"
              />
            </el-form-item>
            <!--是否对接（0。未对接 1.已对接） -->
            <el-form-item label="是否启用:" prop="state">
              <el-radio v-model="form.state" :disabled="isdisable" :label="0"
                >禁用</el-radio
              >
              <el-radio v-model="form.state" :disabled="isdisable" :label="1"
                >启用</el-radio
              >
            </el-form-item>
            <el-form-item label="供应商国家：" prop="nation">
              <el-select
                v-model="form.nation"
                :disabled="isdisable"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in nationoptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供应商负责人：" prop="userName">
              <el-input
                v-model="form.userName"
                :disabled="isdisable"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="联系方式：" prop="phone">
              <el-input
                v-model="form.phone"
                :disabled="isdisable"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="邮箱：" prop="emall">
              <el-input
                v-model="form.emall"
                :disabled="isdisable"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="供应商类别：" prop="category">
              <el-select
                v-model="form.category"
                :disabled="isdisable"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in categoryoptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供应商地区：" prop="district">
              <el-input
                type="textarea"
                v-model="form.district"
                placeholder="请输入"
                :rows="7"
                maxlength="300"
                show-word-limit
                :disabled="isdisable"
              />
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
  listsupplier,
  addsupplier,
  editsupplier,
  delsupplier,
} from "@/api/supplier";
import Editor from "@/components/Editor";
import selfDirective from "@/utils/selfDirective";
import FileUpload from "@/components/FileUpload/index";

export default {
  name: "supplier",
  components: {
    Editor,
    FileUpload,
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
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
      supplierList: [],
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
      },
      // 表单参数
      form: {
        icon: [],
        sort: null,
        name: "",
      },
      // 表单校验
      rules: {
        supplierName: [
          { required: true, message: "供应商名称不能为空", trigger: "change" },
        ],
        nation: [
          { required: true, message: "供应商国家不能为空", trigger: "change" },
        ],
        district: [
          { required: true, message: "供应商地区不能为空", trigger: "change" },
        ],
        userName: [
          {
            required: true,
            message: "供应商负责人不能为空",
            trigger: "change",
          },
        ],
        phone: [
          {
            required: true,
            trigger: "change",
            validator: checkPhone,
          },
        ],
        emall: [
          {
            required: true,
            message: "请输入正确的邮箱",
            trigger: "change",
            type: "email",
          },
        ],
        category: [
          { required: true, message: "供应商类别不能为空", trigger: "change" },
        ],
        company: [
          { required: true, message: "代收款公司不能为空", trigger: "change" },
        ],
        state: [
          { required: true, message: "请选择是否启用", trigger: "change" },
        ],
      },
      limit: 5,
      fileSize: 20,
      isShowTip: false,
      value: [],
      nationoptions: [],
      categoryoptions: [],
      companyoptions: [],
      gysTypeOptions: [],
      isdisable: false,
    };
  },
  created() {
    this.getList();
    this.getDicts("gys_type").then((response) => {
      this.categoryoptions = response.data;
    });
    this.getDicts("gys-gj").then((response) => {
      this.nationoptions = response.data;
    });
  },
  methods: {
    /** 查询公告列表 */
    handelcopy() {
      copysupplier().then((res) => {
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
      listsupplier(this.queryParams).then((response) => {
        var supplierList = response.rows;
        this.supplierList = supplierList;
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
        id: undefined,
        supplierName: undefined,
        nation: undefined,
        district: undefined,
        userName: undefined,
        phone: undefined,
        category: undefined,
        state: 1,
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
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            editsupplier(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addsupplier(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    handleedit(type, row) {
      this.reset();
      this.open = true;
      if (type == "edit") {
        this.form = row;
        this.title = "修改标签";
        this.isdisable = false;
      } else if (type == "add") {
        this.title = "新增标签";
        this.isdisable = false;
      } else if (type == "more") {
        this.form = row;
        this.isdisable = true;
      }
    },
    handeclose() {
      this.open = false;
    },
    getdictlabel(row, nationoptions, name) {
      let str = "";
      nationoptions.map((item) => {
        if (item.dictValue == row[name]) {
          str = item.dictLabel;
        }
      });
      return str;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm("是否确认删除该仓库?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delsupplier(ids);
        })
        .then(() => {
          this.getList();
          this.$message.success("删除成功");
        })
        .catch(() => {});
    },
    changestate(row) {
      var that = this;
      const statestr = row.state == 1 ? "禁用" : "启用";
      this.$confirm("是否确认" + statestr + "该供应商?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        var obj = {
          id: row.id,
          state: row.state == 1 ? 0 : 1,
        };
        editsupplier(obj).then((response) => {
          that.$message.success(statestr + "成功");
          that.getList();
        });
      });
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
.box-card {
  margin-top: 20px;
  .card-title {
    font-weight: 700;
    font-style: normal;
    color: #555555;
  }
  .baseinfo {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #999;
    background-color: #f2f2f2;
    padding-left: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
}
</style>