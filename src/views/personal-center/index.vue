<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import { ElMessage, genFileId, ElUpload } from "element-plus"
import type { FormRules, FormInstance, UploadInstance } from "element-plus"
import { useRoute, useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { Edit } from "@element-plus/icons-vue"
import { getUserInfo, editUserPhone, editUserPass } from "@/api/login"
import { encrypt } from "@/utils/JSEncrypt"
import { getToken } from "@/utils/cache/cookies"
import avatarUrl from "@/assets/images/avatar.png"
import { setUserInfo } from "@/utils/cache/local-storage"

const route = useRoute()
const router = useRouter()
const circleUrl = ref("")
const FormRef = ref<FormInstance | null>(null)
const upload = ref<UploadInstance>()
const dialogImageUrl = ref("")
const dialogVisible = ref(false)
const dialogPassword = ref(false)
const input_phone = ref(true)
const signatureUrl = ref()
const userStore = useUserStore()
const avatarApi = ref(import.meta.env.VITE_BASE_API + "/api/users/updateAvatar")
const action = ref(import.meta.env.VITE_BASE_API + "/api/users/updateSignature")

const userInfo = ref({})

const ruleForm = reactive({
  oldPass: "",
  newPass: "",
  confirmPass: ""
})
const formRules = reactive<FormRules>({
  oldPass: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码不能少于6位 大于12位", trigger: "blur" }
  ],
  newPass: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码不能少于6位 大于12位", trigger: "blur" }
  ],
  confirmPass: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 12, message: "密码不能少于6位 大于12位", trigger: "blur" }
  ]
})
//#region 增

//#region 删

//#region 改
const modify = (type: string) => {
  if (type === "phone") {
    input_phone.value = true
    editUserPhone({ phone: userInfo.value.phone, id: userInfo.value.id }).then((res) => {
      ElMessage.success("修改手机号码成功！")
      queryUserInfo()
    })
  } else {
    dialogPassword.value = true
  }
}

// 修改密码提交
const confirmSubmit = () => {
  FormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (ruleForm.newPass === ruleForm.confirmPass) {
        editUserPass({ oldPass: encrypt(ruleForm.oldPass), newPass: encrypt(ruleForm.newPass) }).then((res) => {
          ElMessage.success("修改密码成功,青重新登录！")
          dialogPassword.value = false
          userStore.logout()
          router.push("/login")
        })
      } else {
        ElMessage.error("两次密码不一致，请重新输入")
        ruleForm.newPass = ""
        ruleForm.confirmPass = ""
      }
    }
  })
}

const storageUserInfo = JSON.parse(localStorage.getItem("Asiatek-user-info"))

//#region 查
const queryUserInfo = () => {
  getUserInfo().then((res) => {
    userInfo.value = res
    circleUrl.value = res.avatarName ? import.meta.env.VITE_BASE_API + `/avatar/${res.avatarName}` : ""
    signatureUrl.value = res.signatureName ? import.meta.env.VITE_BASE_API + `/avatar/${res.signatureName}` : ""
    storageUserInfo.avatarName = res.avatarName
    storageUserInfo.user = res
    setUserInfo(JSON.stringify(storageUserInfo))
  })
}

const Upload = (param) => {
  this.formData.append("file", param.file)
  upcode(this.formData).then((res) => {
    this.Form.imageUrl = res.data
    this.$message.success(res.message)
  })
}
const handleChange = (file, fileList) => {
  const isJPEG = file.raw.type === "image/jpeg"
  const isPNG = file.raw.type === "image/png"
  const isJPG = file.raw.type === "image/jpg"
  const isGIF = file.raw.type === "image/GIF"
  const isLt2M = file.size / 1024 / 1024 < 10
  if (!(isJPEG || isPNG || isJPG || isGIF)) {
    ElMessage.error("上传图片只能是 JPEG/PNG/JPG/GIF 格式!")
  } else if (!isLt2M) {
    ElMessage.error("上传图片大小不能超过 10MB!")
  }
  if (fileList.length > 1) {
    fileList.splice(0, 1)
  }
}

// 打开文件选择窗口
const handleRequest = (file: File) => {}

//设置 limit--文件数量 和 on-exceed 可以在选中时自动替换上一个文件。
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
const handleDownload = (file: UploadFile) => {
  window.open(file.url)
}

