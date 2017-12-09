//提供对db.json 文件的操作

const fs = require('fs')
dbPath = './db.json'

//读取数据

exports.findAll = (callback) => {
    fs.readFile(dbPath, (err, data) => {
        if(err) {
            return callback(err)
        }
        const comments = JSON.parse(data).comments
        callback(null, comments)
    })
}

//保存数据
exports.save = (bodyData,callback) => {
    fs.readFile(dbPath, (err, data) => {
        if(err) {
            return callback(err)
        }
        let dbData = JSON.parse(data.toString())
        const comments = dbData.comments
        bodyData.id = comments[comments.length-1].id + 1
        comments.push(bodyData)
        dbData = JSON.stringify(dbData,null,4)
        fs.writeFile(dbPath, dbData, err => {
            if(err){
               return callback(err)
            }
            callback(null)
        })
    })
}