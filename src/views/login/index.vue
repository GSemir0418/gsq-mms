<template lang="">
    <div class="login-container">
        <el-form class="login-form" :rules="rules" ref="form" :model="form" label-width="80px">
            <h2 class="login-title">GSemir会员管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { login, getUserInfo } from "@/api/login";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          //可以对username进行很多规则验证，因此采用数组形式定义
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //console.log(valid)
        if (valid) {
          //提交表单给后台进行验证
          login(this.form.username, this.form.password).then((response) => {
            const resp = response.data;
            console.log(response.data);
            if (resp.flag) {
              //验证成功，下面通过异步token获取用户信息
              getUserInfo(resp.data.token).then((response) => {
                const respUser = response.data;
                //判断是否获取到了用户信息
                if (respUser.flag) {
                  //获取到了用户的数据
                  console.log("userInfo", respUser.data);
                  //1.保存token和用户信息
                  localStorage.setItem(
                    "gsq-mms-user",
                    JSON.stringify(respUser.data)
                  );
                  localStorage.setItem("gsq-mms-token", resp.data.token);
                  //前往首页
                  this.$router.push("/");
                } else {
                  this.$message({
                    message: resp.message,
                    type: "warning",
                  });
                }
              });
            } else {
              //验证失败 未通过 弹出警告
              //alert(resp.message)有点丑。。用element ui
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          console.log("验证失败!");
        }
      });
    },
  },
};
</script>
<style scoped>
.login-form {
  width: 350px;
  margin: 200px auto;
  background-color: rgb(213, 228, 223, 0.8);
  padding: 28px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/bg.jpg") no-repeat;
  background-size: cover;

  background-position: center 0;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -o-background-size: cover;
  -moz-background-size: cover;
  -ms-background-size: cover;
}
.login-title {
  text-align: center;
}
</style>