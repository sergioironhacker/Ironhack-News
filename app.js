require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const logger = require('morgan');
const passport = require("passport");



require('./config/db.config');
require("./config/passport.config");
require('./helpers/helpers-hbs')

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

const sessionConfig = require('./config/session.config');
app.use(sessionConfig);

app.use(passport.initialize());

app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser
    next();
});

const router = require('./router/router');
app.use('/', router);

app.use((err, req, res, next) => {
    console.error(err);

    if (err.status === 404) {
        res.render('error', { title: err.message });
    } else {
        res.render('error')
    }
});



hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});



hbs.registerHelper('formatPercentage', function(percentage) {
    
    const numericPercentage = parseFloat(percentage);

    
    if (!isNaN(numericPercentage) && isFinite(numericPercentage)) {
      
        const formattedPercentage = numericPercentage.toFixed(1);

        
        return formattedPercentage >= 1 ? formattedPercentage.substring(1) : formattedPercentage;
    } else {

        return 'Error';
    }
});


///// helpers necesarios para api del tiempo 


hbs.registerHelper('isTemperatureAbove', function (temperature, threshold, options) {
    return temperature > threshold ? options.fn(this) : options.inverse(this);
  });

hbs.registerHelper('isTemperatureBelow', function (temperature, threshold, options) {
    return temperature < threshold ? options.fn(this) : options.inverse(this);
});



const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App running on port ${port}🏃‍♀️`))
