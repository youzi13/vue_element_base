<template>
  <div class="logindiv">
    <el-card class="box-card">
      <h1 class="systile">模板系统开发</h1>
      <br><br>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="primary" @click="test">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        window.localStorage.setItem("token", "test")
        this.$router.push("/")
      },
      test() {
        this.$router.push("/test")
      }
    }
  };
</script>

<style>
  .box-card {
    height: 400px;
    width: 500px;

  }

  .logindiv {
    padding-left: 550px;
    padding-top: 150px;
  }

  .systile {
    color: #0b4577c7;
    font-family: sans-serif;
  }
</style>
