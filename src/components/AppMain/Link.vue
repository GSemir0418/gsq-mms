<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="line">
        <span class="title">{{ $route.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style scoped>
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
}
.line {
  border-left: 3px solid #31c17b;
  padding-left: 10px;
}
.title{
    color:black
}
</style>