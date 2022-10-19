let users = require("./users");
const UserMockEngine = require("./UserMockEngine");

class UserModel {
    static getListOfUsers() {
        return new Promise((resolve, reject) => {
            resolve(users);
        });
    }

    static getUserById(userId) {
        return new Promise((resolve, reject) => {
            const user = users.find((u) => u.userId === userId);
            resolve(user);
        });
    }

    static postUserById(user) {
        return new Promise((resolve, reject) => {
            const newUser = { ...user };
            users.push(newUser);
            UserMockEngine.write("./users.json", users);
            resolve(newUser);
        });
    }

    static putUserById(userId, user) {
        return new Promise((resolve, reject) => {
            const index = users.findIndex((u) => u.userId === userId);
            users[index] = { userId, ...user };
            UserMockEngine.write("./users.json", users);
            resolve(users[index]);
        });
    }

    static deleteUserById(userId) {
        return new Promise((resolve, reject) => {
            users = users.filter((u) => u.userId !== userId);
            UserMockEngine.write("./users.json", users);
            resolve();
        });
    }
}

module.exports = UserModel;
