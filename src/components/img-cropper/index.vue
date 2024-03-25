<template>
	<div>
		<vueCropper
			ref="cropper"
			:img="option.img"
			:outputSize="option.outputSize"
			:outputType="option.outputType"
		></vueCropper>
	</div>
</template>

<script setup lang="ts" name="ImgCropper">
import VueCropper from 'vue-cropper/src/vue-cropper.vue'
import 'vue-cropper/dist/index.css'
//https://blog.csdn.net/weixin_44258422/article/details/131528363
//https://gitee.com/yxl-qwe/vue-cropper
//https://vueuse.netlify.app/guide/config.html

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
	img: '', // 需要剪裁的图片
	autoCrop: true, // 是否默认生成截图框
	autoCropWidth: 150, // 默认生成截图框的宽度
	autoCropHeight: 150, // 默认生成截图框的长度
	fixedBox: false, // 是否固定截图框的大小 不允许改变
	info: true, // 裁剪框的大小信息
	outputSize: 0.5, // 裁剪生成图片的质量 [1至0.1]
	outputType: 'jpeg', // 裁剪生成图片的格式
	canScale: false, // 图片是否允许滚轮缩放
	fixed: false, // 是否开启截图框宽高固定比例
	fixedNumber: [1, 1], // 截图框的宽高比例 需要配合centerBox一起使用才能生效
	full: true, // 是否输出原图比例的截图
	canMoveBox: false, // 截图框能否拖动
	original: false, // 上传图片按照原始比例渲染
	centerBox: true, // 截图框是否被限制在图片里面
	infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
})

// 裁剪之后的数据
const previews: any = ref({})
// 获取图片裁剪实例
const cropperRef: any = ref({})
// 弹窗状态
const dialogVisible = ref(false)
// 旋转图片
let rotateClick = (type: string) => {
	if (type == 'left') {
		cropperRef.value.rotateLeft()
	}
	if (type == 'right') {
		cropperRef.value.rotateRight()
	}
}
// 放大缩小图片比例
let changeScale = (num: number) => {
	const scale = num || 1
	cropperRef.value.changeScale(scale)
}
// 重置图片
let refreshCrop = () => {
	cropperRef.value.refresh()
}
// 裁剪之后的数据
const realTime = (data: any) => {
	previews.value = data
}
// 覆盖默认上传行为
let requestUpload = () => {}
// 上传预处理
let beforeUpload = (file: any) => {
	// 判断图片类型
	let img = [
		'image/png',
		'image/jpg',
		'image/jpeg',
		'image/PNG',
		'image/JPG',
		'image/JPEG'
	]
	if (!img.includes(file.type)) {
		utils._message('图片格式有误，请重新上传', 'error')
		return false
	}
	// 处理预上传的图片及格式
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => {
		options.img = reader.result
	}
}
// 编辑头像
function editCropper() {
	dialogVisible.value = true
}
// 提交
let uploadImg = () => {
	cropperRef.value.getCropBlob((data: any) => {
		// 下面是将blob转为formData
		let formData = new FormData()
		formData.append('file', data)
		// 添加上传接口及相关操作
		console.log(formData)
		dialogVisible.value = false
	})
}
onMounted(() => {
	setTimeout(() => {
		options.img = avatar.value
	}, 100)
})
</script>