onMounted(() => {
  queryUserInfo()
})
</script>

<template>
  <div class="main-content personal-center">
    <el-card :header="route.meta.title">
      <el-button class="back" @click="router.back()">返回</el-button>
      <el-descriptions border class="userData" title="" :column="1">
        <el-descriptions-item label="头像" align="center">
          <el-upload
            class="upload-wrap"
            :headers="{ Authorization: `Bearer ${getToken()}` }"
            :action="avatarApi"
            :on-success="
              () => {
                queryUserInfo()
              }
            "
            :show-file-list="false"
            accept=".jpg, .jpeg, .gif, .png, .bmp"
          >
            <el-avatar shape="circle" class="upload-avatar" :size="120" :src="circleUrl ? circleUrl : avatarUrl" />
            <div class="upload-title">
              <div class="upload-title-content">更换头像</div>
            </div>
          </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="工号" align="center">{{ userInfo.username }}</el-descriptions-item>
        <el-descriptions-item label="姓名" align="center">{{ userInfo.nickName }}</el-descriptions-item>
        <el-descriptions-item label="注册时间" align="center">{{ userInfo.createTime }}</el-descriptions-item>
        <el-descriptions-item label="电子邮箱" align="center">{{ userInfo.email }}</el-descriptions-item>
        <el-descriptions-item label="所属部门" align="center">
          <el-tag type="success">{{ userInfo.dept ? userInfo.dept.name : "-" }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="传真" align="center">{{ userInfo.userFax || "-" }} </el-descriptions-item>
        <el-descriptions-item label="手机" align="center">
          <div v-if="input_phone">
            <span class="edit">{{ userInfo.phone }}</span>
            <el-button
              style="margin-left: 5px; font-size: 20px"
              type="primary"
              link
              :icon="Edit"
              @click="input_phone = false"
            />
          </div>
          <div v-else>
            <el-input class="phone-input" v-model="userInfo.phone" />
            <el-button style="margin-left: 5px; font-size: 13px" type="primary" size="small" @click="modify('phone')"
              >确认</el-button
            >
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="密码" align="center">
          <span class="edit">**********</span>
          <el-button
            style="margin-left: 5px; font-size: 20px"
            type="primary"
            link
            :icon="Edit"
            @click="modify('password')"
        /></el-descriptions-item>
        <el-descriptions-item label="个人签章" align="center">
          <el-upload
            class="avatar-uploader"
            ref="er"
            action="#"
            :show-file-list="false"
            :http-request="handleRequest"
            :on-change="
              (file, fileList) => {
                handleChange(file, fileList)
              }
            "
          >
            <img v-if="signatureUrl" :src="signatureUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-dialog v-model="dialogPassword" title="修改密码" width="30%">
      <el-form ref="FormRef" :model="ruleForm" :rules="formRules" label-width="90px">
        <el-form-item label="原密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="ruleForm.newPass" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input v-model="ruleForm.confirmPass" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogPassword = false">取消</el-button>
          <el-button type="primary" @click="confirmSubmit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.personal-center {
  margin: auto;
  .el-card {
    height: 100%;
  }
}
.upload-wrap {
  text-align: center;
  position: relative;
  .upload-title {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    text-align: center;
    box-sizing: border-box;
    position: absolute;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    &:hover {
      .upload-title-content {
        display: block;
      }
    }
    .upload-title-content {
      display: none;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      color: #fff;
      font-size: 12px;
      background: hsla(0, 1%, 36%, 0.5);
      border-radius: 0 0 120px 120px;
    }
  }
}
.userData {
  margin-left: 30px;
  :deep(.el-descriptions__body) {
    margin-left: 25px;
    .el-descriptions__table:not(.is-bordered) .el-descriptions__cell {
      padding-bottom: 20px;
      font-size: 16px;
    }
  }
}
:deep(.el-tag__content) {
  font-size: 14px;
}
.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell {
  line-height: 30px !important;
}
:deep(.phone-input) {
  width: 200px;
  .el-input__inner {
    height: 28px;
  }
}
:deep(.el-descriptions__body) {
  .el-descriptions__table.is-bordered .el-descriptions__cell {
    line-height: 32px;
  }
}
.edit {
  display: inline-block;
  width: 200px;
}
.back {
  width: 60px;
  position: relative;
  top: -62px;
  left: 81px;
}
</style>
