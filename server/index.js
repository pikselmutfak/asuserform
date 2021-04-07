const cors = require('cors')

require('./db/mongoose');

const express = require('express');
const app = express();

app.use(cors())

const routeUser = require('./routes/user');

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api',routeUser);

const publicPath = path.join(__dirname, '..', 'build')
app.use(express.static(publicPath));

app.get('*', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    res.sendFile(indexPath);
});

app.listen(8080, () => {
    console.log('started');
})