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
				<a-tab-pane key="1" tab="帐号密码登录" />
				<a-tab-pane key="2" tab="手机号登录" />
			</a-tabs>
			<a-form ref="formRef" :model="formData" :rules="rules">
				<a-form-item name="userName">
					<a-input
						v-model:value="formData.userName"
						placeholder="请输入账号"
						allowClear
						autoComplete="off"
					>
						<template #prefix><user-outlined /></template>
					</a-input>
				</a-form-item>
				<a-form-item name="password">
					<a-input-password
						v-model:value="formData.password"
						placeholder="请输入登录密码"
						allowClear
						autoComplete="off"
					>
						<template #prefix>
							<LockOutlined class="site-form-item-icon" />
						</template>
					</a-input-password>
				</a-form-item>
				<a-form-model-item class="flex justify-between items-center mb-6">
					<a-checkbox value="1">自动登录 </a-checkbox>
					<a-button type="link">忘记密码</a-button>
				</a-form-model-item>
				<a-form-item>
					<a-button type="primary" block @click="handleSubmit">登录</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="LoginPage">
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'

interface LoginPropType {
	userName: string
	password: string
}
const activeKey = ref<string>('1')
const formData: UnwrapRef<LoginPropType> = reactive({
	userName: '',
	password: ''
})

const rules: Record<string, Rule[]> = {
	userName: [{ required: true, message: '请输入帐户名或邮箱地址' }],
	password: [{ required: true, message: '请输入密码' }]
}

const formRef = ref()
const handleSubmit = (): void => {
	formRef.value
		.validate()
		.then(() => {
			console.log(22)
		})
		.catch(() => {
			console.log(11)
		})
}

const handleReset = (): void => {
	formRef.value.resetFields()
}
</script>
