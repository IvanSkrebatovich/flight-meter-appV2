let users = require("./users");
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

function update(userId, user) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((u) => u.userId === userId);
        users[index] = { userId, ...user };
        writeDataToFile("./users.json", users);
        resolve(users[index]);
    });
}

function remove(userId) {
    return new Promise((resolve, reject) => {
        users = users.filter((u) => u.userId !== userId);
        writeDataToFile("./users.json", users);
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
