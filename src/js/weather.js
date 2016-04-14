var weather;

function getWeather(c){
	var yql = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid="+c+" and u='c'&format=json";
	$.get( yql, function( data ) {
		weather = data.query.results.channel.item;
	}, "json" );
}

function getTempCurrent() {
	var temp = weather.condition.temp;
	return temp;
}
function getDateCurrent() {
	var date = weather.condition.date;
	return date;
}
function getTextCurrent() {
	var text = weather.condition.text;
	return text;
}

