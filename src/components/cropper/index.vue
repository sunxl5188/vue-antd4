<template>
	<modal
		v-model:open="visible"
		v-bind="modalProps"
		@confirm="handleConfirm"
		@cancel="handleCancel"
	>
		<div style="width: 700px" class="mx-auto">
			<a-row
				align="middle"
				:gutter="20"
				type="flex"
				justify="space-between"
				class="mb-4"
			>
				<a-col flex="1">
					<div style="width: 530px; height: 450px">
						<vueCropper ref="cropperRef" v-bind="option" @realTime="realTime" />
					</div>
				</a-col>
				<a-col>
					<div :style="previewStyle1">
						<div :style="previews.div">
							<img :src="previews.url" alt="" :style="previews.img" />
						</div>
					</div>

					<div :style="previewStyle2">
						<div :style="previews.div">
							<img :src="previews.url" alt="" :style="previews.img" />
						</div>
					</div>

					<div :style="previewStyle3">
						<div :style="previews.div">
							<img :src="previews.url" alt="" :style="previews.img" />
						</div>
					</div>
				</a-col>
			</a-row>
			<a-row align="middle" type="flex" justify="space-between">
				<a-col>
					<a-space>
						<a-upload v-bind="upload">
							<a-button>
								<CloudUploadOutlined />
								上传
							</a-button>
						</a-upload>
						<a-button @click="handleScale(1)">
							<PlusOutlined />
						</a-button>
						<a-button @click="handleScale(-1)">
							<MinusOutlined />
						</a-button>
						<a-button @click="handleRotate('left')">
							<ReloadOutlined />
						</a-button>
						<a-button @click="handleRotate('right')">
							<ReloadOutlined style="transform: rotateY(180deg)" />
						</a-button>
						<a-button @click="handleRefreshCrop">重置</a-button>
					</a-space>
				</a-col>
				<a-col>
					<a-button type="primary" @click="handleSubmit">保存</a-button>
				</a-col>
			</a-row>
		</div>
	</modal>
</template>

<script setup lang="ts" name="ImgCropper">
import VueCropper from 'vue-cropper/src/vue-cropper.vue'
import img from '@/assets/images/001.jpeg'
import modal from '@/components/modal/index.vue'

//https://blog.csdn.net/weixin_44258422/article/details/131528363
//https://gitee.com/yxl-qwe/vue-cropper
//https://vueuse.netlify.app/guide/config.html

interface PropsType {
	open: boolean
}
const props = withDefaults(defineProps<PropsType>(), {
	open: false
})

const emit = defineEmits(['submit'])

// 裁剪相关配置类型
interface OptionsType {
	img: string | ArrayBuffer | null //裁剪图片的地址	默认:空	url 地址, base64, blob
	outputSize: number //裁剪生成图片的质量	默认:1	0.1 ~ 1
	outputType: string //裁剪生成图片的格式	默认:jpg (jpg 需要传入jpeg)	jpeg, png, webp
	info?: boolean //裁剪框的大小信息	默认:true	true, false
	canScale?: boolean //图片是否允许滚轮缩放	默认:true	true, false
	autoCrop?: boolean //是否默认生成截图框	默认:false	true, false
	autoCropWidth?: number //默认生成截图框宽度	默认:容器的 80%	0 ~ max
	autoCropHeight?: number //默认生成截图框高度	默认:容器的 80%	0 ~ max
	fixed?: boolean //是否开启截图框宽高固定比例	默认:true	true, false
	fixedNumber?: number[] //截图框的宽高比例	默认:[1, 1]	[ 宽度 , 高度 ]
	full?: boolean //是否输出原图比例的截图	默认:false	true, false
	fixedBox?: boolean //固定截图框大小	默认:不允许改变	false
	canMove?: boolean //上传图片是否可以移动	默认:true	true, false
	canMoveBox?: boolean //截图框能否拖动	默认:true	true, false
	original?: boolean //上传图片按照原始比例渲染	默认:false	true, false
	centerBox?: boolean //截图框是否被限制在图片里面	默认:false	true, false
	high?: boolean //是否按照设备的dpr 输出等比例图片	默认:true	true, false
	infoTrue?: boolean //true 为展示真实输出图片宽高 默认:false 展示看到的截图框宽高	false	true, false
	maxImgSize?: number //限制图片最大宽度和高度	默认:2000	0 ~ max
	enlarge?: number //图片根据截图框输出比例倍数	默认:1	0 ~ max(建议不要太大不然会卡死的呢)
	mode?: string //图片默认渲染方式	默认:contain	contain , cover, 100px, 100% auto
}

