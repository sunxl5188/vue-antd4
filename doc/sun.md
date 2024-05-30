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

### 副文本编辑器

```
http://tinymce.ax-z.cn/integrations/integrate-index.php
```

### postcss-pxtorem（移动端项目）

```
npm i postcss-pxtorem amfe-flexible -D

import postCssPxToRem from 'postcss-pxtorem'
export default defineConfig({
  ...
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 75, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          minPixelValue: 2 // 最小px为2，如果设置1px则不转rem
        })
      ]
    }
  }
  ...
})

在main.ts引入amfe-flexible

import 'amfe-flexible'
```

### eslint配置

```
npm i eslint -D

npx eslint --init
```

### 继续安装 vite-plugin-eslint

```
npm i -D @babel/core
npm i -D @babel/eslint-parser

```

### 配置 vite.config.js

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint' //导入包

export default defineConfig({
  plugins: [
    vue(),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ]
})
```

### 配置 .eslintrc.js

```
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-essential',
		'plugin:prettier/recommended',
		'./.eslintrc-auto-import.json'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'vue'],
	rules: {
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
				ignoredNodes: ['ConditionalExpression']
			}
		],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'vue/multi-word-component-names': [
			'error',
			{
				ignores: ['index', 'main'] //需要忽略的组件名
			}
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'error'
	}
}

// 这里时配置规则的,自己看情况配置
    "rules": {
        'semi': ['warn', 'never'],           // 禁止尾部使用分号
        'no-console': 'warn',                // 禁止出现console
        'no-debugger': 'warn',               // 禁止出现debugger
        'no-duplicate-case': 'warn',         // 禁止出现重复case
        'no-empty': 'warn',                  // 禁止出现空语句块
        'no-extra-parens': 'warn',           // 禁止不必要的括号
        'no-func-assign': 'warn',            // 禁止对Function声明重新赋值
        'no-unreachable': 'warn',            // 禁止出现[return|throw]之后的代码块
        'no-else-return': 'warn',            // 禁止if语句中return语句之后有else块
        'no-empty-function': 'warn',         // 禁止出现空的函数块
        'no-lone-blocks': 'warn',            // 禁用不必要的嵌套块
        'no-multi-spaces': 'warn',           // 禁止使用多个空格
        'no-redeclare': 'warn',              // 禁止多次声明同一变量
        'no-return-assign': 'warn',          // 禁止在return语句中使用赋值语句
        'no-return-await': 'warn',           // 禁用不必要的[return/await]
        'no-self-compare': 'warn',           // 禁止自身比较表达式
        'no-useless-catch': 'warn',          // 禁止不必要的catch子句
        'no-useless-return': 'warn',         // 禁止不必要的return语句
        'no-mixed-spaces-and-tabs': 'warn',  // 禁止空格和tab的混合缩进
        'no-multiple-empty-lines': 'warn',   // 禁止出现多行空行
        'no-trailing-spaces': 'warn',        // 禁止一行结束后面不要有空格
        'no-useless-call': 'warn',           // 禁止不必要的.call()和.apply()
        'no-var': 'warn',                    // 禁止出现var用let和const代替
        'no-delete-var': 'off',              // 允许出现delete变量的使用
        'no-shadow': 'off',                  // 允许变量声明与外层作用域的变量同名
        'dot-notation': 'warn',              // 要求尽可能地使用点号
        'default-case': 'warn',              // 要求switch语句中有default分支
        'eqeqeq': 'warn',                    // 要求使用 === 和 !==
        'curly': 'warn',                     // 要求所有控制语句使用一致的括号风格
        'space-before-blocks': 'warn',       // 要求在块之前使用一致的空格
        'space-in-parens': 'warn',           // 要求在圆括号内使用一致的空格
        'space-infix-ops': 'warn',           // 要求操作符周围有空格
        'space-unary-ops': 'warn',           // 要求在一元操作符前后使用一致的空格
        'switch-colon-spacing': 'warn',      // 要求在switch的冒号左右有空格
        'arrow-spacing': 'warn',             // 要求箭头函数的箭头前后使用一致的空格
        'array-bracket-spacing': 'warn',     // 要求数组方括号中使用一致的空格
        'brace-style': 'warn',               // 要求在代码块中使用一致的大括号风格
        'camelcase': 'warn',                 // 要求使用骆驼拼写法命名约定
        'indent': ['warn', 4],               // 要求使用JS一致缩进4个空格
        'max-depth': ['warn', 4],            // 要求可嵌套的块的最大深度4
        'max-statements': ['warn', 100],     // 要求函数块最多允许的的语句数量20
        'max-nested-callbacks': ['warn', 3], // 要求回调函数最大嵌套深度3
        'max-statements-per-line': ['warn', { max: 1 }],   // 要求每一行中所允许的最大语句数量
        "quotes": ["warn", "single", "avoid-escape"],      // 要求统一使用单引号符号
        "vue/require-default-prop": 0,                     // 关闭属性参数必须默认值
        "vue/singleline-html-element-content-newline": 0,  // 关闭单行元素必须换行符
        "vue/multiline-html-element-content-newline": 0,   // 关闭多行元素必须换行符
        // 要求每一行标签的最大属性不超五个
        'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
        // 要求html标签的缩进为需要4个空格
        "vue/html-indent": ["warn", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        // 取消关闭标签不能自闭合的限制设置
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "always",
                "normal": "never",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }]
    }

