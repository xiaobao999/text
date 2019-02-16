<template>
  <div class="login-wrap">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formdata"
      class="login-form"
    >
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="success" class="login-btn" @click.prevent="handleLogin()">登陆</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      //   this.$http.post(`login`, this.formdata).then(res => {
      //     console.log(res);
      //     const {
      //       data: {
      //         data,
      //         meta: { msg, status }
      //       }
      //     } = res;
      //     if (status === 200) {
      //       console.log("success");
      //       this.$router.push({
      //         name: "home"
      //       });
      //     } else {
      //       this.$message.error(msg);
      //     }
      //   });
      const res = await this.$http.post(`login`, this.formdata);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      if (status === 200) {
        console.log("success");
        localStorage.setItem('token',data.token)
        this.$router.push({
          name: "home"
        });
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>
<style>
.login-wrap {
  background: #324152;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #ffffff;
  border-radius: 5px;
  width: 400px;
  padding: 30px;
}
.login-btn {
  width: 100%;
}
</style>
