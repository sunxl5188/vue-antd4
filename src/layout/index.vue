<template>
	<div class="h-100">
		<a-layout v-if="network" class="h-screen">
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
		<a-result v-else status="warning" title="网络已断开"></a-result>
	</div>
</template>

<script setup lang="ts" name="LayoutIndex">
import LayoutSider from './LayoutSider.vue'
import { useAppStore } from '@/store/appStore'
import { useEventListener } from '@vueuse/core'

const store = useAppStore()

const network = ref<boolean>(true)

useEventListener(document, 'offline', () => {
	network.value = false
})
useEventListener(document, 'online', () => {
	network.value = true
})
</script>
