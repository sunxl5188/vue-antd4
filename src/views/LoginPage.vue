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
			<a-form ref="ruleForm" :model="formData" :rules="rules"> </a-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="LoginPage">
const activeKey = ref('1')
const formData = ref({})
const rules = ref({})
</script>

<style scoped land="less"></style>
