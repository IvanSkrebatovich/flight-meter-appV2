const http = require("http");
const { createSecureServer } = require("http2");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("./userController");

const server = http.createServer((req, res) => {
    if (req.url === "/users" && req.method === "GET") {
        getUsers(req, res);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[2];
        getUser(req, res, id);
    } else if (req.url === "/users" && req.method === "POST") {
        createUser(req, res);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "PUT") {
        const userId = req.url.split("/")[2];
        updateUser(req, res, userId);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "DELETE") {
        const userId = req.url.split("/")[2];
        deleteUser(req, res, userId);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route Not Found" }));
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
