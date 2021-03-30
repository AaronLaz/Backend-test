// ----------- express init
const express = require('express');
const app = express();

// ----------- modules ajoutés pour le login
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

// ----------- cors : Accepter les requêtes d'un autre domaine
const cors = require('cors')

var corsOptions = { // les entrées ne viendront que de : 
    origin: "http://localhost:4200",
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

// ----------------------------------------------------

const port = 3000;
app.listen(port, () => { 
    console.log(`Serveur à l'écoute sur le port ${port} !`); 
});
 
// ----------------------------------------------------

app.use(cors(corsOptions)); //Activation du CORS avec entrées sur le corsOption
app.use(morgan('tiny')); //Activation de Morgan
app.use(express.json()); //Activation du raw (json)
app.use(express.urlencoded({ extended: true })) // Activation de x-wwww-form-urlencoded

app.get('/', function (req, res) {
    res.send('hello world');
});

// ----------------------------------------------------

require('./routes')(app);

// ----------------------------------------------------

// connection.end();