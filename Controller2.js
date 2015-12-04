////////////////////////////////////////////////////////////////////////////
// Slide 2 controller
////////////////////////////////////////////////////////////////////////////
angular.module('weBTrading').controller('slide2Ctrl', function ($scope, $timeout, $http) 
{
    $scope.setDatePiker = function (e) 
	{
        $(e).datepicker();
    }
	$scope.n 				= 2015;			
    $scope.colchartdata 	= initColchartdata;
    $scope.graphchartdata 	= initGraphchartdata;
    $scope.accessor 		= {};
	
	
	////////////////////////////////////////////////////////////////////////////
	// UpdateAccountData
	////////////////////////////////////////////////////////////////////////////
    $scope.UpdateAccountData = function (data) 
	{
        $scope.AccountData = data;
        $scope.piechartdata = 
		[
			{
                "title": "Profit",
                "value": $scope.AccountData.TotalProfit
            },{
                "title": "Loss",
                "value": 0 - $scope.AccountData.TotalLoss
        }];
			
        // Colchart configuration
        //$scope.GetColchartHistoricalPositionsDataByTime(undefined, undefined);

        $scope.$apply();

        if ($scope.accessor.refreshPie) 
        { $scope.accessor.refreshPie(); }
        
        if ($scope.accessor.refreshGraph) 
		{ $scope.accessor.refreshGraph(); }
    }
	////////////////////////////////////////////////////////////////////////////
	// UpdateBallanceGraph
	////////////////////////////////////////////////////////////////////////////
	$scope.UpdateBallanceGraph = function (data) 
	{
		var arr = $scope.graphchartdata;
					
		if (arr[arr.length - 1].value != data.Ballance)
		{
			$scope.n++;
			var eGraphElement = { value: data.Ballance, date: $scope.n.toString() };
			$scope.graphchartdata.push(eGraphElement);
		}
	}
	////////////////////////////////////////////////////////////////////////////
	// GetAllBallanceData
	////////////////////////////////////////////////////////////////////////////
    $scope.GetAllBallanceData = function () 
	{
        $http({
                url: 'http://127.0.0.1:8011/getAllBallanceData',
                method: "GET",
            })
            .success(function (data, status) 
			{
                $scope.graphchartdata = [];
                data.forEach(function (currPos) 
				{
                    var currPosToAdd 		= {};
                    currPosToAdd["Symbol"] 	= currPos.Symbol;
                    currPosToAdd["PL"] 		= currPos.totalPL;
                    $scope.colchartdata.push(currPosToAdd);
                });
                if ($scope.accessor.refreshCol)
                    $scope.accessor.refreshCol();
            });
    }
	////////////////////////////////////////////////////////////////////////////
	//  UpdateHistoricalPositionsDataByTime
	////////////////////////////////////////////////////////////////////////////
    $scope.UpdateHistoricalPositionsDataByTime  = function (start, end) 
	{
        if (start == undefined) 
		{
            start = (new Date(2015, 1, 1, 1, 1, 1, 1)).getTime();
        }
        if (end == undefined) 
		{
            end = Date.now();
        }
        $http({
            url: 'http://127.0.0.1:8011/getHistoricalPositionsDataByTime',
            method: "GET",
            params: 
			{
                startDate: end - start > 0 ? start : end,
                endDate:   start - end > 0 ? start : end
            }
        })
        .success(function (data, status) 
		{
            $scope.colchartdata = [];
            data.forEach(function (currPos) 
			{
                var currPosToAdd 		= {};
                currPosToAdd["Symbol"] 	= currPos.Symbol;
                currPosToAdd["PL"] 		= currPos.totalPL;
                $scope.colchartdata.push(currPosToAdd);
            });
            if ($scope.accessor.refreshCol)
                $scope.accessor.refreshCol();
        });
    }
	
	$scope.UpdateAccountData(initAccountData);
});