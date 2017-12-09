# Express 留言本

## 开始

```
1. 创建目录
2. 初始化 package.json
3. 初始化 git 仓库
4. npm install express
5. 创建 app.js
6. 使用 Express 写一个请求 / 响应 hello world 的服务器
7. 把 index.html、fabiao.html 拷贝到 views 目录
8. GET / index.html
9. npm i bootstrap
10. 把 node_modules 开放处理
11. GET /fabiao fabiao.html
```

## 渲染列表数据

1. 把原来的 db.json 和 comment.js 拷贝案例根目录
2. 在 app.js 中加载 comment.js 调用它的方法测试

```javascript
app.get('/', (req, res) => {
  comment.findAll((err, comments) => {
    if (err) {
      return console.log('读取数据失败')
    }
    res.render('index.html', {
      // EcmaScript 6 简写方式
      // 等价于 comments: comments
      comments
    })
  })
})
```

## 处理表单添加

1. 处理客户端表单提交地址及方法及表单字段的name
2. 在服务端配置一个处理该表单 post 提交的请求方法
3. 配置使用 `body-parser` 插件解析表单 post 请求体数据
4. 获取表单提交数据、校验、保存、发送响应重定向

```javascript
app.post('/fabiao', (req, res) => {
  // 1. 接收表单 post 提交的数据
  // 2. 验证
  // 3. 持久化存储
  // 4. 发送响应
  const body = req.body
  
  if (!body.name || !body.name.length) {
    return res.send('name invalid')
  }
  if (!body.content || !body.content.length) {
    return res.send('content invalid')
  }

  comment.save(body, err => {
    if (err) {
      return res.send('500 Server Error')
    }
    // Express 为 res 提供了一个 redirect 方法可以试想重定向
    // 重定向会自动结束响应
    res.redirect('/')
  })
})
```

## 提交到 Github 仓库

1. 在 github 创建一个远程仓库
2. git remote add origin 仓库地址
3. git push origin master

## 开发

```shell
npm install
node app.js
```
