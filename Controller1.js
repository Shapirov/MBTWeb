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
	$scope.buyandsellpoints 	= initTrendLines;
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
    $scope.updateShareDashboard = function () 
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
            url: 'http://127.0.0.1:8011/getShareHistoricalCandles',
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
				$scope.buyandsellpoints = setPossisionsBuyAndSellPoints(data);
				
				if ($scope.accessor.refreshCandlesticks) 
				{ $scope.accessor.refreshCandlesticks(); }
			});
        });
    }
	
	function setPossisionsBuyAndSellPoints(data)
	{
		var buyAndSellPointsArray = [];
		var nIndex = 0;
		
		data.forEach(function (curr) 
		{
			if (curr.Candles.BuyIndicator)
			{
				var currBuyAndSell = {}
				currBuyAndSell["lineColor"]       = "#c3bcde";
				currBuyAndSell["finalIndication"] = false;
				currBuyAndSell["lineThickness"]   = 4;
				currBuyAndSell["initialValue"]    = curr.Candles.BuyPrice;
				currBuyAndSell["initialCategory"] = curr.Candles.CandleIndex.toString();
				//currBuyAndSell["initialXValue"] = curr.Candles.CandleIndex;
				//currBuyAndSell["initialDate"]   = curr.Candles.Date;
				
				buyAndSellPointsArray.push(currBuyAndSell)
				nIndex++;
			}
			
			if (curr.Candles.SellIndicator)
			{
				buyAndSellPointsArray[nIndex - 1]["finalIndication"] = true;
				buyAndSellPointsArray[nIndex - 1]["finalValue"]      = curr.Candles.SellPrice;
				buyAndSellPointsArray[nIndex - 1]["finalCategory"]   = curr.Candles.CandleIndex.toString();
				//buyAndSellPointsArray[nIndex - 1]["finalXValue"]   = curr.Candles.CandleIndex;
				//buyAndSellPointsArray[nIndex - 1]["finalDate"]     = curr.Candles.Date;
			}
		});
		
		if (!buyAndSellPointsArray[buyAndSellPointsArray.length - 1]["finalIndication"])
		{
			buyAndSellPointsArray[buyAndSellPointsArray.length - 1]["finalValue"] = $scope.buyandsellpoints[$scope.buyandsellpoints.length - 1].finalValue;
			buyAndSellPointsArray[buyAndSellPointsArray.length - 1]["finalCategory"] = $scope.candlesticksdata[$scope.candlesticksdata.length - 1].CandleIndex + 1;
		}
		
		return (buyAndSellPointsArray);
	}
	
	$scope.updatePossitionLine =  function(ballance)
	{
		if ($scope.buyandsellpoints.length > 0)
		{
			if (!$scope.buyandsellpoints[$scope.buyandsellpoints.length - 1]["finalIndication"])
			{
				var lastPrice;
				ballance.Shares.forEach(function (curr)
				{
					if (curr.Symbol == $scope.Symbol)
					{
						lastPrice = curr.LastPrice;
					}
				});
				$scope.buyandsellpoints[$scope.buyandsellpoints.length - 1]["finalValue"] = lastPrice;
				$scope.buyandsellpoints[$scope.buyandsellpoints.length - 1]["finalCategory"] = $scope.candlesticksdata[$scope.candlesticksdata.length - 1].CandleIndex + 1;
				
				if ($scope.accessor.refreshCandlesticks) 
				{ $scope.accessor.refreshCandlesticks(); }
			}
		}
	}
});