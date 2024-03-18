<template>
	<a-layout class="h-screen">
		<a-layout-header></a-layout-header>
		<a-layout>
			<LayoutSider />
			<a-layout-content class="bg-gray-100 p-4">
				<router-view v-slot="{ Component }">
					<transition>
						<keep-alive :include="store.keepArray">
							<component :is="Component"></component>
						</keep-alive>
					</transition>
				</router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts" name="LayoutIndex">
import LayoutSider from './LayoutSider.vue'
import { useAppStore } from '@/store/appStore'

const store = useAppStore()
</script>
