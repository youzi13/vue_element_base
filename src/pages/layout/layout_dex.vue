<!-- 上左右结构-->
<template>
<el-container class="mainindex">
    <el-header>
    </el-header>
    <el-container class="maincontent">
        <el-aside width="200px">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#0b4577c7" text-color="#fff" active-text-color="#ffd04b">
             <menu-tree v-for="item in menusList" :key="item.id" :menu="item"></menu-tree>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import MenuTree from "@/components/MenuTree"
export default {
  components:{
        MenuTree
  },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            menusList: []
        }
    },
    methods: {
        handleOpen() {

        },
        handleClose() {

        }
    },
    mounted() {
        this.menusList = this.$store.state.menu.navTree      
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
