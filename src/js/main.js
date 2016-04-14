$(function() {
	var city = $('#city').val();
	$('#city').on('change', function(){
		city = $(this).val();
		getWeather(city);
	});
});