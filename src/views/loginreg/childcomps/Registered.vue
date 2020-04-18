<template>
  <div class="registered">
    <van-form @submit="onSubmit">
      <van-field
        v-model="user"
        name="名称"
        label="名称"
        placeholder="2到6字符"
        :maxlength="6"
        :rules="[{ validator , required: true, message:message }]"
      />
      <van-field
        v-model="username"
        name="账号"
        label="账号"
        placeholder="字母开头，允许5-16字节，允许字母数字下划线"
        :maxlength="10"
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :maxlength="18"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="passwords"
        type="password"
        name="确定密码"
        label="确定密码"
        placeholder="确定密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { postLogin } from "network/login";

export default {
  name: "registered",
  data() {
    return {
      user: "", //名称
      username: "", //账号
      password: "", //密码
      passwords: "", //确定密码
      message: "请输入名称",
      regex: /^[a-zA-Z]\w{5,17}$/, //密码验证
      gex: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ //账号验证
    };
  },
  methods: {
    onSubmit() {
      if (!this.username.match(this.gex)) {
        this.$toast("账号太弱");
      } else if (this.passwords !== this.password) {
        this.$toast("密码不一致");
      } else if (!this.password.match(this.regex)) {
        this.$toast("密码太弱");
      } else {
        let login = {
          user: this.user,
          username: this.username,
          password: this.password
        }; //获取注册账号密码

        let toast = this.$toast.loading({
          message: "请稍后...",
          forbidClick: true
        }); //等待时间

        postLogin(login).then(({ val, token }) => {
          this.$toast.clear(toast); //清除等待
          if (val === "账号已存在") {
            this.$toast(val);
          } else {
            this.user = this.username = this.password = this.passwords = ""; //清空账号密码
          }
          console.log(token);
        });
      }
    },
    validator(values) {
      if (values.length === 0) {
        this.message = "请输入名称";
        return false;
      } else if (values.length < 2) {
        this.message = "请重新输入的名称";
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
</style>