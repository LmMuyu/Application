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
import { loginPost } from "network/login";
import { USERINFO } from "@/store/mutations-types";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      let toast1 = this.$toast.loading({
        message: "请稍后...",
        forbidClick: true
      });

      let loginInfo = {
        username: this.username,
        password: this.password
      };

      loginPost(loginInfo).then(val => {
        toast1.clear();

        if (val.meassage) {
          let { info } = val;
          let { token } = info;
          localStorage.setItem("token", token);
          delete info.token;
          this.$store.commit(USERINFO, info);
          this.$router.push("/file").catch(err => {
            err;
          });

          return;
        }

        this.$toast(val);
      });
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