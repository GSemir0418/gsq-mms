<template>
  <div>
    <app-header/>
    <app-main/>
    <app-navbar/>  
  </div>
</template>
<script>
import AppHeader from './AppHeader'
import AppMain from './AppMain'
import AppNavbar from './AppNavbar'
export default {
    components:{
        AppHeader,
        AppMain,
        AppNavbar
    }
}
</script>
<style>
.header {
  position: absolute;
  background-color: rgb(83, 57, 23);
  line-height: 50px;
  top: 0;
  left: 0;
  right: 0;
}
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: rgb(36, 23, 7);
}
.main {
  position: absolute;
  top: 50px; 
  left: 230px;
  right: 0;
  bottom:0;
  padding: 10px;
  overflow-y: auto;
  background-color: chocolate;
}
</style>