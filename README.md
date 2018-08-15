# 版权申明

	这个项目是我fork了某位大神的开源git项目,并在其基础上进行的开发
	
[原项目git地址](https://github.com/elva2596/vueBlog)


## 项目说明
> 一个前端基于Vue2.0全家桶，后端基于koa2+Mysql的前后端分离后台管理系统。作为微信小程序上大导览的后台管理系统  

### 前端工具
* Vue2.0
* Vue-Router
* Vuex
* axios
* element ui  

前端布局采用flexbox+rem布局，关于flexbox请阅读[一个完整的Flexbox指南](http://www.w3cplus.com/css3/a-guide-to-flexbox-new.html)以及这篇最新的[理解Flexbox：你需要知道的一切](http://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)

本项目还采用了手机端适配，关于移动端的学习资料请按照我下面罗列的资料按顺序仔细阅读。

1. [移动端调试](https://segmentfault.com/a/1190000002565572)
2. [介绍vieport](http://www.css88.com/archives/6410)
4. [使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)



### 后端工具
* koa2
* mysql

后端的管理界面我直接使用了[element ui](http://element.eleme.io/#/)这个基于vue的组件库，很强大.


# 目录结构

```
├─ build
│  ├─ build.js
│  ├─ check-versions.js
│  ├─ logo.png
│  ├─ utils.js
│  ├─ vue-loader.conf.js
│  ├─ webpack.base.conf.js
│  ├─ webpack.dev.conf.js
│  └─ webpack.prod.conf.js
├─ config
│  ├─ dev.env.js
│  ├─ index.js
│  └─ prod.env.js
├─ koa
│  ├─ api
│  │  └─ index.js
│  ├─ config
│  │  └─ index.js
│  ├─ db
│  │  └─ index.js
│  ├─ middleware
│  │  ├─ checkToken.js
│  │  ├─ createToken.js
│  │  └─ formatDate.js
│  ├─ routes
│  │  ├─ admin.js
│  │  ├─ classify.js
│  │  ├─ index.js
│  │  ├─ news.js
│  │  ├─ place.js
│  │  └─ wxouth.js
│  ├─ .env
│  ├─ app.js
│  └─ package.json
├─ src
│  ├─ api
│  │  └─ index.js
│  ├─ assets
│  │  ├─ css
│  │  │  ├─ commen.css
│  │  │  ├─ default.css
│  │  │  ├─ default0.css
│  │  │  └─ highlight.css
│  │  ├─ img
│  │  │  ├─ bg.jpg
│  │  │  ├─ bgm.jpg
│  │  └─ js
│  │     ├─ commen.js
│  │     ├─ highlight.pack.js
│  │     └─ hljs.js
│  ├─ components
│  │  ├─ backEnd
│  │  │  ├─ Admin.vue
│  │  │  ├─ Board.vue
│  │  │  ├─ ClassList.vue
│  │  │  ├─ Login.vue
│  │  │  ├─ NewsList.vue
│  │  │  ├─ PlaceCreate.vue
│  │  │  ├─ PlaceEdit.vue
│  │  │  ├─ PlaceList.vue
│  │  │  └─ Reg.vue
│  │  └─ NotFound.vue
│  ├─ config
│  │  └─ index.js
│  ├─ routes
│  │  ├─ index.js
│  │  └─ routes.js
│  ├─ store
│  │  ├─ actions.js
│  │  ├─ index.js
│  │  ├─ mutations.js
│  │  ├─ states.js
│  │  └─ types.js
│  ├─ App.vue
│  └─ main.js
├─ static
│  └─ .gitkeep
├─ .babelrc
├─ .editorconfig
├─ .gitignore
├─ .postcssrc.js
├─ README.md
├─ index.html
├─ package-lock.json
└─ package.json

```  

## Step
#### 环境
* Node.js >= v8
* mysql 

#### 克隆远程库
`git@github.com:ZJYCP/shuguide-admin.git`


#### 安装前端依赖
`npm install`

#### 启动mysql服务器


#### 安装后端依赖 
`进入到koa文件夹下，安装后端依赖：npm install` **安装koa2**

#### 启动后端服务器
`npm start`


#### 启动前端项目
`回到项目根目录下运行：npm run dev`



#### Notice
* 前后端启动时的路径不一样，前端在项目根目录，后端在servser根目录
* 因为是前后端分离项目，必然涉及到跨域，使用webpack的proxyTable,进入到config文件夹的index.js,将proxyTable配置成：
`proxyTable: {
        '/api':{
        target:'http://localhost:3009/api',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    },`


#### 生成发布
`npm run build`

###生产环境
* 利用ngnix端口分发部署实现代码全分离，开发全分离。
* nginx文件配置内容
````
   server {
   	listen       80;
   	server_name  localhost;

   	location /api/ {
   	    proxy_pass http://127.0.0.1:3009/api/;          #转发至api接口
   	}

   }
````
## License
MIT
