import UserModel from "./UserModel.mjs";
import UserHelper from "./UserHelper.mjs";
//import UserMockEngine from "../mock/MockEngine.mjs";

export default class UserController {
    // GET all users
    static async getListOfUsersHandler(req, res) {
        try {
            const data = await UserModel.getListOfUsers();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }

    // GET user by Id
    static async getUserByIdHandler(req, res, userId) {
        try {
            const data = await UserModel.getUserById(userId);
            if (!data) {
                res.writeHead(404, { "Content-Type": "application/json" });
                const data = { message: "User Not Found" };
                res.end(JSON.stringify(data));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // POST create new user
    static async postUserByIdHandler(req, res) {
        try {
            const body = await UserHelper.getPostData(req);

            const { userId, firstName, lastName, phone, email } = JSON.parse(body);

            const user = {
                userId,
                firstName,
                lastName,
                phone,
                email,
            };

            const newUser = await UserModel.postUserById(user);

            res.writeHead(201, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(newUser));
        } catch (error) {
            console.log(error);
        }
    }

    // PUT update user by Id
    static async putUserByIdHandler(req, res, userId) {
        try {
            const user = await UserModel.getUserById(userId);

            if (!user) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "User Not Found" }));
            } else {
                const body = await UserHelper.getPostData(req);

                const { userId, firstName, lastName, phone, email } = JSON.parse(body);

                const userData = {
                    userId: userId || user.userId,
                    firstName: firstName || user.firstName,
                    lastName: lastName || user.lastName,
                    phone: phone || user.phone,
                    email: email || user.email,
                };
                const updUser = await UserModel.putUserById(userId, userData);

                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(updUser));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // DELETE user by Id
    static async deleteUserByIdHandler(req, res, userId) {
        try {
            const user = await UserModel.getUserById(userId);

            if (!user) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "User Not Found" }));
            } else {
                await UserModel.deleteUserById(userId);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: `User ${userId} removed` }));
            }
        } catch (error) {
            console.log(error);
        }
    }
}
