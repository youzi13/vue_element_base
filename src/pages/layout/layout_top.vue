<!--上下结构-->
<template>
<el-container class="mainindex">
    <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#0b4577c7" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
    </el-header>

        <el-main><router-view/></el-main>

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
    height: 250px;
    padding: 0 0px;
}
.el-aside,.el-header{
  background-color: #0b4577c7;
}
.el-main {

    color: #333;
    text-align: center;

}

.mainindex {
    height: 100%;
}

.maincontent {
    height: 50%;
}

.el-header {
    height: 250px
}
</style>
