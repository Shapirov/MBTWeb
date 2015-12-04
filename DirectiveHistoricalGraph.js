var weBTrading = angular.module('weBTrading.historical', []);

weBTrading.directive('historicalchart', ['$timeout', function ($timeout) 
{
    return {
        restrict: 'E',
        template: "<div><div id='{{historyGraphId}}' class='historicalChart'></div></div>",
        replace: true,
        scope: 
		{
            accessor: "=",
            historicalsharedata: "=",
            historyGraphId: "@"
        },
        link: function (scope, element, attrs) 
		{
            var graph;
            $timeout(function ($scope, $element, $attrs) 
			{		
				graph = AmCharts.makeChart(scope.historyGraphId, 
				{
				  "type": "serial",
				  "addClassNames": true,
				  "theme": "light",
				  "autoMargins": false,
				  "marginLeft": 30,
				  "marginRight": 8,
				  "marginTop": 10,
				  "marginBottom": 26,
				  "balloon": {
					"adjustBorderColor": false,
					"horizontalPadding": 10,
					"verticalPadding": 8,
					"color": "#ffffff"
				  },

				  "dataProvider": scope.historicalsharedata,
				  "valueAxes": 
				  [{
					"axisAlpha": 0,
					"position": "left"
				  }],
				  "startDuration": 1,
				  "graphs": [{
					"alphaField": "alpha",
					"balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
					"fillAlphas": 1,
					"title": "TransactionPL",
					"type": "column",
					"valueField": "TransactionPL",
					"dashLengthField": "dashLengthColumn"
				  }, {
					"id": "graph2",
					"balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
					"bullet": "round",
					"lineThickness": 3,
					"bulletSize": 7,
					"bulletBorderAlpha": 1,
					"bulletColor": "#FFFFFF",
					"useLineColorForBulletBorder": true,
					"bulletBorderThickness": 3,
					"fillAlphas": 0,
					"lineAlpha": 1,
					"title": "Duration",
					"valueField": "Duration"
				  }],
				  "categoryField": "DateTime",
				  "categoryAxis": {
					"gridPosition": "start",
					"axisAlpha": 0,
					"tickLength": 0
				  },
				  "export": {
					"enabled": true
				  }
				});
            });


            scope.accessor.refreshHistoricalGraph = function () 
			{
                graph.dataProvider = scope.historicalsharedata;
                graph.validateData();
            };
        }
    };
}]);