<template>
	<div>
		{{ newSourceData }}
		<a-table :columns="columns" :data-source="data">
			<template #headerCell="{ column }">
				<template v-if="column.key === 'name'">
					<span>
						<smile-outlined />
						Name
					</span>
				</template>
			</template>

			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'name'">
					<a>
						{{ record.name }}
					</a>
				</template>
				<template v-else-if="column.key === 'tags'">
					<span>
						<a-tag
							v-for="tag in record.tags"
							:key="tag"
							:color="
								tag === 'loser'
									? 'volcano'
									: tag.length > 5
										? 'geekblue'
										: 'green'
							"
						>
							{{ tag.toUpperCase() }}
						</a-tag>
					</span>
				</template>
				<template v-else-if="column.key === 'action'">
					<span>
						<a>Invite 一 {{ record.name }}</a>
						<a-divider type="vertical" />
						<a>Delete</a>
						<a-divider type="vertical" />
						<a class="ant-dropdown-link">
							More actions
							<down-outlined />
						</a>
					</span>
				</template>
			</template>
		</a-table>
	</div>
</template>

<script setup lang="ts" name="TableList">
import Sortable from 'sortablejs'

const columns = [
	{
		name: 'Name',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age'
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address'
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags'
	},
	{
		title: 'Action',
		key: 'action'
	}
]

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer']
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser']
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher']
	}
]

const newSourceData = ref([...data])

const columnDrop = () => {
	const el = document.querySelector('.ant-table-tbody') as any
	Sortable.create(el, {
		animation: 180,
		delay: 0,
		//draggable: '.item', // 允许拖拽的项目类名
		onEnd: ({ newIndex, oldIndex }) => {
			const changeData = newSourceData.value.splice(oldIndex || 0, 1)
			newSourceData.value.splice(newIndex || 0, 0, changeData[0])
			//const empty = 2
			// 跳过显示的列数量，如开头我们用了一个多选框，h和序号
			//const oldItem = this.schemas[evt.oldIndex - empty]
			//this.schemas.splice(evt.oldIndex - empty, 1)
			//this.schemas.splice(evt.newIndex - empty, 0, oldItem)
			//_this.reDrawTable()
			// 每一次拖拽后都要重绘一次
		}
	})
}
setTimeout(() => {
	columnDrop()
}, 5000)
</script>

<style scoped land="scss"></style>
