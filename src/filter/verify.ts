export const verifyEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("邮箱不能为空"))
  }
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (reg.test(value)) {
    return callback()
  }
  return callback(new Error("输入的邮箱错误"))
}

export const verifyPhone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("手机号码不能为空"))
  }
  const reg = /^1[3456789]\d{9}$/
  if (reg.test(value)) {
    return callback()
  }
  return callback(new Error("手机号码错误，请重新输入"))
}
