const User = require("./userModel");

const { getPostData } = require("./userMockEngine");

// GET all users
async function getUsers(req, res) {
    try {
        const users = await User.findAll();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    } catch {
        console.log(error);
    }
}

// GET user by Id
async function getUser(req, res, userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User Not Found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
        }
    } catch {
        console.log(error);
    }
}

// POST create new user
async function createUser(req, res) {
    try {
        const body = await getPostData(req);

        const { userId, firstName, lastName, phone, email } = JSON.parse(body);

        const user = {
            userId,
            firstName,
            lastName,
            phone,
            email,
        };
        const newUser = await User.create(user);

        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
}

// PUT update user by Id
async function updateUser(req, res, userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User Not Found" }));
        } else {
            const body = await getPostData(req);

            const { userId, firstName, lastName, phone, email } = JSON.parse(body);

            const userData = {
                userId: userId || user.userId,
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
                phone: phone || user.phone,
                email: email || user.email,
            };
            const updUser = await User.update(userId, userData);

            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updUser));
        }
    } catch (error) {
        console.log(error);
    }
}

// DELETE user by Id
async function deleteUser(req, res, userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User Not Found" }));
        } else {
            await User.remove(userId);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `User ${userId} removed` }));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
