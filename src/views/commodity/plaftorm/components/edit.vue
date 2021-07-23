<template>
  <div class="app-container">
    <div>
      <el-button size="small" type="primary" @click="back">返回</el-button>
      <span class="title">{{ title }}</span>
    </div>
    <el-card class="box-card">
      <div class="card-title">新增海关商品备案</div>
      <div class="baseinfo">基本信息</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="6" :offset="6">
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="平台编码" prop="commodityBaseCode">
              <el-input
                v-model="ruleForm.commodityBaseCode"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品条码" prop="skuCode">
              <el-input
                v-model="ruleForm.skuCode"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品品牌" prop="commodityBrand">
              <el-select
                v-model="ruleForm.commodityBrand"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in commodityBrandoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属供应商" prop="supplierBaseCode">
              <el-select
                v-model="ruleForm.supplierBaseCode"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in supplierBaseCodeoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属仓库" prop="warehouseBaseCode">
              <el-select
                v-model="ruleForm.warehouseBaseCode"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in gwarehouseBaseCodeoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="海关备案编号" prop="skuCode">
              <el-input
                v-model="ruleForm.skuCode"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="备案日期" prop="createTime">
              <el-date-picker
                v-model="ruleForm.createTime"
                type="date"
                placeholder="选择日期"
                style="width: 200px"
                value-format="YYYY-MM-DD"
                :disabled="isdisabled"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="原产国" prop="countryOfOrigin">
              <el-select
                v-model="ruleForm.countryOfOrigin"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in countryOfOriginoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申报单位" prop="readConverterExp">
              <el-select
                v-model="ruleForm.readConverterExp"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in readConverterExpoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="法定第一单位" prop="statutoryUnit1">
              <el-select
                v-model="ruleForm.statutoryUnit1"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in statutoryUnit1options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="法定第一数量" prop="statutoryNumber1">
              <el-input
                v-model="ruleForm.statutoryNumber1"
                placeholder="请输入"
                style="width: 200px"
                v-Int
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="法定第二单位" prop="statutoryUnit2">
              <el-select
                v-model="ruleForm.statutoryUnit2"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in statutoryUnit2options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="法定第二数量" prop="statutoryNumber2">
              <el-input
                v-model="ruleForm.statutoryNumber2"
                placeholder="请输入"
                style="width: 200px"
                v-Int
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="ruleForm.remark"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="baseinfo">规格设置</div>
      <div class="card-title" style="margin: 10px 0px 10px 10px">规格列表</div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          prop="specificationName"
          header-align="center"
          align="center"
          label="规格名称"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.specificationName"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="specificationAmount"
          header-align="center"
          align="center"
          label="规格数量"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.specificationAmount"
              placeholder="请输入内容"
              v-Int
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="customsNumber"
          header-align="center"
          align="center"
          label="物料号"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.customsNumber"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          header-align="center"
          align="center"
          label="申报重量"
        >
          <template slot-scope="scope">
            <el-input
              v-enterNumber
              v-model="scope.row.weight"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="freightCost"
          header-align="center"
          align="center"
          label="供货成本"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.freightCost"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="inventoryTotal"
          header-align="center"
          align="center"
          label="库存"
        >
          <template slot-scope="scope">
            <el-input
              v-Int
              v-model="scope.row.inventoryTotal"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="操作"
          header-align="center"
          align="center"
          width="200px"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addnum"
              >新增</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="delnum(scope.row, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="submit-btn">
        <el-button type="primary" size="small" @click="savedraft"
          >保存草稿箱</el-button
        >
        <el-button type="primary" size="small" @click="submit"
          >提交审核</el-button
        >
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="card-title">商品介绍信息</div>
      <div class="baseinfo">图文信息</div>
      <div class="imag-box">
        <el-form
          :model="ruleFormtwo"
          :rules="rulestwo"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="18" :offset="1">
              <el-form-item label="商品封面图" prop="spfmt">
                <ImageUpload
                  :value="ruleFormtwo.spfmt"
                  :limit="limit"
                  :fileSize="fileSize"
                  :isShowTip="isShowTip"
                />
              </el-form-item>
              <el-form-item label="商品轮播图" prop="spfmt">
                <ImageUpload
                  :value="ruleFormtwo.spfmt"
                  :limit="6"
                  :fileSize="fileSize"
                  :isShowTip="isShowTip"
                />
              </el-form-item>
              <el-form-item label="商品描述" prop="spfmt">
                <ImageUpload
                  :value="ruleFormtwo.spfmt"
                  :limit="9"
                  :fileSize="fileSize"
                  :isShowTip="isShowTip"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import store from "@/store";
import ImageUpload from "@/components/ImageUpload/index";
import {
  listcommodity,
  getcommodity,
  delcommodity,
  addcommodity,
  updatecommodity,
  exportcommodity,
  approvalcommodity,
  copycommodity,
} from "@/api/commodity/commodity";

