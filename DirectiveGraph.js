var weBTrading = angular.module('weBTrading.graph', []);

weBTrading.directive('graphchart', ['$timeout', function ($timeout) 
{
    return {
        restrict: 'E',
        template: "<div><div id='{{graphId}}' class='graphChart'></div></div>",
        replace: true,
        scope: 
		{
            accessor: "=",
            graphchartdata: "=",
            graphId: "@"
        },
        link: function (scope, element, attrs) 
		{
            var graph;
            $timeout(function ($scope, $element, $attrs) 
			{
                var arrFieldsNames = []
                for (currField in scope.graphchartdata[0]) 
				{
                    if (scope.graphchartdata[0].hasOwnProperty(currField)) 
					{
                        arrFieldsNames.push(currField);
                    }
                }


                graph = AmCharts.makeChart(scope.graphId, 
				{
                    "type": "serial",
                    "theme": "chalk",
                    "marginTop": 0,
                    "marginRight": 80,
                    "path": "http://www.amcharts.com/lib/3/",
                    "dataProvider": scope.graphchartdata,
                    "valueAxes": 
					[{
                        "axisAlpha": 0,
                        "position": "left"
					}],
                    "graphs": 
					[{
                        "id": "g1",
                        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                        "bullet": "round",
                        "bulletSize": 8,
                        "lineColor": "#637bb6",
                        "lineThickness": 2,
                        "negativeLineColor": "#d1655d",
                        "type": "smoothedLine",
                        "valueField": arrFieldsNames[1]
					}],
                    "chartScrollbar": 
					{
                        "graph": "g1",
                        "gridAlpha": 0,
                        "color": "#888888",
                        "scrollbarHeight": 55,
                        "backgroundAlpha": 0,
                        "selectedBackgroundAlpha": 0.1,
                        "selectedBackgroundColor": "#888888",
                        "graphFillAlpha": 0,
                        "autoGridCount": true,
                        "selectedGraphFillAlpha": 0,
                        "graphLineAlpha": 0.2,
                        "graphLineColor": "#c2c2c2",
                        "selectedGraphLineColor": "#888888",
                        "selectedGraphLineAlpha": 1
                    },
                    "chartCursor": 
					{
                        "categoryBalloonDateFormat": "YYYY",
                        "cursorAlpha": 0,
                        "valueLineEnabled": true,
                        "valueLineBalloonEnabled": true,
                        "valueLineAlpha": 0.5,
                        "fullWidth": true
                    },
                    "dataDateFormat": "YYYY",
                    "categoryField": arrFieldsNames[0],
                    "categoryAxis": 
					{
                        "minPeriod": "YYYY",
                        "parseDates": true,
                        "minorGridAlpha": 0.1,
                        "minorGridEnabled": true
                    },
                    "export": 
					{
                        "enabled": true
                    }
                });

                graph.addListener("rendered", zoomChart);
                if (graph.zoomChart) 
				{
                    graph.zoomChart();
                }

                function zoomChart() 
				{
                    graph.zoomToIndexes(Math.round(graph.dataProvider.length * 0.4), Math.round(graph.dataProvider.length * 0.55));
                }
            });


            scope.accessor.refreshGraph = function () 
			{
                graph.dataProvider = scope.graphchartdata;
                graph.validateData();
            };
        }
    };
}]);