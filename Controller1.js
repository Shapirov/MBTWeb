////////////////////////////////////////////////////////////////////////////
// Slide 1 controller
////////////////////////////////////////////////////////////////////////////
angular.module('weBTrading').controller('slide1Ctrl', function ($scope, $timeout, $http) 
{
    $scope.setDatePiker = function (e) 
	{
        $(e).datepicker();
    }
	$scope.Symbol = $('#oSymbol').val();
    $scope.historicalsharedata 	= initHistoricalsharedata;
	$scope.candlesticksdata 	= initCandlesticks;
	$scope.accessor 			= {};
	$scope.piechartdata = 
		[
			{
                "title": "Profit",
                "value": 3
            },{
                "title": "Loss",
                "value": 1
        }];
	
	////////////////////////////////////////////////////////////////////////////
	// UpdateAccountData
	////////////////////////////////////////////////////////////////////////////
    $scope.UpdateShareDashboard = function () 
	{
        $http({
            url: 'http://127.0.0.1:8011/getShareHistoricalData',
            method: "GET",
            params: 
			{
                Symbol : $scope.Symbol
            }
        })
        .success(function (data, status) 
		{
            $scope.historicalsharedata = data;
			var TotalProfit = 0;
			var TotalLoss = 0;
			data.forEach(function (currPos) 
			{
				if (currPos.TransactionPL > 0)
					TotalProfit += currPos.TransactionPL;
				else
					TotalLoss += currPos.TransactionPL;
			});
			
			$scope.piechartdata = 
			   [{ "title": "Profit", "value": TotalProfit },
				{ "title": "Loss", "value": 0 - TotalLoss}];

			if ($scope.accessor.refreshPie) 
			{ $scope.accessor.refreshPie(); }
			if ($scope.accessor.refreshHistoricalGraph) 
			{ $scope.accessor.refreshHistoricalGraph(); }
        });
	
	
	    $http({
            url: 'http://127.0.0.1:8011/getShareCandles',
            method: "GET",
            params: 
			{
                Symbol : $scope.Symbol
            }
        })
        .success(function (data, status) 
		{
            $scope.candlesticksdata = data[0].Candles;
			
			$http({
				url: 'http://127.0.0.1:8011/getSharePossisionsBuyAndSellPoints',
				method: "GET",
				params: 
				{
					Symbol : $scope.Symbol
				}
			})
			.success(function (data, status) 
			{
				$scope.candlesticksdata = data[0].Candles;
				
				if ($scope.accessor.refreshCandlesticks) 
				{ $scope.accessor.refreshCandlesticks(); }
			});
        });
    }
});