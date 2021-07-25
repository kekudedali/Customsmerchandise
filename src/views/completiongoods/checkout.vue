<template>
  <div class="app-container">
    <div>
      <el-button size="small" type="primary" @click="back">返回</el-button>
      <span class="title">运营信息补全 > 分配库存</span>
    </div>
    <el-card class="box-card">
      <div class="card-title">{{ title }}</div>
      <div class="baseinfo">商品信息</div>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="18" :offset="1">
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="ruleForm.name"
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
          </el-col>
        </el-row>
        <el-row>
          <div class="baseinfo" style="margin-bottom: 20px">分配库存</div>
          <el-col :span="18" :offset="1">
            <el-form-item label="选择需要分配的渠道" prop="channe">
              <el-checkbox-group
                v-model="ruleForm.channe"
                @change="handleCheckedtypeChange"
              >
                <el-checkbox
                  v-for="(item, indx) in typeOptions"
                  :label="item"
                  :key="indx"
                  >{{ item }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择渠道分配的数量" prop="xcxtb" style="">
              <div v-if="checkedspcarr.length > 0">
                <div v-for="(item, index) in checkedspcarr" :key="index">
                  <div class="channel-box">
                    <div class="channel-title">{{ item.name }}</div>
                  </div>
                  <div
                    class="channel-box"
                    v-for="(spcitem, spcindex) in item.specification"
                    :key="spcindex"
                  >
                    <div class="channel-box-inner">
                      <span> {{ spcitem.specificationName }} </span>
                      <span> × {{ spcitem.specificationAmount }} </span>
                      <el-input
                        v-model="spcitem.inventoryUsable"
                        placeholder="请输入"
                        style="width: 100px"
                      ></el-input>
                      <span style="margin-left: 10px; color: red"
                        >注：当前分配总库存
                        {{ spcitem.inventoryUsabletwo }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="baseinfo">分配记录</div>
      <el-table :data="tableData" style="width: 100%; margin-top: 20px" border>
        <el-table-column
          prop="num"
          header-align="center"
          align="center"
          label="序号"
        >
          <template slot-scope="scope">
            <div>{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="distributorName"
          header-align="center"
          align="center"
          label="渠道"
        />
        <el-table-column
          prop="specificationName"
          header-align="center"
          align="center"
          label="规格"
        />
        <el-table-column
          prop="fpsl"
          header-align="center"
          align="center"
          label="分配数量"
        />
        <el-table-column
          prop="sysl"
          header-align="center"
          align="center"
          label="剩余数量"
        />
        <el-table-column
          prop="fpsj"
          header-align="center"
          align="center"
          label="分配时间"
        />
      </el-table>
      <div class="baseinfo">压货统计</div>
      <el-table
        :data="tableDataone"
        style="width: 100%; margin-top: 20px"
        border
      >
        <el-table-column
          prop="num"
          header-align="center"
          align="center"
          label="序号"
        >
          <template slot-scope="scope">
            <div>{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="distributorName"
          header-align="center"
          align="center"
          label="渠道"
        />
        <el-table-column
          prop="specificationName"
          header-align="center"
          align="center"
          label="规格"
        />
        <el-table-column
          prop="fpsl"
          header-align="center"
          align="center"
          label="进货"
        />
        <el-table-column
          prop="sysl"
          header-align="center"
          align="center"
          label="剩余库存"
        />
        <el-table-column
          prop="sysl"
          header-align="center"
          align="center"
          label="销量"
        />
      </el-table>
      <div class="baseinfo">云端统计</div>
      <el-table
        :data="tableDatatwo"
        style="width: 100%; margin-top: 20px"
        border
      >
        <el-table-column
          prop="num"
          header-align="center"
          align="center"
          label="序号"
        >
          <template slot-scope="scope">
            <div>{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="distributorName"
          header-align="center"
          align="center"
          label="渠道"
        />
        <el-table-column
          prop="specificationName"
          header-align="center"
          align="center"
          label="规格"
        />
        <el-table-column
          prop="fpsl"
          header-align="center"
          align="center"
          label="销量"
        />
      </el-table>
    </el-card>
    <div class="submit-btn">
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
import { allocation, getchannel } from "@/api/commodity/commodity";
import ImageUpload from "@/components/ImageUpload/index";
export default {
  data() {
    return {
      title: "新增分类",
      isdisabled: true,
      ruleForm: {
        type: "",
        sort: "",
        apptb: [],
        xcxtb: [],
        channe: [],
        inventoryUsable: "",
      },
      fileSize: 2,
      isShowTip: true,
      limit: 1,
      typeOptions: [],
      allspecificat: [],
      checkedspcarr: [],
      type: "",
      channeldata: [],
      tableData: [{}],
      tableDataone: [{}],
      tableDatatwo: [{}],
    };
  },
  components: {
    ImageUpload,
  },
  created() {
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
    //规格数据
    var specificationList = this.$route.query.data.specificationList || [];
    specificationList.map((item, index) => {
      item.inventoryUsabletwo = JSON.parse(JSON.stringify(item.inventoryUsable)) ;
      item.inventoryUsable = "";
    });
    //渠道对应规格
    this.getchanneldata(specificationList);
  },
  methods: {
    back() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    getchanneldata(specificationList) {
      getchannel().then((res) => {
        var rows = res.rows;
        this.channeldata = rows;

        var typeOptions = [];
        rows.map((item) => {
          typeOptions.push(item.distributorName);
        });
        this.$set(this.ruleForm, "channe", [typeOptions[0]]);
        this.typeOptions = typeOptions;
        var allspecificat = [];
        typeOptions.map((item) => {
          var obj = {
            name: item,
            specification: specificationList,
          };
          allspecificat.push(obj);
        });
        this.allspecificat = allspecificat;
        this.getcheckedspcarr();
      });
    },
    handleCheckedtypeChange(val) {
      this.checkedtype = val;
      this.getcheckedspcarr();
    },
    //获取选中
    getcheckedspcarr() {
      var channe = this.ruleForm.channe;
      var checkedspcarr = JSON.parse(JSON.stringify(this.allspecificat));
      var arr = checkedspcarr.filter((item) => channe.includes(item.name));
      this.checkedspcarr = arr;
    },
    submit() {
      var checkedspcarr = this.checkedspcarr;
      var smallcheckedspcarr = [];

      checkedspcarr.map((spcitem) => {
        var specification = [];
        spcitem.specification.map((item) => {
          var obj = {
            updateTime: item.updateTime,
            id: item.id,
            specificationBaseCode: item.specificationBaseCode,
            commodityBaseCode: item.commodityBaseCode,
            specificationName: item.specificationName,
            inventoryUsable: item.inventoryUsable,
          };
          specification.push(obj);
        });
        var obj = {
          name: spcitem.name,
          specificationList: specification,
        };
        smallcheckedspcarr.push(obj);
      });

      var channeldata = this.channeldata;
      channeldata.map((item) => {
        smallcheckedspcarr.map((spcitem) => {
          if (item.distributorName == spcitem.name) {
            spcitem.distributorBaseCode = item.distributorBaseCode;
          }
        });
      });
      allocation(smallcheckedspcarr).then((res) => {
        if (res.code == 200) {
          this.$message.success("提交成功！");
          this.back();
        } else {
          this.$message.error(res.msg);
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
.channel-box {
  width: 100%;
  border: 1px solid #ccc;
  .channel-title {
    width: 100%;
    color: #999;
    background-color: #f2f2f2;
    padding: 5px;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .channel-box {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px !important;
    padding-left: 10px;
    min-height: 50px;
    .channel-box-inner {
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
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

