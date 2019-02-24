<template>
  <el-container class="container box">
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
          :default-active="$route.name"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
        >
          <!-- 1 -->
          <el-submenu :index="item1.order+''" v-for="(item1) in menus" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>

            <el-menu-item-group v-for="(item2) in item1.children" :key="item2.id">
              <el-menu-item :index="item2.path+''">
                <i class="el-icon-menu"></i>
                {{item2.authName}}
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
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    async getMenus() {
      const res = await this.$http.get(`menus`);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.menus = data;
      }
    },
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
<style scoped>
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
  height: 100%;
  background-color: #b3c0d1;
}

.main {
  height: 100%;
  background-color: #b3c0d1;
}
.box {
  height: 100%;
}
</style>