export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      title: "海关商品管理  >  海关商品备案",
      isdisabled: false,
      limit: 5,
      fileSize: 20,
      isShowTip: true,
      value: [],
      ruleForm: {
        name: "",
        countryOfOrigin: "",
        commodityBaseCode: "",
        skuCode: "",
        readConverterExp: "",
        commodityBrand: "",
        supplierBaseCode: "",
        warehouseBaseCode: "",
        skuCode: "",
        createTime: "",
        statutoryUnit1: "",
        statutoryNumber1: "",
        statutoryUnit2: "",
        statutoryNumber2: "",
        remark: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "change" },
        ],
        commodityBaseCode: [
          { required: true, message: "请输入平台编码", trigger: "change" },
        ],
        countryOfOrigin: [
          { required: true, message: "请输入原产国", trigger: "change" },
        ],
        readConverterExp: [
          { required: true, message: "请输入申报单位", trigger: "change" },
        ],
        skuCode: [
          { required: true, message: "请输入商品条码", trigger: "change" },
        ],
        supplierBaseCode: [
          { required: true, message: "请输入所属供应商", trigger: "change" },
        ],
        commodityBrand: [
          { required: true, message: "请输入商品品牌", trigger: "change" },
        ],
        commodityBrand: [
          { required: true, message: "请输入所属供应商", trigger: "change" },
        ],
        warehouseBaseCode: [
          { required: true, message: "请输入所属仓库", trigger: "change" },
        ],
        skuCode: [
          { required: true, message: "请输入海关备案编号", trigger: "change" },
        ],
        statutoryUnit1: [
          { required: true, message: "请输入法定第一单位", trigger: "change" },
        ],
        statutoryNumber1: [
          { required: true, message: "请输入法定第一数量", trigger: "change" },
        ],
      },
      countryOfOriginoptions: [
        {
          label: "中国",
          value: "1",
        },
        {
          label: "美国",
          value: "2",
        },
      ], //原产国
      readConverterExpoptions: [
        {
          label: "测试单位1",
          value: "1",
        },
        {
          label: "测试单位2",
          value: "2",
        },
      ], //申报单位
      commodityBrandoptions: [
        {
          label: "测试品牌1",
          value: "1",
        },
        {
          label: "测试品牌2",
          value: "2",
        },
      ], //商品品牌
      supplierBaseCodeoptions: [
        {
          label: "测试所属供应商1",
          value: "1",
        },
        {
          label: "测试所属供应商2",
          value: "2",
        },
      ], //所属供应商
      gwarehouseBaseCodeoptions: [
        {
          label: "测试所属属仓库1",
          value: "1",
        },
        {
          label: "测试所属属仓库2",
          value: "2",
        },
      ], //所属仓库
      statutoryUnit1options: [
        {
          label: "个",
          value: "1",
        },
        {
          label: "枚",
          value: "2",
        },
      ], //法定第一单位
      statutoryUnit2options: [
        {
          label: "颗",
          value: "1",
        },
        {
          label: "粒",
          value: "2",
        },
      ], //法定第二单位
      tableData: [
        {
          selfid: 1,
          specificationName: "",
          customsNumber: "",
          specificationAmount: "",
          weight: "",
          freightCost: "",
          specificationName: "",
          inventoryTotal: "",
        },
      ],
      selfid: 2,
      ruleFormtwo: {
        spfmt: [],
      },
      rulestwo: {
        spfmt: [
          { required: true, message: "请输入商品封面图", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    back() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    addnum() {
      var value = {
        selfid: this.selfid + 1,
        specificationName: "",
        specificationAmount: "",
        customsNumber: "",
        weight: "",
        freightCost: "",
        inventoryTotal: "",
      };
      this.selfid = this.selfid + 1;
      this.tableData.push(value);
    },
    delnum(row, index) {
      if (this.tableData.length == 1) {
        this.$message.error("不可删除最后一条");
        return;
      }
      var tableData = this.tableData;
      tableData.map((item, index) => {
        if (row.selfid) {
          if (item.selfid == row.selfid) {
            tableData.splice(index, 1);
          }
        }
        if (row.id) {
          if (item.id == row.id) {
            tableData.splice(index, 1);
          }
        }
      });
    },
    savedraft() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          var obj = {
            ...this.ruleForm,
            specificationList: this.tableData,
          };
          obj
          debugger
          addcommodity(obj).then((res) => {
            debugger
            if (res.code == 200) {
              this.$message.success("保存草稿成功！");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit() {},
  },
};
</script>
<style scoped lang="scss">
.title {
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 35%);
  margin-left: 10px;
  border-radius: 5px;
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
.demo-ruleForm {
  margin-top: 20px;
}
.submit-btn {
  width: 100%;
  margin-top: 10px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imag-box {
  margin-top: 10px;
}
</style>
<style scoped>
.demo-ruleForm /deep/.el-form-item {
  margin-bottom: 20px;
}
</style>
