import MockEngine from '../mock/MockEngine.mjs';

export default class UserModel {

    // static readAllUsers() {
    //     return new Promise((resolve, reject) => {
    //         resolve(MockEngine.read());
    //     });
    // }

    static async readAllUsers(userId) {
        const allUsers = await MockEngine.read();
        let user = allUsers.find((u) => u.userId === userId);
        return {...user};
    }

    static async postUserById(user) {
        const newUser = { ...user };
        // validate email,
        const data = await MockEngine.read();
        MockEngine.write('./mock/user.json', [...data, newUser]);
        return newUser;
    }

    static async putUserById(userId, user) {
        const data = await MockEngine.read();
        const index = data.findIndex((u) => u.userId === userId);
        data[index] = { userId, ...user };
        MockEngine.write('./mock/user.json', data);
        return data[index];
    }

    static async deleteUserById(userId) {
        let data = await MockEngine.read();
        data = data.filter((u) => u.userId !== userId);
        MockEngine.write('./mock/user.json', data);
    }
}
