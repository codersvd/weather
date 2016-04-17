;(function($, w, undefined) {

	function Weather(city, interval) {
		this.city = city;
		this.interval = interval || 5000;
	}

	Weather.prototype = {
		load: function(cb) {
			var self = this;
			var yql = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid="+this.city+" and u='c'&format=json";
			if (this.inProcess) {
				return;
			}
			this.inProcess = true;
			var req = $.get( yql, function( data) {
				self.weather = data.query.results.channel.item;
				self.inProcess = false;
				cb.call(self, data);
			}, "json" );

			req.success(function() { self.errorReq = false; })
			.error(function(e) {
				$('.error').css({display: 'table'});
			});
		},
		watch: function(cb) {
			var self = this;
			this.load(cb);
			this.timer = setInterval(function() {
				self.load(cb);
			}, this.interval);
		},
		stop: function() {
			clearInterval(this.timer);
		},

		getData: function() {
			return {
				temp: this.weather.condition.temp,
				date: this.weather.condition.date,
				text: this.weather.condition.text,
				imgCode: this.weather.condition.code
			};
		}
	};

	w.Weather = Weather;
	return Weather;

})(jQuery, window);