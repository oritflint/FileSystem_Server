
let express = require('express'),
    //mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');
  
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.use(express.json())
//app.use('/root', express.static('root'));
app.use('/api', require('./file.routes'))
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
      res.status(err.statusCode).send(err.message);
});