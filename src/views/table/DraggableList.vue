<template>
	<div>
		<a-list item-layout="horizontal">
			<XlDraggable v-model="dataSource" :config="{ handle: '.ant-avatar' }">
				<template #default="{ item }">
					<a-list-item class="mover">
						<a-list-item-meta :description="item.desc">
							<template #title>
								{{ item.title }}
							</template>
							<template #avatar>
								<a-avatar :src="item.avatar" />
							</template>
						</a-list-item-meta>
					</a-list-item>
				</template>
			</XlDraggable>
		</a-list>
	</div>
</template>

<script setup lang="ts" name="DraggableList">
import XlDraggable from '@/components/XlDraggable.vue'
import avatar from '@/assets/images/002.jpeg'

const dataSource = ref<any[]>([
	{
		id: 1,
		avatar,
		title: 'Ant Design Title 1',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	},
	{
		id: 2,
		avatar,
		title: 'Ant Design Title 2',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	},
	{
		id: 3,
		avatar,
		title: 'Ant Design Title 3',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	},
	{
		id: 4,
		avatar,
		title: 'Ant Design Title 4',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	},
	{
		id: 5,
		avatar,
		title: 'Ant Design Title 5',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	},
	{
		id: 6,
		avatar,
		title: 'Ant Design Title 6',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	},
	{
		id: 7,
		avatar,
		title: 'Ant Design Title 7',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	},
	{
		id: 8,
		avatar,
		title: 'Ant Design Title 8',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	},
	{
		id: 9,
		avatar,
		title: 'Ant Design Title 9',
		desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
	}
])
</script>

<style scoped lang="less">
::v-deep(.ant-list) {
	.ant-avatar {
		cursor: move;
	}
}
</style>
