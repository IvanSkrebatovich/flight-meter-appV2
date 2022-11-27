import fs from 'fs';

export default class MockEngine {
    static write(filename, content) {
        fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    static read() {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile('./mock/user.json', 'utf8', (err, data) => {
                    //console.log(typeof(JSON.parse(data)));
                    resolve(JSON.parse(data));
                });
            } catch (error) {
                console.log(error);
            }
        });
    }
}