const option = reactive<OptionsType>({
	img, // 需要剪裁的图片
	autoCrop: true, // 是否默认生成截图框
	autoCropWidth: 200, // 默认生成截图框的宽度
	autoCropHeight: 200, // 默认生成截图框的长度
	fixedBox: false, // 是否固定截图框的大小 不允许改变
	info: true, // 裁剪框的大小信息
	outputSize: 1, // 裁剪生成图片的质量 [1至0.1]
	outputType: 'jpeg', // 裁剪生成图片的格式
	canScale: true, // 图片是否允许滚轮缩放
	fixed: true, // 是否开启截图框宽高固定比例
	fixedNumber: [1, 1], // 截图框的宽高比例 需要配合centerBox一起使用才能生效
	full: true, // 是否输出原图比例的截图
	canMoveBox: false, // 截图框能否拖动
	original: false, // 上传图片按照原始比例渲染
	centerBox: true, // 截图框是否被限制在图片里面
	infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
})

const upload = reactive({
	accept: 'image/png,image/jpeg',
	showUploadList: false,
	maxCount: 1,
	headers: {},
	// 上传预处理
	beforeUpload: (file: any) => {
		// 判断图片类型
		let img = ['image/png', 'image/jpg', 'image/jpeg']
		if (!img.includes(file.type.toLowerCase())) {
			//message('图片格式有误，请重新上传', 'error')
			return false
		}
		// 处理预上传的图片及格式
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			option.img = reader.result
		}
		return false
	}
})

// 裁剪之后的数据
const previews: any = ref({})
const previewStyle1: any = ref({})
const previewStyle2: any = ref({})
const previewStyle3: any = ref({})
// 获取图片裁剪实例
const cropperRef: any = ref()

// 旋转图片
let handleRotate = (type: string) => {
	if (type == 'left') {
		cropperRef.value.rotateLeft()
	}
	if (type == 'right') {
		cropperRef.value.rotateRight()
	}
}
// 放大缩小图片比例
let handleScale = (num: number) => {
	const scale = num || 1
	cropperRef.value.changeScale(scale)
}
// 重置图片
let handleRefreshCrop = () => {
	cropperRef.value.refresh()
}
// 裁剪之后的数据
const realTime = (data: any) => {
	previews.value = data

	previewStyle1.value = {
		width: data.w + 'px',
		height: data.h + 'px',
		overflow: 'hidden',
		margin: '0 0 20px 0',
		zoom: 150 / data.w
	}
	previewStyle2.value = {
		width: data.w + 'px',
		height: data.h + 'px',
		overflow: 'hidden',
		margin: '0 0 20px 0',
		zoom: 100 / data.w
	}

	previewStyle3.value = {
		width: data.w + 'px',
		height: data.h + 'px',
		overflow: 'hidden',
		margin: '0',
		zoom: 50 / data.w
	}
}
// 提交
let handleSubmit = () => {
	cropperRef.value.getCropBlob((data: any) => {
		// 下面是将blob转为formData
		//let formData = new FormData()
		//formData.append('file', data)
		// 添加上传接口及相关操作
		emit('submit', data)
	})
}

const visible = ref(false)
const modalProps = reactive({
	width: '800px',
	footer: null
})

const handleConfirm = () => {}
const handleCancel = () => {}

onMounted(async () => {})

watch(
	() => props.open,
	(newValue: boolean) => {
		visible.value = newValue
	},
	{ immediate: true }
)
</script>
