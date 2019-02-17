<template>
  <div>
    <el-card class="box">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">用户管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <el-row class="el-box">
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            v-model="query"
            class="input-with-select suinput"
            clearable
            @clear="getAlluser()"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="14">
          <el-button type="success" @click="adduserShow()">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 列表 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="#" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
        <el-table-column label="创建日期" width="140">
          <template slot-scope="scope">{{scope.row.create_time | fmtdata}}</template>
        </el-table-column>
        <el-table-column label="用户状态" width="140">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="140">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
            <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2,4,6,8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <!-- 表单 -->
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="adduse()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- 添加弹出对话框 -->
</template>
<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      list: [],
      total: -1,
      dialogFormVisibleAdd: false,
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  created() {
    this.getTabData();
  },
  methods: {
    async adduse() {
      const res = await this.$http.post(`users`, this.formdata);
      console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        this.dialogFormVisibleAdd = false;
        this.getTabData();
      }
    },
    adduserShow() {
      this.formdata = {};
      this.dialogFormVisibleAdd = true;
    },
    getAlluser() {
      this.getTabData();
    },
    searchUser() {
      this.pagenum = 1;
      this.getTabData();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getTabData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getTabData();
    },
    async getTabData() {
      const AUTH_TOKEN = await localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.total = data.total;
        this.list = data.users;
        console.log(this.list);
      }
    }
  }
};
</script>
<style>
.el-box {
  margin-top: 30px;
}
.suinput {
  width: 350px;
}
</style>
