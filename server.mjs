import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = 3000;

function main() {
    let app = express();
    app.use(bodyParser.json());

    app.use('/static', express.static(path.resolve('static')));

    app.get('/', (request, response) => {
        response.sendFile(path.resolve('static', 'index.html'));
    });

    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

main();
