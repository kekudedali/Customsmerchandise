<template>
  <div class="app-container">
    <div>
      <el-button size="small" type="primary" @click="back">返回</el-button>
      <span class="title">"商品分类管理 > 分类管理"</span>
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
          <el-col :span="18" :offset="1">
            <el-form-item label="分类名称" prop="value">
              <el-input
                v-model="ruleForm.value"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                :min="0"
                controls-position="right"
                v-model="ruleForm.sort"
                placeholder="请输入"
                style="width: 200px"
                :disabled="isdisabled"
                v-Int
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="baseinfo" style="margin-bottom: 20px">图文信息</div>
          <el-col :span="18" :offset="1">
            <!-- <el-form-item label="APP图标" prop="appPicture"> -->
            <el-form-item label="APP图标">
              <ImageUpload
                :limit="limit"
                :fileSize="fileSize"
                :isShowTip="isShowTip"
                uploadtype="image"
                :fileList.sync="ruleForm.appPicture"
              />
            </el-form-item>
            <!-- <el-form-item label="小程序图标" prop="wxPicture"> -->
            <el-form-item label="小程序图标">
              <ImageUpload
                :limit="6"
                :fileSize="fileSize"
                :isShowTip="isShowTip"
                uploadtype="image"
                :fileList.sync="ruleForm.wxPicture"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="submit-btn">
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
import ImageUpload from "@/components/ImageUpload/index";
import { addclassify, editclassify } from "@/api/commodity/classify";
import selfDirective from "@/utils/selfDirective";

export default {
  data() {
    return {
      title: "新增分类",
      isdisabled: false,
      ruleForm: {
        value: "",
        sort: "",
        appPicture: [],
        wxPicture: [],
      },
      rules: {
        value: [
          { required: true, message: "请输入分类类型", trigger: "change" },
        ],
        sort: [
          { required: true, message: "请输入分类排序", trigger: "change" },
        ],
        // appPicture: [
        //   {
        //     required: true,
        //     message: "请输入APP图标",
        //     trigger: "change",
        //     type: "array",
        //   },
        // ],
        // wxPicture: [
        //   {
        //     required: true,
        //     message: "请输入小程序图标s",
        //     trigger: "change",
        //     type: "array",
        //   },
        // ],
      },
      fileSize: 2,
      isShowTip: true,
      limit: 1,
    };
  },
  components: {
    ImageUpload,
  },
  created() {
    var data = this.$route.query.data ? JSON.parse(this.$route.query.data) : {};
    this.ruleForm = {
      ...data,
      appPicture: [],
      wxPicture: [],
    };
    console.log(this.ruleForm);
  },
  methods: {
    back() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    submit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          var ruleForm = this.ruleForm;
          if (this.ruleForm.id != undefined) {
            var obj = {
              id: ruleForm.id,
              value: ruleForm.value,
              sort: ruleForm.sort,
              appPicture: JSON.stringify(ruleForm.appPicture),
              wxPicture: JSON.stringify(ruleForm.wxPicture),
            };
            editclassify(obj).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.back()
            });
          } else {
             var obj = {
              value: ruleForm.value,
              sort: ruleForm.sort,
              appPicture: JSON.stringify(ruleForm.appPicture),
              wxPicture: JSON.stringify(ruleForm.wxPicture),
            };
            addclassify(obj).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
               this.back()
            });
          }
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

