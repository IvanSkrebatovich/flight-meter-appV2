const http = require("http");
const { getListOfUsersHandler, getUserByIdHandler, postUserByIdHandler, putUserByIdHandler, deleteUserByIdHandler } = require("./userController");

const server = http.createServer((req, res) => {
    if (req.url === "/users" && req.method === "GET") {
        getListOfUsersHandler(req, res);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[2];
        getUserByIdHandler(req, res, id);
    } else if (req.url === "/users" && req.method === "POST") {
        postUserByIdHandler(req, res);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "PUT") {
        const userId = req.url.split("/")[2];
        putUserByIdHandler(req, res, userId);
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "DELETE") {
        const userId = req.url.split("/")[2];
        deleteUserByIdHandler(req, res, userId);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route Not Found" }));
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
