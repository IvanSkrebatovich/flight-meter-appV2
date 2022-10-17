const users = require("./users");
const { writeDataToFile } = require("./userMockEngine");

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
}

function findById(userId) {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.userId === userId);
        resolve(user);
    });
}

function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = { ...user };
        users.push(newUser);
        writeDataToFile("./users.json", users);
        resolve(newUser);
    });
}

module.exports = {
    findAll,
    findById,
    create,
};
