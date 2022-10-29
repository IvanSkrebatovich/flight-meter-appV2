// import data from '../mock/user.json' assert { type: 'json' };
import MockEngine from "../mock/MockEngine.mjs";

export default class UserModel {
    static getListOfUsers() {
        return new Promise((resolve, reject) => {
            resolve(MockEngine.read());
        });
    }

    // static async getUserById(userId) {
    //     return new Promise((resolve, reject) => {
    //         const allUsers = MockEngine.read();
    //         console.log(allUsers)
    //         //let user = allUsers.find((u) => u.userId === userId);

    //         resolve(user);
    //     });
    // }

    static async getUserById(userId) {
        const allUsers = await MockEngine.read();
        let user = allUsers.find((u) => u.userId === userId);
        return user;
    }

    static async postUserById(user) {
        const newUser = { ...user };
        const data = await MockEngine.read();
        data.push(newUser);
        MockEngine.write("./mock/user.json", data);
        return newUser;
    }

    static async putUserById(userId, user) {
        const data = await MockEngine.read();
        const index = data.findIndex((u) => u.userId === userId);
        data[index] = { userId, ...user };
        MockEngine.write("./mock/user.json", data);
        return data[index];
    }

    static async deleteUserById(userId) {
        let data = await MockEngine.read();
        data = data.filter((u) => u.userId !== userId);
        MockEngine.write("./mock/user.json", data);
    }
}
