import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = 3000;

function main() {
    let app = express();
    app.use(bodyParser.json());

    app.use('/static', express.static(path.resolve('static')));

    app.post('/api/users', (request, response) => {
        const {action, username, credHash} = request.body;

        if ([action, username, credHash].includes(undefined)) {
            response.status(400);
            response.json({status: 'failure', error: 'Missing argument actionm, username, credHash'});
        }

        if (action === 'login') {
            response.status(200);
            response.json({status: 'success'}); //TODO: ADD LOGIN
        }

        if (action === 'create') {
            response.status(200);
            response.json({status: 'success'}); //TODO: ADD LOGIN
        }
    });

    app.get('/', (request, response) => {
        response.sendFile(path.resolve('static', 'index.html'));
    });

    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

main();
