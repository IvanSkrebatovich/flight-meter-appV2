const users = require("./users");

function findAll(){
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function findById(userId){
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.userId === userId)
        resolve(user)
    })
}



module.exports = {
    findAll,
    findById
}