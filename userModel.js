let users = require("./users");
const { write } = require("./userMockEngine");

function getListOfUsers() {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
}

function getUserById(userId) {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.userId === userId);
        resolve(user);
    });
}

function postUserById(user) {
    return new Promise((resolve, reject) => {
        const newUser = { ...user };
        users.push(newUser);
        write("./users.json", users);
        resolve(newUser);
    });
}

function putUserById(userId, user) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((u) => u.userId === userId);
        users[index] = { userId, ...user };
        write("./users.json", users);
        resolve(users[index]);
    });
}

function deleteUserById(userId) {
    return new Promise((resolve, reject) => {
        users = users.filter((u) => u.userId !== userId);
        write("./users.json", users);
        resolve();
    });
}

module.exports = {
    getListOfUsers,
    getUserById,
    postUserById,
    putUserById,
    deleteUserById,
};
