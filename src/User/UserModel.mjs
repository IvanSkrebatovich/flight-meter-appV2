// import data from '../mock/user.json' assert { type: 'json' };
import MockEngine from '../mock/MockEngine.mjs'

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

    static async getUserById(userId){
        const allUsers = await MockEngine.read();
        let user = allUsers.find((u) => u.userId === userId);
        return user;
    }


    static postUserById(user) {
        return new Promise((resolve, reject) => {
            const newUser = { ...user };
            data.push(newUser);
            UserMockEngine.write("../mock/user.json", user);
            resolve(newUser);
        });
    }

    static putUserById(userId, user) {
        return new Promise((resolve, reject) => {
            const index = data.findIndex((u) => u.userId === userId);
            data[index] = { userId, ...user };
            UserMockEngine.write("../mock/user.json", user);
            resolve(users[index]);
        });
    }

    static deleteUserById(userId) {
        return new Promise((resolve, reject) => {
            users = data.filter((u) => u.userId !== userId);
            UserMockEngine.write("../mock/user.json", user);
            resolve();
        });
    }
}

