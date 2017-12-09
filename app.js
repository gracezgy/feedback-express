//加载express
const express = require('express')
const comment = require('./comment')
const bodyParser = require('body-parser')
//调用express() 得到一个app
const app = express()


//配置使用art-template 模板引擎
app.engine('html', require('express-art-template'))

//配置使用body-parser 插件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//设置请求对应的处理函数
app.get('/', (req, res) => {
    comment.findAll((err, comments) => {
        if(err) {
            return console.log('读取数据库失败')
        }
        res.render('index.html',{
            comments: comments
        })
    })


})

app.get('/post', (req, res) => {
    res.render('post.html')
})
//获取并提交表单数据
app.post('/post', (req, res) => {
    //1 接收表单数据
    //2 验证
    //3持久化存储
    //4发送响应
    const body = req.body
    console.log(body)
    if(!body.name || !body.name.length) {
        return console.log('用户名不能为空')
    }
    if(!body.content || !body.content.length) {
        return console.log('密码不能为空')
    }
    comment.save(body, err => {
        if(err) {
            return console.log('表单保存失败')
        }
        // console.log('表单保存成功')
        res.redirect('/')
    })
})

//静态服务
app.use('/node_modules', express.static('node_modules'))
//监听端口号
app.listen(3000, () => console.log('app listening on port 3000!'))