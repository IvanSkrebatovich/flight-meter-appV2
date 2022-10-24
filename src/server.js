const http = require("http");
const UserController = require("./UserController");

const server = http.createServer((req, res) => {
    if (req.url === "/users" && req.method === "GET") {
        UserController.getListOfUsersHandler(req, res);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[2];
        UserController.getUserByIdHandler(req, res, id);
    } else if (req.url === "/users" && req.method === "POST") {
        UserController.postUserByIdHandler(req, res);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "PUT") {
        const userId = req.url.split("/")[2];
        UserController.putUserByIdHandler(req, res, userId);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "DELETE") {
        const userId = req.url.split("/")[2];
        UserController.deleteUserByIdHandler(req, res, userId);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route Not Found" }));
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
