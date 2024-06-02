<template>
	<div>
		{{ _attribute }}
		<a-upload
			v-model:file-list="fileList"
			v-bind="_attribute"
			:beforeUpload="beforeUpload"
			@change="handleChange"
			@remove="handleRemove"
		>
			<slot>
				<a-button>
					<upload-outlined></upload-outlined>
					上传附件
				</a-button>
			</slot>
		</a-upload>
	</div>
</template>

<script setup lang="ts" name="Upload">
import { MessageKey } from '@/utils/injectKey'
import { Upload } from 'ant-design-vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'

const message = inject(MessageKey)

interface PropsType {
	attribute?: any
}
const props = withDefaults(defineProps<PropsType>(), {
	attribute: () => {}
})

//上传前
const beforeUpload: UploadProps['beforeUpload'] = file => {
	const fileType: string[] = _attribute.accept.split(',')
	const suffix =
		'.' + file.type.substring(file.type.lastIndexOf('/') + 1, file.type.length)
	const isType = fileType.includes(suffix)
	if (!isType) {
		message.error(`上传格式错误,支持${_attribute.accept}文件上传`)
	}
	return isType || Upload.LIST_IGNORE
}

//上传组件的配置
const _attribute = reactive({
	name: 'file',
	accept: '.png,.jpeg,.jpg',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: { authorization: 'authorization-text' },
	listType: 'text',
	maxCount: 1,
	method: 'post',
	multiple: false,
	...props.attribute
})

const fileList = ref([])

//上传文件改变时的状态
const handleChange = (info: UploadChangeParam) => {
	if (info.file.status !== 'uploading') {
		console.log(info.file, info.fileList)
	}
	if (info.file.status === 'done') {
		message.success(`${info.file.name} 文件上传成功`)
	} else if (info.file.status === 'error') {
		message.error(`${info.file.name} 文件上传失败.`)
	}
}

//删除文件时
const handleRemove = file => {
	//上传失败的直接删除
	if (file.status) return true
	//删除上传成功的图片时删除服务器图片后再进行删除
	return false
}
</script>
