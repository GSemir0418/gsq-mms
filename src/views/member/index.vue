<template>
  <div>
    <!-- 条件查询 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin: 20px"
    >
      <el-form-item prop="cardNum">
        <el-input
          v-model="searchMap.cardNum"
          placeholder="会员卡号"
          width="200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="会员姓名"
          width="200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select
          v-model="searchMap.payType"
          placeholder="支付方式"
          width="110px"
        >
          <el-option
            v-for="payType in payTypeOptions"
            :key="payType.type"
            :label="payType.name"
            :value="payType.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday" width="200px">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 会员数据 -->
    <el-table :data="list" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60px">
      </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column
        prop="name"
        label="会员姓名"
        width="90px"
      ></el-table-column>
      <el-table-column prop="birthday" label="生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="integral" label="积分"> </el-table-column>
      <el-table-column prop="money" label="余额"> </el-table-column>
      <el-table-column prop="payType" label="支付方式">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加会员弹窗 -->
    <el-dialog title="新增会员" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="pojo"
        :rules="rules"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="pojo.birthday"
            type="date"
            placeholder="会员生日"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="pojo.phone"></el-input>
        </el-form-item>
        <el-form-item label="可用积分">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额">
          <el-input v-model="pojo.money"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="payType">
          <el-select v-model="pojo.payType" placeholder="支付方式">
            <el-option
              v-for="payType in payTypeOptions"
              :key="payType.type"
              :label="payType.name"
              :value="payType.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址">
          <el-input v-model="pojo.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null ? addData('pojoForm') : updateData('pojoForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import memberApi from "@/api/member";
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" },
];
export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      //直接定义searchMap:{}也可以 要是不指定的话 可能会。。卡顿？
      searchMap: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      payTypeOptions,
      dialogFormVisible: false,
      //直接定义pojo:{}也可以 要是不指定的话 可能会。。卡顿？
      pojo: {
        id: null,
        cardNum: "",
        name: "",
        payType: "",
        phone: "",
        money: 0,
        integral: 0,
        birthday: "",
        address: "",
      }, //新增的会员对象
      rules: {
        //校验规则 要校验哪个就在哪个上加prop=""属性
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "支付类型不能为空", trigger: "change" },
        ],
      },
    };
  },

  created() {
    //初始化获取列表数据
    this.fetchData();
  },

  components: {},

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
      console.log(this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    fetchData() {
      //利用分页查询数据
      //memberApi.getList().then((response) => {
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          const resp = response.data;
          //console.log(resp.data.rows)
          this.list = resp.data.rows;
          this.total = resp.data.total;
        });
    },
    handleEdit(id) {
      //console.log(id, "编辑");
      //弹出并清空原数据
      this.handleAdd();
      //通过id查询数据
      memberApi.getById(id).then((response) => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },
    handleDelete(id) {
      //console.log(id, "删除");
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击确定
          memberApi.deleteById(id).then((response) => {
            const resp = response.data;
            this.$message({
              message: resp.message,
              type: resp.flag ? "success" : "error",
            });
            if (flag) {
              //删除成功
              this.fetchData(); //刷新列表
            }
          });
        })
        .catch(() => {
          //点击取消
          //取消删除，不理会
        });
    },
    //重置搜索栏
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交新增
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //如果页面上校验通过
          console.log("addData");
          //提交表单
          memberApi.add(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              //新增成功，刷新列表数据
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //弹出新增窗口
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.pojo = {};
        //this.$nextTick(()=>是一个异步事件 当渲染结束之后，他的回调函数才会执行
        //弹出窗口打开之后，需要一点时间加载Dom，
        //所以我们就要等待加载完Dom之后，再进行调用resetFields方法
        this.$refs["pojoForm"].resetFields();
      });
    },
    //提交新增数据
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过 提交数据
          memberApi.updata(this.pojo).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData(); //刷新列表数据
              this.dialogFormVisible = false; //关闭窗口
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          //验证不通过
          return false;
        }
      });
    },
  },

  filters: {
    payTypeFilter(type) {
      const payObj = payTypeOptions.find((obj) => obj.type === type);
      return payObj ? payObj.name : null;
    },
  },
};
</script>

<style scoped>
</style>