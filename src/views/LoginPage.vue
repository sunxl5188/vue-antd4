<template>
	<div class="h-screen bg-gray-100 flex justify-center items-center">
		<div>
			<div class="flex justify-center">
				<span><SvgIcon name="logo" class="w-8 h-8" /></span>
				<span class="font-bold text-3xl ml-2">Admin Pro</span>
			</div>
			<p class="text-sm pt-3 pb-4">
				Ant Design 是西湖区最具影响力的 Web 设计规范
			</p>
			<a-tabs v-model:activeKey="activeKey" centered>
				<a-tab-pane :key="1" tab="帐号密码登录" />
				<a-tab-pane :key="2" tab="手机号登录" />
			</a-tabs>
			<a-form ref="formRef" :model="formData" :rules="rules" autoComplete="off">
				<!-- 账号登陆 -->
				<template v-if="activeKey === 1">
					<a-form-item name="userName">
						<a-input
							v-model:value="formData.userName"
							placeholder="账户:admin"
							allowClear
						>
							<template #prefix><user-outlined /></template>
						</a-input>
					</a-form-item>
					<a-form-item name="password">
						<a-input-password
							v-model:value="formData.password"
							placeholder="密码:admin"
							allowClear
						>
							<template #prefix>
								<LockOutlined class="site-form-item-icon" />
							</template>
						</a-input-password>
					</a-form-item>
				</template>
				<template v-if="activeKey === 2">
					<a-form-item name="phone">
						<a-input
							v-model:value="formData.phone"
							placeholder="手机号"
							allowClear
						>
							<template #prefix><MobileOutlined /></template>
						</a-input>
					</a-form-item>
					<a-form-item name="code">
						<a-space>
							<a-input
								v-model:value="formData.code"
								placeholder="验证码"
								allowClear
							>
								<template #prefix><MailOutlined /></template>
							</a-input>
							<a-button>获取验证码</a-button>
						</a-space>
					</a-form-item>
				</template>
				<a-form-item>
					<div class="flex justify-between items-center w-full">
						<a-checkbox v-model:checked="formData.autoLogin">
							自动登录
						</a-checkbox>
						<router-link to="/recover">忘记密码</router-link>
					</div>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" block @click="handleSubmit">登录</a-button>
				</a-form-item>
				<a-form-item>
					<div class="flex justify-between items-center w-full">
						<a-space>
							<span>其他登录方式</span>
							<AlipayCircleOutlined
								class="cursor-pointer text-2xl text-gray-500 hover:text-gray-800"
							/>
							<TaobaoCircleOutlined
								class="cursor-pointer text-2xl text-gray-500 hover:text-gray-800"
							/>
							<WeiboCircleOutlined
								class="cursor-pointer text-2xl text-gray-500 hover:text-gray-800"
							/>
						</a-space>
						<router-link to="/register">注册账户</router-link>
					</div>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="LoginPage">
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useUserStore } from '@/store/userStore'
import { notification } from 'ant-design-vue'

interface LoginPropType {
	userName: string
	password: string
	phone: string
	code: string
	autoLogin: boolean
}
const store = useUserStore()
const activeKey = ref<number>(1)
const formData: UnwrapRef<LoginPropType> = reactive({
	userName: '',
	password: '',
	phone: '',
	code: '',
	autoLogin: true
})

const rules: Record<string, Rule[]> = {
	userName: [{ required: true, message: '请输入帐户名或邮箱地址' }],
	password: [{ required: true, message: '请输入密码' }],
	phone: [{ required: true, message: '请输入手机号' }],
	code: [{ required: true, message: '请输入验证码' }]
}

const formRef = ref()
const handleSubmit = (): void => {
	formRef.value
		.validate()
		.then(() => {
			store
				.login(formData, activeKey.value)
				.then(() => {
					notification['success']({
						message: '登录成功',
						description: '正在跳转页面'
					})
				})
				.catch(err => {
					console.log(err)
				})
		})
		.catch(() => {})
}

onMounted(() => {})
</script>

<style lang="less" scoped>
::v-deep(.ant-form) {
	width: 320px;
}
</style>
