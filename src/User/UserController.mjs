import UserModel from './UserModel.mjs';
import RequestHelper from '../RequestHelper.mjs';

export default class UserController {
    // TODO:
    // getListOfUsers
    // getUserById
    // both methods have to return []

    // GET all users
    static async getUserHandler(req, res) {
        try {
            const userId = req.url.split('/')[2];
            console.log(userId);

            const data = await UserModel.readAllUsers(userId);
            // -------------------------
            // readUser(ID) -> list + 1user
            // readUser() -> list
            // [{}]
            // -------------------------
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }

    // // GET user by Id
    // static async getUserByIdHandler(req, res, userId) {
    //     try {
    //         const data = await UserModel.getUserById(userId);
    //         // [{}]
    //         // {}
    //         if (!data) {
    //             res.writeHead(404, { "Content-Type": "application/json" });
    //             const data = { message: "Not Found" };
    //             res.end(JSON.stringify(data));
    //         } else {
    //             res.writeHead(200, { "Content-Type": "application/json" });
    //             res.end(JSON.stringify(data));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // POST create new user
    static async postUserByIdHandler(req, res) {
        try {
            const body = await RequestHelper.getRequestData(req);
            // create UNIQ userId here
            // + validation
            const { userId, firstName, lastName, phone, email } = JSON.parse(body);
            const user = { userId, firstName, lastName, phone, email };
            const newUser = await UserModel.postUserById(user);
            // todo: MODEL > CRUD (naming convention)
            res.writeHead(201, { 'Content-Type': 'application/json' });
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
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User Not Found' }));
            } else {
                const body = await RequestHelper.getRequestData(req);

                const { userId, firstName, lastName, phone, email } = JSON.parse(body);

                const userData = {
                    userId: userId || user.userId,
                    firstName: firstName || user.firstName,
                    lastName: lastName || user.lastName,
                    phone: phone || user.phone,
                    email: email || user.email,
                };
                const updUser = await UserModel.putUserById(userId, userData);

                res.writeHead(200, { 'Content-Type': 'application/json' });
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
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User Not Found' }));
            } else {
                await UserModel.deleteUserById(userId);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `User ${userId} removed` }));
            }
        } catch (error) {
            console.log(error);
        }
    }
}
