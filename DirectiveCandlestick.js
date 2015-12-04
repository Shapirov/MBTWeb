var weBTrading = angular.module('weBTrading.candlestick', []);

weBTrading.directive('candlestickchart', ['$timeout', function ($timeout) 
{
    return {
        restrict: 'E',
        template: "<div><div id='{{candlestickId}}' class='candlestickChart'></div></div>",
        replace: true,
        scope: 
		{
            accessor: "=",
            candlesticksdata: "=",
            candlestickId: "@"
        },
        link: function (scope, element, attrs) 
		{
            var graph;
            $timeout(function ($scope, $element, $attrs) 
			{		 
				graph = AmCharts.makeChart(scope.candlestickId, 
				{
				  "type": "serial",
				  "theme": "dark",
				  "dataDateFormat":"YYYY-MM-DDTHH:mm:ss.fffZ",
				  "valueAxes": [ 
				  {
					"position": "left"
				  } ],
				  "graphs": [ {
					"id": "g1",
					"proCandlesticks": true,
					"balloonText": "Open:<b>[[Open]]</b><br>Low:<b>[[Low]]</b><br>High:<b>[[High]]</b><br>Close:<b>[[Close]]</b><br>",
					"closeField": "Close",
					"fillColors": "#7f8da9",
					"highField": "High",
					"lineColor": "#7f8da9",
					"lineAlpha": 1,
					"lowField": "Low",
					"fillAlphas": 0.9,
					"negativeFillColors": "#db4c3c",
					"negativeLineColor": "#db4c3c",
					"openField": "Open",
					"title": "Price:",
					"type": "candlestick",
					"valueField": "Close"
				  } ],
				  "chartScrollbar": {
					"graph": "g1",
					"backgroundAlpha" : 0.1,
					"graphFillAlpha" : 0.5,
					"graphType": "candlestick",
					"scrollbarHeight": 5
				  },
				  "chartCursor": {
					"valueLineEnabled": true,
					"valueLineBalloonEnabled": true
				  },
				  "categoryField": "Date",
				  "categoryAxis": {
					"parseDates": false,
					"autoGridCount" : false,
					"minPeriod" : "fff"
				  },
				  "dataProvider": scope.candlesticksdata,
				  "export": {
					"enabled": true,
					"position": "bottom-right"
				  }
				});
	

				graph.addListener("rendered", zoomChart);
				{
					zoomChart();
				}

				// this method is called when graph is first inited as we listen for "dataUpdated" event
				function zoomChart() 
				{
				  // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
				  graph.zoomToIndexes( graph.dataProvider.length - 50, graph.dataProvider.length - 1 );
				}
			});



            scope.accessor.refreshCandlesticks = function () 
			{
                graph.dataProvider = scope.candlesticksdata;
                graph.validateData();
            };
        }
    };
}]);