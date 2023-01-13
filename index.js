// Stock Market Portfolio App

import express from 'express';
import request from 'request';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API Key: pk_6a92003f28d849ef8c1b9a14f377a8e7
// create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker +'/quote?token=pk_6a92003f28d849ef8c1b9a14f377a8e7', {json: true}, (err, res, body) => {
        if (err) {return console.log(err);}
        if(res.statusCode === 200){
            //console.log(body);
            finishedAPI(body)
        };
    });
};

//Set Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set Handlebar Index GET Routes
app.get('/', (req, res) => {
    call_api(function(doneAPI) {
        res.render('home', {
        stock: doneAPI
        });
    }, 'fb');
});

// Set Handlebar Index POST Routes
app.post('/', (req, res) => {
    call_api(function(doneAPI) {
        //const posted_stuff = req.body.stock_ticker;
        res.render('home', {
        stock: doneAPI,
        });
    }, req.body.stock_ticker);
});


// create about page route
app.get('/about', (req, res) => {
    res.render('about');
});



app.listen(PORT, () => console.log('Server Listening on port ' + PORT))