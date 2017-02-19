angular.module("Weather",["chart.js"])
.controller('WeatherController', function($scope, $http){
  
  $http.get('weather.json').
  success(function(data, status, headers, config) {
    $scope.weatherData = data.query.results.channel;

    $scope.labels = [];
    $scope.series = ['high', 'low'];
    var high = []
    var low = []
    
    for(var i = 0; i < $scope.weatherData.item.forecast.length; i++) {
      
      high.push($scope.weatherData.item.forecast[i].high)
      low.push($scope.weatherData.item.forecast[i].low)
      $scope.labels.push($scope.weatherData.item.forecast[i].date)
    }
    $scope.data = [high,low]
    
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        ]
      },

      tooltipTemplate: function(label) {
        return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },

      // String - Template string for multiple tooltips
      multiTooltipTemplate: function(label) {
        return '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    };
  });

  $scope.visible = false;
  $scope.toggle = function () {
      $scope.visible = !$scope.visible;
  };




})