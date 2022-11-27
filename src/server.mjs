import http from 'http';
import UserController from './User/UserController.mjs';

const server = http.createServer((req, res) => {
    // TODO: switch / case / default / break
    switch (true) {
        case parseHelper(req, '/user/list', 'GET'):
            console.log('get user');
            UserController.getUserHandler(req, res);
            break;

        case parseHelper(req, '/user/([0-9]+)', 'GET'):
            UserController.getUserHandler(req, res);
            break;

        case parseHelper(req, '/users', 'POST'):
            UserController.postUserByIdHandler(req, res);
            break;

        case parseHelper(req, '/users', 'PUT'):
            const userId = req.url.split('/')[2];
            UserController.putUserByIdHandler(req, res);
            break;

        case parseHelper(req, '/users', 'DELETE'):
            const id = req.url.split('/')[2];
            UserController.deleteUserByIdHandler(req, res, id);
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route Not Found' }));
    };
    
    // if (parseHelper(req, '/user/list', 'GET')) {
    //     // /user/list
    //     UserController.getUserHandler(req, res);
    // } else if (parseHelper(req, '/user/([0-9]+)', 'GET')) {
    //     // /user/[ID]
    //     // id: 1231FFFDDEE232
    //     // const id = req.url.split('/')[2];
    //     UserController.getUserHandler(req, res);
    // } else if (parseHelper(req, '/users', 'GET')) {
    //     // /user/create
    //     UserController.postUserByIdHandler(req, res);
    // } else if (parseHelper(req, '/users', 'GET')) {
    //     // /user/[ID]
    //     const userId = req.url.split('/')[2];
    //     UserController.putUserByIdHandler(req, res);
    // } else if (parseHelper(req, '/users', 'GET')) {
    //     // /user/[ID]
    //     const userId = req.url.split('/')[2];
    //     UserController.deleteUserByIdHandler(req, res, userId);
    // } else {
    //     // default
    //     res.writeHead(404, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify({ message: 'Route Not Found' }));
    // }
});

function parseHelper(req, url, method) {
    return req.url.match(url) && req.method === method;
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
