const User = require('./userModel')

async function getUsers(req,res) {
    try {
        const users = await User.findAll()

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    } catch {
        console.log(error)
        
    }
}


async function getUser(req,res, userId) {
    try {
        const user = await User.findById(userId)

        if(!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: 'User Not Found'}));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
        }

        
    } catch {
        console.log(error)
        
    }
}
module.exports = {
    getUsers,
    getUser
}