var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/postage', function(request, response) {
	handlePostage(request, response);
});

function handlePostage(request, response) {
	var requestUrl = url.parse(request.url, true);
	
	console.log("Query parameters: " + JSON.stringify(requestUrl.query));
	
	var weight = Number(requestUrl.query.weight);
	var  type = requestUrl.query.type;
	
	calculateRate(response, weight, type);
}

function calculateRate(response, weight, type) {
	var result = 0;
	
	switch(type) {
		case 'Letter(Stamped)':
			if(weight <= 1){
				result = weight * 0.49;
			}
			else if(weight <= 2){
				result = weight * 0.70;
			}
			else if(weight <= 3){
				result = weight * 0.91;
			}
			else if(weight <= 3.5){
				result = weight * 1.12;
			}
			else {
				result = "Error. Too Heavy"
			}
		break;
		case 'Letter(Metered)':
			if(weight <= 1){
				result = weight * 0.46;
			}
			else if(weight <= 2){
				result = weight * 0.67;
			}
			else if(weight <= 3){
				result = weight * 0.88;
			}
			else if(weight <= 3.5){
				result = weight * 1.09;
			}
			else {
				result = "Error. Too Heavy"
			}
		break;
		case 'Large Envelope(Flat)':
			if(weight <= 1){
				result = weight * 0.98;	
			}
			else if(weight <= 2){
				result = weight * 1.19;	
			}
			else if(weight <= 3){
				result = weight * 1.40;	
			}
			else if(weight <= 4){
				result = weight * 1.61;	
			}
			else if(weight <= 5){
				result = weight * 1.82;		
			}
			else if(weight <= 6){
				result = weight * 2.03;	
			}
			else if(weight <= 7){
				result = weight * 2.24;	
			}
			else if(weight <= 8){
				result = weight * 2.45;	
			}
			else if(weight <= 9){
				result = weight * 2.66;	
			}
			else if(weight <= 10){
				result = weight * 2.87;	
			}
			else if(weight <= 11){
				result = weight * 3.08;	
			}
			else if(weight <= 12){
				result = weight * 3.29;	
			}
			else if(weight <= 13){
				result = weight * 3.50;	
			}
			else {
				result = "Error. Too Heavy"
			}
		break;
		case 'Parcel':
			if(weight <= 4){
				result = weight * 3.00;	
			}
			else if(weight <= 5){
				result = weight * 3.16;	
			}
			else if(weight <= 6){
				result = weight * 3.32;	
			}
			else if(weight <= 7){
				result = weight * 3.48;	
			}
			else if(weight <= 8){
				result = weight * 3.64;	
			}
			else if(weight <= 9){
				result = weight * 3.80;	
			}
			else if(weight <= 10){
				result = weight * 3.96;	
			}
			else if(weight <= 11){
				result = weight * 4.19;	
			}
			else if(weight <= 12){
				result = weight * 4.36;	
			}
			else if(weight <= 13){
				result = weight * 4.53;	
			}
			else {
				result = "Error. Too Heavy"
			}
		break;
}

	weight = Math.round(weight * 100)/100;
	

var params = {weight: weight, type: type, result: result};

response.render('pages/result', params);
}
