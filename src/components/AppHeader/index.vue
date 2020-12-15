<template>
  <div>
    <div class="header">
      <a href="#/ ">
        <img class="logo" src="@/assets/logo.png" width="50px" />
        <span class="company">GSemir会员管理系统</span>
      </a>

      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="a"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-s-fold" command="b"
            >退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
//导入退出系统的api
import { logout } from "@/api/login";
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          //修改密码
          this.$message(`点击修改密码`);
          break;
        case "b":
          //退出系统
          //获取token
          logout(localStorage.getItem("gsq-mms-token")).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              //退出成功
              //清除本地数据
              localStorage.removeItem("gsq-mms-token");
              localStorage.removeItem("gsq-mms-user");
              //回到登录页面
              this.$router.push("/login");
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
                duration: 1000,
              });
            }
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.company {
  position: absolute;
  color: white;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>