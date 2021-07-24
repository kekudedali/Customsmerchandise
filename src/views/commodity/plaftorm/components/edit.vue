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
            prop="grossMargin"
            header-align="center"
            align="center"
            label="平台毛利润"
            v-if="type == 'completion' || type == 'completiondetail'"
          >
            <template slot-scope="scope">
              <div v-if="type == 'completiondetail'">
                {{ scope.row.grossMargin }}
              </div>
              <el-input
                v-else
                v-model="scope.row.grossMargin"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="Productpicture"
            header-align="center"
            align="center"
            label="图片"
            v-if="type == 'completion' || type == 'completiondetail'"
          >
            <template slot-scope="scope">
              <div
                v-show="scope.row.Productpicture.length > 0"
                class="tableimg-box"
              >
                <el-image
                  style="width: 50px; height: 50px"
                  :src="getsrc(scope.row)"
                  :preview-src-list="[getsrc(scope.row)]"
                >
                </el-image>
                <el-button
                  style="margin-left: 10px"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deltableimg(scope.$index)"
                ></el-button>
              </div>
              <ImageUpload
                v-show="scope.row.Productpicture.length == 0"
                :limit="1"
                :fileSize="fileSize"
                :isShowTip="isShowTip"
                uploadtype="btn"
                :fileList.sync="scope.row.Productpicture"
                :ref="'tableupload' + scope.$index"
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
          :model="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="驳回原因" prop="explain">
                <el-input
                  type="textarea"
                  placeholder="请输入"
                  v-model="ruleForm.explain"
                  maxlength="200"
                  show-word-limit
                  :autosize="autosize"
                  :disabled="rejectdisabled"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="submit-btn">
          <el-button type="primary" size="small" @click="rejectsubmit"
            >重新提交审核</el-button
          >
        </div>
      </div>
      <div class="reject-result" v-if="typetwo == 'audit'">
        <div class="baseinfo">审核</div>
        <el-form
          :model="ruleFormtwo"
          :rules="rulestwo"
          ref="ruleFormrwo"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12" :offset="6">
              <el-form-item label="审核" prop="status">
                <el-radio v-model="ruleFormtwo.status" label="2">通过</el-radio>
                <el-radio v-model="ruleFormtwo.status" label="1"
                  >不通过</el-radio
                >
              </el-form-item>
              <el-form-item label="驳回原因" prop="spfmt">
                <el-input
                  type="textarea"
                  placeholder="请输入"
                  v-model="ruleFormtwo.explain"
                  maxlength="200"
                  show-word-limit
                  :autosize="autosize"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="submit-btn">
          <el-button type="primary" size="small" @click="auditsubmit"
            >提交</el-button
          >
        </div>
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
          v-if=" type == 'detail' || type == 'edit'"
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
                  :limit="limit"
                  :fileSize="fileSize"
                  :isShowTip="isShowTip"
                  uploadtype="image"
                  :fileList.sync="ruleFormthree.spfmt"
                />
              </el-form-item>
              <el-form-item label="商品轮播图" prop="spfmt">
                <ImageUpload
                  :limit="6"
                  :fileSize="fileSize"
                  :isShowTip="isShowTip"
                  uploadtype="image"
                  :fileList.sync="ruleFormthree.splbt"
                />
              </el-form-item>
              <el-form-item label="商品描述" prop="spfmt">
                <ImageUpload
                  :limit="9"
                  :fileSize="fileSize"
                  :isShowTip="isShowTip"
                  uploadtype="image"
                  :fileList.sync="ruleFormthree.spms"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="submit-btn" v-if="type == 'completion'">
      <el-button type="primary" size="small" @click="completionsubmit"
        >提交审核</el-button
      >
    </div>
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
  warehouseapi,
  supplierbase,
  completioncommodity,
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
      typetwo: "add",
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
        status: "2",
        explain: "",
      },
      rulestwo: {
        status: [
          { required: true, message: "请选择审核状态", trigger: "change" },
        ],
      },
      ruleFormthree: {
        spfmt: [],
        splbt: [],
        spms: [],
      },
      autosize: { minRows: 2, maxRows: 6 },
      rulesthree: {
        spfmt: [
          {
            required: true,
            message: "请输入商品封面图",
            trigger: "change",
            type: "array",
          },
        ],
        splbt: [
          {
            required: true,
            message: "请输入商品轮播图",
            trigger: "change",
            type: "array",
          },
        ],
        spms: [
          {
            required: true,
            message: "请输入商品描述",
            trigger: "change",
            type: "array",
          },
        ],
      },
      fileList: [],
      radio: "2",
      rejectdisabled:true,
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.typetwo = this.$route.query.typetwo;
    let type = this.$route.query.type;
    this.title = this.$route.query.title;

    this.tableData = [
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
      var specificationList = this.$route.query.data.specificationList;
      specificationList.map((item) => {
        item.Productpicture = [];
      });
      this.tableData = specificationList || [
        {
          selfid: 1,
          specificationName: "",
          customsNumber: "",
          specificationAmount: "",
          weight: "",
          freightCost: "",
          specificationName: "",
          inventoryTotal: "",
          Productpicture: [],
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
    deltableimg(index) {
      // this.$refs["tableupload" + index].clearfile();
      this.tableData.map((item, tableindex) => {
        if (tableindex == index) {
          this.$set(item, "Productpicture", []);
        }
      });
    },
    showimg(row) {
      var flag = false;
      if (row.Productpicture.length > 0) {
        if (row.Productpicture[0].url) {
          flag = true;
        }
      }
      return flag;
    },
    getsrc(row) {
      var img = "";
      if (row.Productpicture.length > 0) {
        if (row.Productpicture[0].url) {
          img = row.Productpicture[0].url;
        }
      }
      return img;
    },
    showupload(row) {
      var flag = true;
      if (this.type == "completion") {
        if (row.Productpicture.length > 0) {
          if (row.Productpicture[0].url) {
            flag = false;
          }
        }
      }
      return flag;
    },
    //获取仓库
    getwarehouseapi() {
      warehouseapi().then((res) => {
        var gwarehouseBaseCodeoptions = res.rows;
        var arr = [];
        gwarehouseBaseCodeoptions.map((item) => {
          var obj = {
            label: item.warehouseName,
            value: item.warehouseBaseCode,
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
            value: item.supplierBaseCode,
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
    //商品状态（-1:草稿箱，0：待审核，1：商品信息待补全（驳回），2：归档）',
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
            status: -1, //区分草稿还是提交审核
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
    rejectsubmit(){
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
    resubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        let { data } = this.$route.query;
        if (valid) {
          var obj = {
            ...this.ruleForm,
            status: data.status, //区分草稿还是提交审核
            specificationList: this.tableData,
          };
          editcommodity(obj).then((res) => {
            if (res.code == 200) {
              this.$message.success("重新提交成功！");
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
    auditsubmit() {
      if (this.ruleFormtwo.status === "1" && this.ruleFormtwo.explain == "") {
        this.$message.error("请填写不通过的原因");
        return;
      }
      this.$refs["ruleFormrwo"].validate((valid) => {
        if (valid) {
          if (this.type == "reject") {
            var obj = {
              id: this.ruleForm.id,
              status: 1, //驳回
              explain: this.ruleFormtwo.explain,
            };
          } else {
            var obj = {
              id: this.ruleForm.id,
              status: this.ruleFormtwo.status, 
              explain: this.ruleFormtwo.explain,
            };
          }
          approvalcommodity(obj).then((res) => {
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
    completionsubmit() {
      var tableData = this.tableData;
      var tablearr = [];
      var flag = false;
      tableData.map((item, index) => {
        var num = Number(index) + 1;
        // var obj = {
        //   specificationName: item.specificationName,
        //   specificationAmount: item.specificationAmount,
        //   inventoryTotal: item.inventoryTotal,
        //   grossMargin: item.grossMargin,
        // };
        // tablearr.push(obj);
        if (!item.grossMargin) {
          flag = true;
          this.$message.error("请输入第" + num + "行平台毛利润");
        }
        if (item.Productpicture.length == 0) {
          flag = true;
          this.$message.error("请上传第" + num + "行图片");
        }
      });
      //获取图片数据
      var operationList = [];

      var ruleFormthree = this.ruleFormthree;
      for (var key in ruleFormthree) {
        var obj = {
          commodityBaseCode: this.ruleForm.commodityBaseCode, //商品平台编码
          type: key == "spfmt" ? 0 : key == "splbt" ? 1 : 2,
          url: JSON.stringify(ruleFormthree[key]),
        };
        operationList.push(obj);
      }

      tableData.map((item) => {
        var obj = {
          specificationBaseCode: item.specificationBaseCode, //商品平台编码
          type: 3,
          url: JSON.stringify(item.Productpicture),
        };
        operationList.push(obj);
      });

      if (flag) {
        return;
      }
      var that = this;
      that.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          that.$refs["ruleFormthree"].validate((valid) => {
            if (valid) {
              var obj = {
                ...that.ruleForm,
                specificationList: tableData,
                operationList: operationList,
              };
              completioncommodity(obj).then((res) => {
                if (res.code == 200) {
                  that.$message.success("提交审核成功！");
                  that.back();
                } else {
                  that.$message.error(res.msg);
                }
              });
            } else {
              console.log("error submit!!");
              return false;
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
.tableimg-box {
  display: flex;
  align-items: center;
  justify-content: center;
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
