var express = required('express');
var app = express();
var request = required('request');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//for POSTs
var bodyParser = require('body-parser');
app.use(bodyParser.json());


singleSeriesID = CEU0800000003;    

app.get('/getPage', function(req, res, next)){
	var context = {};
	request('http://api.bls.gov/publicAPI/v2/timeseries/data/' + singleSeriesID, function(err, response, body){
		if(!err && response.statusCode < 400){
			context.results = body;
			res.render('YourPage', context);
			console.log(context.result);
		}	
		else{
			if(response){
				console.log(response.statusCode);
			}
			next(err);
		}
	});
});


app.post('/postPage', function(req, res, next)){
	var context = {};
	var seriesid = ["CEU0800000003", "LAUCN040010000000006"];
	request('http://api.bls.gov/publicAPI/v2/timeseries/data/' + seriesid, function(err, response, body){
		if(!err && response.statusCode < 400){
			context.results = body;
			res.render('YourPage', context);
			console.log(context.result);
		}	
		else{
			if(response){
				console.log(response.statusCode);
			}
			next(err);
		}
	});
});



app.use(function(req, res){
	res.status(404);
	res.render('404');
});


app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


app.listen(app.get('port'), function(){
	console.log('Express Started');
});
	