<template>
  <div class="app-container">
    <div>
      <el-button size="small" type="primary" @click="back">返回</el-button>
      <span class="title">"海关商品管理 > 海关商品备案"</span>
    </div>
    <el-card class="box-card">
      <div class="card-title">{{ title }}</div>
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
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
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
            <el-form-item label="海关备案编号" prop="ean">
              <el-input
                v-model="ruleForm.ean"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="备案日期" prop="createTime">
              <el-date-picker
                v-model="ruleForm.createTime"
                type="datetime"
                placeholder="选择日期"
                style="width: 200px"
                value-format="yyyy-MM-dd HH:mm:ss"
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
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申报单位" prop="unit">
              <el-select
                v-model="ruleForm.unit"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in unitoptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
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
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
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
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
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
            <el-form-item label="备注" prop="explain">
              <el-input
                v-model="ruleForm.explain"
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
      <div class="table-box">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column
            prop="specificationName"
            header-align="center"
            align="center"
            label="规格名称"
          >
            <template slot-scope="scope">
              <div
                v-if="
                  type == 'reject' || type == 'detail' || type == 'completion'
                "
              >
                {{ scope.row.specificationName }}
              </div>
              <el-input
                v-else
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
              <div
                v-if="
                  type == 'reject' || type == 'detail' || type == 'completion'
                "
              >
                {{ scope.row.specificationAmount }}
              </div>
              <el-input
                v-else
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
            v-if="type != 'completion' && type != 'completiondetail'"
          >
            <template slot-scope="scope">
              <div
                v-if="
                  type == 'reject' || type == 'detail' || type == 'completion'
                "
              >
                {{ scope.row.customsNumber }}
              </div>
              <el-input
                v-else
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
            v-if="type != 'completion' && type != 'completiondetail'"
          >
            <template slot-scope="scope">
              <div
                v-if="
                  type == 'reject' || type == 'detail' || type == 'completion'
                "
              >
                {{ scope.row.weight }}
              </div>
              <el-input
                v-else
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
            v-if="type != 'completion' && type != 'completiondetail'"
          >
            <template slot-scope="scope">
              <div
                v-if="
                  type == 'reject' || type == 'detail' || type == 'completion'
                "
              >
                {{ scope.row.freightCost }}
              </div>
              <el-input
                v-else
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
              <div
                v-if="
                  type == 'reject' || type == 'detail' || type == 'completion'
                "
              >
                {{ scope.row.inventoryTotal }}
              </div>
              <el-input
                v-else
                v-Int
                v-model="scope.row.inventoryTotal"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="gongyingshangchenben"
            header-align="center"
            align="center"
            label="供应商成本"
            v-if="type == 'completion' || type == 'completiondetail'"
          >
            <template slot-scope="scope">
              <div v-if="type == 'completion'">
                {{ scope.row.gongyingshangchenben }}
              </div>
              <el-input
                v-else
                v-Int
                v-model="scope.row.gongyingshangchenben"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="pingtaimaolirun"
            header-align="center"
            align="center"
            label="平台毛利润"
            v-if="type == 'completion' || type == 'completiondetail'"
          >
            <template slot-scope="scope">
              <div v-if="type == 'completiondetail'">
                {{ scope.row.pingtaimaolirun }}
              </div>
              <el-input
                v-else
                v-Int
                v-model="scope.row.pingtaimaolirun"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="pingtaimaolirun"
            header-align="center"
            align="center"
            label="图片"
            v-if="type == 'completion' || type == 'completiondetail'"
          >
            <template slot-scope="scope">
              <div v-if="type == 'completiondetail'">
                <img :src="scope.row.pingtaimaolirun[0].url" alt="" />
              </div>
              <FileUpload
                v-else
                :value="scope.row.pingtaimaolirun"
                :limit="1"
                :fileSize="fileSize"
                :isShowTip="false"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="操作"
            header-align="center"
            align="center"
            width="200px"
            label="操作"
            v-if="
              type != 'reject' &&
              type != 'detail' &&
              type != 'completion' &&
              type != 'completiondetail'
            "
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
      </div>
      <div class="reject-result" v-if="type == 'reject'">
        <div class="baseinfo">驳回原因</div>
        <el-form
          :model="ruleFormtwo"
          ref="ruleFormrwo"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="驳回原因" prop="spfmt">
                <el-input
                  type="textarea"
                  placeholder="请输入"
                  v-model="ruleFormtwo.textarea"
                  maxlength="200"
                  show-word-limit
                  :autosize="autosize"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="submit-btn" v-if="type != 'detail' && type != 'completion'">
        <el-button
          type="primary"
          v-if="type != 'reject' && type != 'edit'"
          size="small"
          @click="savedraft"
          >保存草稿箱</el-button
        >
        <el-button
          type="primary"
          v-if="type != 'reject' && type != 'edit'"
          size="small"
          @click="submit"
          >提交审核</el-button
        >
        <el-button
          v-if="type == 'reject' || type == 'detail' || type == 'edit'"
          type="primary"
          size="small"
          @click="resubmit"
          >重新提交审核</el-button
        >
      </div>
    </el-card>
    <el-card class="box-card" v-if="type == 'completion'">
      <div class="card-title">商品介绍信息</div>
      <div class="baseinfo">图文信息</div>
      <div class="imag-box">
        <el-form
          :model="ruleFormthree"
          :rules="rulesthree"
          ref="ruleFormthree"
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
import FileUpload from "@/components/FileUpload/index";
import selfDirective from "@/utils/selfDirective";

