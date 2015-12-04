var weBTrading = angular.module('weBTrading.col', []);

weBTrading.directive('colchart', ['$timeout', function ($timeout) 
{
    return {
        restrict: 'E',
        template: "<div><div id='{{colId}}' class='colChart'></div></div>",
        replace: true,
        scope: 
		{
            colchartdata: "=",
            colId: "@",
            accessor: "="
        },
        link: function (scope, element, attrs) 
		{
            $timeout(function ($scope, $element, $attrs) 
			{
                var arrFieldsNames = []
                for (currField in scope.colchartdata[0]) 
				{
                    if (scope.colchartdata[0].hasOwnProperty(currField)) 
					{
                        arrFieldsNames.push(currField);
                    }
                }


                var colChart = AmCharts.makeChart(scope.colId, 
				{
                    "type": "serial",
                    "theme": "chalk",
                    "dataProvider": scope.colchartdata,
                    "valueAxes": 
					[{
                        "gridColor": "#FFFFFF",
                        "gridAlpha": 0.2,
                        "dashLength": 0
					}],
                    "gridAboveGraphs": true,
                    "startDuration": 1,
                    "graphs": 
					[{
                        "balloonText": "[[category]]: <b>[[value]]</b>",
                        "fillAlphas": 0.8,
                        "lineAlpha": 0.2,
                        "type": "column",
                        "valueField": arrFieldsNames[1]
					}],
                    "chartCursor": 
					{
                        "categoryBalloonEnabled": false,
                        "cursorAlpha": 0,
                        "zoomable": false
                    },
                    "categoryField": arrFieldsNames[0],
                    "categoryAxis": 
					{
                        "gridPosition": "start",
                        "gridAlpha": 0,
                        "tickPosition": "start",
                        fontSize: 15,
                        autoWrap: true,
                        "tickLength": 20
                    },
                    "export": 
					{
                        "enabled": true
                    }

                });


                scope.accessor.refreshCol = function () 
				{
                    colChart.dataProvider = scope.colchartdata;
                    colChart.validateData();
                };
            });
        }
    };
}]);