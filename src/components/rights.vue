<template>
  <el-card class="box">
    <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="#" width="50">
        <template slot-scope="scope">{{scope.row.id-100}}</template>
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="140"></el-table-column>
      <el-table-column prop="path" label="路径" width="140"></el-table-column>
      <el-table-column label="层级" width="140">
        <template slot-scope="scope">{{listlevel}}</template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  created() {
    this.gettablist();
  },
  methods: {
    async gettablist() {
      const res = await this.$http.get(`rights/list`);
      console.log(res);
      const {
        status,
        data: { data }
      } = res;
      if (status === 200) {
        this.list = data;
      }
    }
  },
  data() {
    return {
      list: [],
      index: 0,
      listlevel: ""
    };
  },
  computed: {
    levellist(list.level) {}
  }
};
</script>
<style>
.box {
  height: 100%;
}
</style>
