const fs = require("fs");

class UserMockEngine {
    static write(filename, content) {
        fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    static read(req) {
        return new Promise((resolve, reject) => {
            try {
                let body = "";

                req.on("data", (chunk) => {
                    body += chunk.toString();
                });
                req.on("end", () => {
                    resolve(body);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = UserMockEngine;
