<!--上下结构-->
<template>
<el-container class="mainindex">
    <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#0b4577c7" text-color="#fff" active-text-color="#ffd04b">
             <menu-tree v-for="item in menusList" :key="item.id" :menu="item"></menu-tree>
            </el-menu>
    </el-header>

        <el-main><router-view/></el-main>

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
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
      handleOpen() {
    
      },
      handleClose(){
        
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
