<!-- 上左右结构-->
<template>
  <el-container class="mainindex">
    <el-header>
    </el-header>
    <el-container class="maincontent">
      <el-aside width="200px">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#0b4577c7" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {

    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      handleOpen() {

      },
      handleClose(){
        
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    padding: 0 0px;
    height: 250px
  }

  .el-aside,
  .el-header {
    background-color: #0b4577c7;
  }

  .el-main {

    color: #333;
    text-align: center; 
        padding: 0px;   

  }

  .mainindex {
    height: 100%;
  }

  .maincontent {
    height: 80%;
  }

  .el-header {
    height: 250px
  }
</style>
