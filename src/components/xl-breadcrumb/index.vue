<template>
	<div></div>
</template>

<script setup lang="ts" name="Breadcrumb">
import { useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const route = useRoute()
let matched = route.matched

const isDashboard = (route: RouteRecordRaw) => {
	const name = route?.name as string
	if (!name) {
		return false
	}
	return name.trim() === 'Index'
}

if (!isDashboard(matched[0])) {
	//let amatched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
	//console.log(amatched)
}
</script>
