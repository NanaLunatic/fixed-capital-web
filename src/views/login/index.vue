<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { type FormInstance, type FormRules } from "element-plus"
import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import { type LoginRequestData } from "@/api/login/types/login"
import { cloneDeep } from "lodash-es"
import { useFocus } from "./hooks/useFocus"
import { encrypt } from "@/utils/JSEncrypt"

const router = useRouter()
const { isFocus, handleBlur, handleFocus } = useFocus()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: "",
  password: ""
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}
/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      const params = cloneDeep(loginFormData)
      params.password = encrypt(loginFormData.password)
      useUserStore()
        .login(params)
        .then(() => {
          router.push({ path: "/" })
        })
        .catch(() => {
          loginFormData.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
</script>

<template>
  <div class="login-container">
    <dv-border-box10 class="login-card">
      <dv-decoration7 style="margin-top: 56px">
        <div class="card-tit">亚士德资产管理系统</div>
      </dv-decoration7>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              @blur="handleBlur"
              @focus="handleFocus"
            />
          </el-form-item>
          <dv-button border="Border2" color="#169BE0" class="el-button" :loading="loading" @click.prevent="handleLogin"
            >登 录</dv-button
          >
        </el-form>
      </div>
    </dv-border-box10>

    <div class="statement">
      <p>法律声明 Copyright © 2024 深圳亚士德科技股份有限公司 All Rights Reservcd 粤ICP备20029810号-2</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "MyCustomFont";
  src: url("@/assets/images/regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.login-container {
  width: 100%;
  min-height: 100%;
  background-image: url("@/assets/layouts/login-bg.png");
  background-repeat: repeat-x;
  background-size: 100% 100%;
  background-position: center;
  background-attachment: fixed;
  .login-card {
    max-width: 90%;
    position: absolute;
    right: 0;
    top: 48%;
    left: 0;
    margin: auto;
    transform: translateY(-50%);
    width: 414px;
    height: auto;
    color: #fff;
    .card-tit {
      text-align: center;
      font-size: 30px;
      margin: auto 8px;
      letter-spacing: 1px;
      font-family: "MyCustomFont", sans-serif;
      background: linear-gradient(to bottom, #fff, #46d6ff);
      -webkit-background-clip: text;
      color: transparent;
      /* 兼容旧版 WebKit 浏览器 */
      -webkit-text-fill-color: transparent;
    }
    .content {
      padding: 26px 50px 56px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
      }
      .el-button {
        width: 100%;
        margin-top: 16px;
        height: 42px;
      }
    }
  }
  .statement {
    text-align: center;
    position: fixed;
    bottom: 4px;
    right: 0;
    left: 0;
    font-size: 15px;
    color: #cfd3dc;
    margin: auto;
  }
}
</style>
<style lang="scss">
.login-container {
  .el-input__wrapper {
    background-color: rgba(0, 35, 89, 0.8);
    border: 1px solid rgb(0, 21, 53);
  }
}
</style>
