$(function() {
  var currentWeather;
  var time = 2000;
  var isDisplay = false;
  var icon_url = "http://l.yimg.com/a/i/us/we/52/";

  var city = $('#city').val();
  var display = $('.weather-display');
  var displayItems = {
    temp: $('.weather-temp'),
    date: $('.weather-date'),
    text: $('.weather-text'),
    imgCode: $('.weather-img')
  };
  var currentData = {};

  var dateFormat = function(date) {
    var datePart = date.split(/\s\d{2}\:\d{2}/);
    var dateObject = new Date(datePart[0]);
    var day = dateObject.getDate();
    var month = dateObject.getMonth();
    var year = dateObject.getFullYear();
    day = day < 10 ? '0'+day : day;
    month = month < 10 ? '0'+month : month;
    return day+'.'+month+'.'+year;
  };

  var iconUrl = function (code) {
      return icon_url + code + '.gif';
  };

  var handleResults = function() {
    var data = this.getData();

    if (!isDisplay){
      display.show();
      isDisplay = true;
    }
    for(var key in data) {
      if(key == 'date') data[key] = dateFormat(data[key]);
      if(key == 'imgCode') data[key] = iconUrl(data[key]);

      if (currentData[key] !== data[key]) {
               if(key == 'imgCode') {
                  displayItems[key].attr('src' , data[key]);
               }
               else {
                displayItems[key].text(data[key]);
              }
               currentData[key] = data[key];
      }
    }
  };

  currentWeather = new Weather(city, time);
  currentWeather.watch(handleResults);

	$('#city').on('change', function(){
		city = $(this).val();
		currentWeather.stop();
              currentWeather = new Weather(city, time);
              currentWeather.watch(handleResults);
	});

});