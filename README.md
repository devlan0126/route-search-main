<!--
 * @Date: 2023-11-28 16:49:12
 * @LastEditors: wangyang wyang0126@163.com
 * @LastEditTime: 2023-11-28 16:57:37
 * @FilePath: \hsa-cps-zhejiang-uid:\develop\myCode\route-search-main\README.md
 * @Description: 文档描述
-->
# route-search

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build:npm
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### npm 打包
1. 更新版本号，修改package.json文件中的version字段 
2. 编译
```javascript
npm run build:npm 
```
3. 发布到npm
```bash
npm login
npm publish
```
