<template>
  <div class="app-container">
    <div>
      <el-button size="small" type="primary" @click="resetQuery"
        >返回</el-button
      >
      <span class="title">{{ title }}</span>
    </div>
    <el-card class="box-card">
      <div class="card-title" >新增海关商品备案</div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "海关商品管理  >  海关商品备案",
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
}
</style>
