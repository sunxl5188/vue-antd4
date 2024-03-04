## 自定义指定换行符的转换方案

### 通过git的全局配置

```
// 提交时 CRLF 转换为 LF ，检出时转换为 CRLF
git config --global core.autocrlf true

// 提交时 CRLF 转换为 LF ，检出时不做任何的转换
git config --global core.autocrlf input

// 提交和检出均不做任何的转换
git config --global core.autocrlf false

// 拒绝提交包含混合换行符的文件 (一般设置为true)
git config --global core.safecrlf true

// 允许提交包含混合换行符的文件
git config --global core.safecrlf false

// 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn


```
