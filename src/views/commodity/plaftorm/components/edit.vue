<template>
  <div class="app-container">
    <div>
      <el-button size="small" type="primary" @click="back"
        >返回</el-button
      >
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
            <el-form-item label="商品名称" prop="spmc">
              <el-input
                v-model="ruleForm.spmc"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="平台编码" prop="pingtaibianma">
              <el-input
                v-model="ruleForm.pingtaibianma"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品条码" prop="shangpintm">
              <el-input
                v-model="ruleForm.shangpintm"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品品牌" prop="shangpinpinpai">
              <el-select
                v-model="ruleForm.shangpinpinpai"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in shangpinpinpaioptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属供应商" prop="gongyingshang">
              <el-select
                v-model="ruleForm.gongyingshang"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in gongyingshangoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属仓库" prop="cangku">
              <el-select
                v-model="ruleForm.cangku"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in gcangkuoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="海关备案编号" prop="haiguanbeianbianhao">
              <el-input
                v-model="ruleForm.haiguanbeianbianhao"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="备案日期" prop="beianriqi">
              <el-date-picker
                v-model="ruleForm.beianriqi"
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
            <el-form-item label="原产国" prop="yuanchanguo">
              <el-select
                v-model="ruleForm.yuanchanguo"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in yuanchanguooptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申报单位" prop="shengbaodanwei">
              <el-select
                v-model="ruleForm.shengbaodanwei"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in shengbaodanweioptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="法定第一单位" prop="diyidanwei">
              <el-select
                v-model="ruleForm.diyidanwei"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in diyidanweioptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="法定第一数量" prop="diyishuliang">
              <el-input
                v-model="ruleForm.diyishuliang"
                placeholder="请输入"
                style="width: 200px"
                v-Int
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="法定第二单位" prop="dierdanwei">
              <el-select
                v-model="ruleForm.dierdanwei"
                placeholder="请选择"
                style="width: 200px"
                :disabled="isdisabled"
              >
                <el-option
                  v-for="item in dierdanweioptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="法定第二数量" prop="diershuliang">
              <el-input
                v-model="ruleForm.diershuliang"
                placeholder="请输入"
                style="width: 200px"
                v-Int
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input
                v-model="ruleForm.remarks"
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
          prop="guigemingcheng"
          header-align="center"
          align="center"
          label="规格名称"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.guigemingcheng"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="guigeshuliang"
          header-align="center"
          align="center"
          label="规格数量"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.guigeshuliang"
              placeholder="请输入内容"
              v-Int
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="wuliaohao"
          header-align="center"
          align="center"
          label="物料号"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.wuliaohao"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="shengbaozhongliang"
          header-align="center"
          align="center"
          label="申报重量"
        >
          <template slot-scope="scope">
            <el-input
              v-enterNumber
              v-model="scope.row.shengbaozhongliang"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="gonghuochenben"
          header-align="center"
          align="center"
          label="供货成本"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.gonghuochenben"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="kucun"
          header-align="center"
          align="center"
          label="库存"
        >
          <template slot-scope="scope">
            <el-input
              v-Int
              v-model="scope.row.kucun"
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
  </div>
</template>
<script>

import store from '@/store'

export default {
 
  data() {
    return {
      title: "海关商品管理  >  海关商品备案",
      isdisabled: false,
      ruleForm: {
        spmc: "",
        yuanchanguo: "",
        pingtaibianma: "",
        shangpintm: "",
        shengbaodanwei: "",
        shangpinpinpai: "",
        gongyingshang: "",
        cangku: "",
        haiguanbeianbianhao: "",
        beianriqi: "",
        diyidanwei: "",
        diyishuliang: "",
        dierdanwei: "",
        diershuliang: "",
        remarks: "",
      },
      rules: {
        spmc: [
          { required: true, message: "请输入商品名称", trigger: "change" },
        ],
        pingtaibianma: [
          { required: true, message: "请输入平台编码", trigger: "change" },
        ],
        yuanchanguo: [
          { required: true, message: "请输入原产国", trigger: "change" },
        ],
        shengbaodanwei: [
          { required: true, message: "请输入申报单位", trigger: "change" },
        ],
        shangpintm: [
          { required: true, message: "请输入商品条码", trigger: "change" },
        ],
        gongyingshang: [
          { required: true, message: "请输入所属供应商", trigger: "change" },
        ],
        shangpinpinpai: [
          { required: true, message: "请输入商品品牌", trigger: "change" },
        ],
        shangpinpinpai: [
          { required: true, message: "请输入所属供应商", trigger: "change" },
        ],
        cangku: [
          { required: true, message: "请输入所属仓库", trigger: "change" },
        ],
        haiguanbeianbianhao: [
          { required: true, message: "请输入海关备案编号", trigger: "change" },
        ],
        diyidanwei: [
          { required: true, message: "请输入法定第一单位", trigger: "change" },
        ],
        diyishuliang: [
          { required: true, message: "请输入法定第一数量", trigger: "change" },
        ],
      },
      yuanchanguooptions: [], //原产国
      shengbaodanweioptions: [], //申报单位
      shangpinpinpaioptions: [], //商品品牌
      gongyingshangoptions: [], //所属供应商
      gcangkuoptions: [], //所属仓库
      diyidanweioptions: [], //法定第一单位
      dierdanweioptions: [], //法定第二单位
      tableData: [
        {
          selfid: 1,
          guigemingcheng: "",
          wuliaohao: "",
          shengbaozhongliang: "",
          gonghuochenben: "",
          guigemingcheng: "",
        },
      ],
      selfid: 2,
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
        guigemingcheng: "",
        wuliaohao: "",
        shengbaozhongliang: "",
        gonghuochenben: "",
        guigemingcheng: "",
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
    savedraft() {},
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
</style>
<style scoped>
.demo-ruleForm /deep/.el-form-item {
  margin-bottom: 20px;
}
</style>
