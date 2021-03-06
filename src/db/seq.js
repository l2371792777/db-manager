/**
 * @description 链接数据库
 */
const Sequelize = require('sequelize')
const {MYSQL_CONF}=require('../conf/db')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
}

const seq = new Sequelize(database, user, password, conf)

// 测试连接
seq.authenticate().then(()=>{
    console.log('ok')
}).catch((ex)=>{
    console.error(ex)
    console.log('error')
})

//连接池
// conf.pool={
//     max:5,
//     min:0,
//     idle:10000
// }

module.exports = seq

