/**
 * 用户类
 */

const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const {database} = require('../config/system');
let User2 = {};

const init = (function initMethod() {
    let isInit = false; // 判断是否初始化过了
    function initTable() {
        // 创建 model
        if (!isInit) {
            User2 = sequelize.define(`${database.prefix}user`, {
                username: {
                    type: Sequelize.STRING, // 用户名
                },
                password: {
                    type: Sequelize.STRING, // 密码
                },
                gender: {
                    type: Sequelize.TINYINT, // 性别
                },
                birthday: {
                    type: Sequelize.INTEGER, // 生日
                },
                register_time: {
                    type: Sequelize.INTEGER, // 注册时间
                },
                last_login_time: {
                    type: Sequelize.INTEGER, // 最后登录时间
                },
                last_login_ip: {
                    type: Sequelize.STRING, // 最后登录ip
                },
                user_level_id: {
                    type: Sequelize.TINYINT, // 用户等级id
                },
                nickname: {
                    type: Sequelize.STRING, // 别名
                },
                mobile: {
                    type: Sequelize.STRING, // 手机
                },
                register_ip: {
                    type: Sequelize.STRING, // 注册ip
                },
                avatar: {
                    type: Sequelize.STRING, // 头像
                },
                weixin_openid: {
                    type: Sequelize.STRING, // 微信openid
                },
            }, {
                // 如果为 true 则表的名称和 model 相同，即 user
                // 为 false MySQL创建的表名称会是复数 users
                // 如果指定的表名称本就是复数形式则不变
                timestamps: false,
                freezeTableName: true
            });
            // 创建表
            // User2.sync() 会创建表并且返回一个Promise对象
            // 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
            // 默认情况下 forse = false
            const user = User2.sync({force: false});
            isInit = true;
        }
    }
    return initTable
}())

// 初始化表
init();

// 添加新用户
exports.addUser = function (userName, email) {
    // 向 user 表中插入数据
    return User2.create({
        username: userName,
        email: email,
        nickname: 'null',
        mobile: '13799999999'
    });
};

// 通过用户名查找用户
exports.findByName = function (userName) {
    return User2.findOne({where: {username: userName}});
};

