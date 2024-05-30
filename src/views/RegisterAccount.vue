<template>
	<div>
		<TableVirtually />
		<!-- <a-breadcrumb :routes="route.matched">
			<template v-slot:itemRender="{ route, params, routes, paths }">
				<span v-if="routes.indexOf(route) === routes.length - 1">
					{{ route.breadcrumbName }}
				</span>
				<router-link v-else :to="`basePath/${paths.join('/')}`">
					{{ route.breadcrumbName }}
				</router-link>
			</template>
			{{ params }}
		</a-breadcrumb> -->
	</div>
</template>

<script setup lang="ts" name="RegisterAccount">
import TableVirtually from '@/components/TableVirtually.vue'

const data = reactive({})

const init = { ...data }

Object.assign(data, init)
</script>

<style scoped land="scss"></style>
