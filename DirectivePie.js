var weBTrading = angular.module('weBTrading.pie', []);

weBTrading.directive('piechart', ['$timeout', function ($timeout) 
{
    return {
        restrict: 'E',
        template: "<div><div id='{{pieId}}' class='pieChart'></div></div>",
        replace: true,
        scope: 
		{
            accessor: "=",
            piechartdata: "=",
            pieId: "@"
        },
        link: function (scope, element, attrs) 
		{
            var pie;
            $timeout(function ($scope, $element, $attrs) 
			{
                pie = AmCharts.makeChart(scope.pieId, 
				{
                    "type": "pie",
                    "theme": "chalk",
                    "marginRight": "150",
                    "outlineColor": "rgb(66, 62, 68)",
                    "colors": ["rgb(211, 211, 211)", "rgb(150, 150, 150)"],
                    "dataProvider": scope.piechartdata,
                    "titleField": "title",
                    "valueField": "value",
                    "labelRadius": 5,
                    "radius": attrs.radius,
                    "innerRadius": attrs.innerradius,
                    "labelText": "[[title]]",
                });
            });

            scope.accessor.refreshPie = function () 
			{
                pie.dataProvider = scope.piechartdata;
                pie.validateData();
            };
        }
    };
}]);