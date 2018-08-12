require('dotenv').load();
require('dotenv').config();

const express = require('express');
const router = express.Router();
const api = require('../api');
var createToken = require('../middleware/createToken');
var sha1 = require('sha1'); //加密

router.post('/login', function (req, res, next) {

    let name = req.body.account;
    let password = sha1(req.body.checkPass);
    api.getUserByName(name)
        .then(data => {
            let user = data[0];
            if (user && (password == user.password)) {
                // 用户名存在通过验证
                res.json({
                    code: 200,
                    token: createToken(name)
                });
            } else {
                // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册()
                res.json({
                    code: -200,
                    message: '用户名或密码错误'
                })
            }
        })
        .catch(err => {
            // 查找数据库发生错误，或者一些
            next(err)
            return res.json({
                code: -200,
                message: err.toString()
            })
        })
});

router.post('/reg', function (req, res, next) {

    let user = {
        username: req.body.account,
        password: sha1(req.body.checkPass)  //sha1加密
    }
    api.createUser(user)
        .then(() => {
            res.send({
                // 创建用户成功
                code: 200,
                token: createToken(user.username)
            })
        })
        .catch(err => {
            // 操作数据库的时候发生错误
            if (err.message.match('E11000 duplicate key')) {
                return res.json({
                    code: -200,
                    message: '用户名重复'
                })
            }
            // 服务器发生错误（例如status:）
            return res.json({
                code: -200,
                message: err.toString()
            })
        })
});



module.exports = router
