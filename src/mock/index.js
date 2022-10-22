const fs = require("fs");
const { MockEngine } = require("mock");

export default class MockEngine {
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
                const data = JSON.parse(body);
                req.on("end", () => {
                    resolve(data);
                });
            } catch (error) {
                reject({
                    success: false,
                    error,
                });
            }
        });
    }
}
