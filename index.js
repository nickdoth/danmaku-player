const express = require('express');
const fs = require('fs');
const browserify = require('express-browserify');

let app = express();

app.use('/files', express.static(process.cwd()));

app.get('/cli.js', browserify(`${__dirname}/client.js`));

app.use('/play', (req, res) => {

    res.send(`
        <!doctype html>
        <html>
            <head>
                <title>Player</title>
            </head>

            <body style="margin: 0px; background: black;">
                <video src="/files${req.path}"
                    autoplay controls>
                </video>
                <script src="/cli.js"></script>
            </body>
        </html>
    `);
});

app.listen(3002, '0.0.0.0');