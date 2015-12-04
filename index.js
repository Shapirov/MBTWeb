        ////////////////////////////////////////////////////////////////////////////
        // Initialize SuperSlide
        ////////////////////////////////////////////////////////////////////////////
		$(function () 
		{
            $('#fullpageslider').superslides(
			{
                hashchange: false
            });
        });
        ////////////////////////////////////////////////////////////////////////////
        // connect to webTrading push notification service
        ////////////////////////////////////////////////////////////////////////////
        var socket = io.connect('http://localhost:8000', 
		{
            'sync disconnect on unload': true
        });
        window.onbeforeunload = function () 
		{
            socket.disconnect();
        };
        ////////////////////////////////////////////////////////////////////////////
        // Angular module
        ////////////////////////////////////////////////////////////////////////////
        var app = angular.module('weBTrading', ['weBTrading.graph',
                                                'weBTrading.pie',
                                                'weBTrading.col',
												'weBTrading.historical',
												'weBTrading.candlestick']);
		////////////////////////////////////////////////////////////////////////
        // Get Acocount realtime data from push service
        ////////////////////////////////////////////////////////////////////////
        app.run(function () 
		{
            socket.on('notification', function (data) 
			{
				var slide2Scope = angular.element($('#slide2')).scope();
				var slide1Scope = angular.element($('#slide1')).scope();
				
				
				// Every X second
                if (data.Ballance) 
				{
                    slide2Scope.updateAccountData(data);
					slide2Scope.updateBallanceGraph(data);
					slide1Scope.updatePossitionLine(data);
                } 
				// Every sell order
				else 
				{
					slide1Scope.updateShareDashboard();
                    slide2Scope.updateHistoricalPositionsDataByTime(undefined, undefined);
                }
            });
        });