import {
  listcommodity,
  getcommodity,
  delcommodity,
  addcommodity,
  editcommodity,
  updatecommodity,
  exportcommodity,
  approvalcommodity,
  copycommodity,
  warehouseapi,
  supplierbase,
} from "@/api/commodity/commodity";

export default {
  components: {
    FileUpload,
    ImageUpload,
  },
  data() {
    return {
      title: "新增海关商品备案",
      type: "add",
      isdisabled: false,
      limit: 5,
      fileSize: 20,
      isShowTip: true,
      value: [],
      ruleForm: {
        name: null,
        countryOfOrigin: null,
        commodityBaseCode: null,
        skuCode: null,
        unit: null,
        commodityBrand: null,
        supplierBaseCode: null,
        warehouseBaseCode: "",
        ean: null,
        createTime: null,
        statutoryUnit1: null,
        statutoryNumber1: null,
        statutoryUnit2: null,
        statutoryNumber2: null,
        explain: null,
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
        unit: [
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
        ean: [
          { required: true, message: "请输入海关备案编号", trigger: "change" },
        ],
        statutoryUnit1: [
          { required: true, message: "请输入法定第一单位", trigger: "change" },
        ],
        statutoryNumber1: [
          { required: true, message: "请输入法定第一数量", trigger: "change" },
        ],
      },
      countryOfOriginoptions: [], //原产国
      unitoptions: [], //申报单位
      commodityBrandoptions: [], //商品品牌
      supplierBaseCodeoptions: [], //所属供应商
      gwarehouseBaseCodeoptions: [], //所属仓库
      statutoryUnit1options: [], //法定第一单位
      statutoryUnit2options: [], //法定第二单位
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
        textarea: "",
      },
      ruleFormthree: {
        spfmt: [],
      },
      autosize: { minRows: 2, maxRows: 6 },
      rulesthree: {
        spfmt: [
          { required: true, message: "请输入商品封面图", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.type = this.$route.query.type;
    let type = this.$route.query.type;
    this.title = this.$route.query.title;
    this.tableData = {
      selfid: 1,
      specificationName: "",
      customsNumber: "",
      specificationAmount: "",
      weight: "",
      freightCost: "",
      specificationName: "",
      inventoryTotal: "",
    };
    if (
      type == "edit" ||
      type == "reject" ||
      type == "detail" ||
      type == "completion" ||
      type == "completiondetail"
    ) {
      let { data } = this.$route.query;
      let querydata = {
        id: data.id,
        name: data.name,
        countryOfOrigin: data.countryOfOrigin,
        commodityBaseCode: data.commodityBaseCode,
        skuCode: data.skuCode,
        unit: data.unit,
        commodityBrand: data.commodityBrand,
        supplierBaseCode: data.supplierBaseCode,
        warehouseBaseCode: data.warehouseBaseCode,
        ean: data.ean,
        createTime: data.createTime,
        statutoryUnit1: data.statutoryUnit1,
        statutoryNumber1: data.statutoryNumber1,
        statutoryUnit2: data.statutoryUnit2,
        statutoryNumber2: data.statutoryNumber2,
        explain: data.explain,
      };
      this.ruleForm = querydata;
      this.tableData = this.$route.query.data.specificationList || [
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
      ];
      if (type == "detail") {
        this.isdisabled = true;
      }
    }
    this.getwarehouseapi(); //获取仓库
    this.getsupplierbase(); //所属供应商
    this.getDicts("gj").then((response) => {
      this.countryOfOriginoptions = response.data;
    });
    this.getDicts("pp").then((response) => {
      this.commodityBrandoptions = response.data;
    });
    this.getDicts("pp").then((response) => {
      this.commodityBrandoptions = response.data;
    });
    this.getDicts("dw").then((response) => {
      this.statutoryUnit1options = response.data;
      this.statutoryUnit2options = response.data;
      this.unitoptions = response.data;
    });
  },
  methods: {
    //获取仓库
    getwarehouseapi() {
      warehouseapi().then((res) => {
        var gwarehouseBaseCodeoptions = res.rows;
        var arr = [];
        gwarehouseBaseCodeoptions.map((item) => {
          var obj = {
            label: item.warehouseName,
            value: item.id.toString(),
          };
          arr.push(obj);
        });
        this.gwarehouseBaseCodeoptions = arr;
      });
    },
    //所属供应商
    getsupplierbase() {
      supplierbase().then((res) => {
        var supplierBaseCodeoptions = res.rows;
        var arr = [];
        supplierBaseCodeoptions.map((item) => {
          var obj = {
            label: item.supplierName,
            value: item.id.toString(),
          };
          arr.push(obj);
        });
        this.supplierBaseCodeoptions = arr;
      });
    },
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
    Validatetable() {
      let tableData = this.tableData;
      var flag = false;
      tableData.map((item, index) => {
        var num = Number(index) + 1;
        if (!item.inventoryTotal) {
          flag = true;
          this.$message.error("请输入第" + num + "行库存");
        }
        if (!item.freightCost) {
          flag = true;
          this.$message.error("请输入第" + num + "行供货成本");
        }
        if (!item.weight) {
          flag = true;
          this.$message.error("请输入第" + num + "行申报重量");
        }
        if (!item.customsNumber) {
          flag = true;
          this.$message.error("请输入第" + num + "行物料号");
        }
        if (!item.specificationAmount) {
          flag = true;
          this.$message.error("请输入第" + num + "行规格数量");
        }
        if (!item.specificationName) {
          flag = true;
          this.$message.error("请输入第" + num + "行规格名称");
        }
      });
      return flag;
    },
    //商品状态（0：待审核，1：商品信息待补全，2：归档）',
    savedraft() {
      if (this.Validatetable()) {
        return;
      }
      var ruleForm = this.ruleForm;
      if (ruleForm.statutoryUnit2 && !ruleForm.statutoryNumber2) {
        this.$message.error("请输入法定第二数量");
        return;
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          var obj = {
            ...this.ruleForm,
            status: 1, //区分草稿还是提交审核
            specificationList: this.tableData,
          };
          addcommodity(obj).then((res) => {
            if (res.code == 200) {
              this.$message.success("保存草稿成功！");
              this.back();
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
    submit() {
      if (this.Validatetable()) {
        return;
      }
      var ruleForm = this.ruleForm;
      if (ruleForm.statutoryUnit2 && !ruleForm.statutoryNumber2) {
        this.$message.error("请输入法定第二数量");
        return;
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          var obj = {
            ...this.ruleForm,
            status: 0, //区分草稿还是提交审核
            specificationList: this.tableData,
          };
          addcommodity(obj).then((res) => {
            if (res.code == 200) {
              this.$message.success("提交审核成功！");
              this.back();
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
    resubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          var obj = {
            ...this.ruleForm,
            status: 0, //区分草稿还是提交审核
            specificationList: this.tableData,
          };
          editcommodity(obj).then((res) => {
            if (res.code == 200) {
              this.$message.success("提交审核成功！");
              this.back();
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
.reject-result {
  margin-top: 20px;
}
</style>
<style scoped>
.demo-ruleForm /deep/.el-form-item {
  margin-bottom: 20px;
}
.table-box /deep/ .el-table__header .cell::before {
  content: "*";
  color: red;
  margin-right: 5px;
}
</style>
