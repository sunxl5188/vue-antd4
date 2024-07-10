# Vue 3 + TypeScript + Vite

## 表格头部搜索组件

```
<xl-header-search :formData="formData" :formItem="formItem" @search="handleSearch">
   <template #xxx="{item, formData}">
      <a-form-item v-else :label="item.label" :name="item.prop">
         <a-input v-model:value="formData[item.prop]" />
      </a-form-item>
   </template>
</xl-header-search>

1. 表单参数
const formData = {
  a: undefined,
  number: [],
  checkbox: [],
  tree: [],
  cascader: [],
  range: []
}
2. 元素
const formItem = [
   {
      abel: '选择框', //label名称
      prop: 'a', //字段名称
      type: 'select', //类型默认输入框, 可选select number tree checkbox radio (date range) cascader
      slotName: '', //插槽名称 <template #xxx={item,formData}></template>
      //antd表单元素属性
      attribute: {
         mode: 'default', //multiple
         api: '字典地址',
         options: [
            {
               value: '1',
               label: 'Jack'
            }
         ]
      },
      //事件
      events: {}
      }
]
```