```

### 配置prettier

```
npm i -D prettier
npm i -D eslint-config-prettier // eslint兼容的插件
npm i -D eslint-plugin-prettier // eslint的prettier

```

### 配置 .prettierrc

```
module.exports = {
	// 一行最多多少个字符
	printWidth: 80,
	// 指定每个缩进级别的空格数
	tabWidth: 2,
	// 使用制表符而不是空格缩进行
	useTabs: true,
	// 在语句末尾打印分号
	semi: false,
	// 使用单引号而不是双引号
	singleQuote: true,
	// 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
	quoteProps: 'as-needed',
	// 在JSX中使用单引号而不是双引号
	jsxSingleQuote: false,
	// 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
	trailingComma: 'none',
	// 在对象文字中的括号之间打印空格
	bracketSpacing: true,
	// jsx 标签的反尖括号需要换行
	jsxBracketSameLine: false,
	// 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
	arrowParens: 'avoid',
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	rangeStart: 0,
	rangeEnd: Infinity,
	// 指定要使用的解析器，不需要写文件开头的 @prettier
	requirePragma: false,
	// 不需要自动在文件开头插入 @prettier
	insertPragma: false,
	// 使用默认的折行标准 always\never\preserve
	proseWrap: 'preserve',
	// 指定HTML文件的全局空格敏感度 css\strict\ignore
	htmlWhitespaceSensitivity: 'css',
	// Vue文件脚本和样式标签缩进
	vueIndentScriptAndStyle: false,
	// 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
	endOfLine: 'lf',
	bracketSameLine: false,
	overrides: [
		{
			files: '*.html',
			options: {
				tabWidth: 2,
				semi: false
			}
		}
	]
}

```

### tsConfig配置

```
{
  "compilerOptions": {
    "skipLibCheck": true,
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "noImplicitAny": false,
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "types": ["vite/client"],
    "isolatedModules": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": ["node_modules", "dist"]
}
​
```

### 自动导入 Vue 相关函数

```
npm i -D unplugin-auto-import

在vite.config.ts文件
import AutoImport from 'unplugin-auto-import/vite'

plugins: [
		vue(),
		AutoImport({
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue'],
			// eslint 报错解决：'ref' is not defined
			eslintrc: {
				// 默认 false, true 启用生成。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把 enable 关掉，即改成 false。
				// 否则这个文件每次会在重新加载的时候重新生成，这会导致 eslint 有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
				enabled: true
				// filepath: './.eslintrc-auto-import.json', // 默认就是 ./.eslintrc-auto-import.json
				// globalsPropValue: true, // 默认 true
			}
		})
	],
```
