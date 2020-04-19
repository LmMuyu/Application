<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="账号"
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="bottomtext">
      <span>忘记密码?</span>
      <span @click="Registered">立即注册</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
    Registered() {
      this.$router.push("/loginreg/LR2").catch(err => {
        err;
      });
    }
  }
};
</script>

<style scoped>
.bottomtext {
  font-size: 14px;
}
.bottomtext span:nth-of-type(1) {
  padding: 0 8px 0 0;
}
.bottomtext span:nth-of-type(2) {
  color: #e74c3c;
}
</style>