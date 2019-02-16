<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt>
        </el-col>
        <el-col :span="19">
          <h2 class="middle">电商后台管理</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class="logout" @click.prevent="headloginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧栏 -->
      <el-aside class="aside" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
        >
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="users">
                <i class="el-icon-menu"></i>用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>角色列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>商品列表
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>分类参数
              </el-menu-item>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>数据报表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  beforeMount() {
    if (!localStorage.getItem("token")) {
      this.$router.push({
        name: "login"
      });
      this.$message.warning("先登录啊小老弟");
    }
  },
  methods: {
    headloginout() {
      localStorage.clear();
      this.$router.push({
        name: "login"
      });
      this.$message.warning("退出成功");
    }
  }
};
</script>
<style>
.container {
  height: 100%;
  background-color: #b3c0d1;
}
.middle {
  text-align: center;
  line-height: 26px;
}
.logout {
  text-align: center;
  line-height: 50px;
  text-decoration: none;
}
.aside {
  /* height: 100%; */
  /* background-color: yellow; */
}

.main {
  /* height: 100%; */
  background-color: green;
}
</style>
