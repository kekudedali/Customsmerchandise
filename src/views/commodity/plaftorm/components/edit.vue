<template>
  <div class="app-container">
    <div>
      <el-button size="small" type="primary" @click="resetQuery"
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
    </el-card>
  </div>
</template>
<script>
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
        dierdanwei:"",
        diershuliang:"",
        remarks:"",
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
    };
  },
  methods: {},
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
</style>
<style scoped>
.demo-ruleForm /deep/.el-form-item {
  margin-bottom: 20px;
}
</style>
