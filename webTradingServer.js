////////////////////////////////////////////////////////////////
//
// Set MBTrading TCP realtime connection listener
//
////////////////////////////////////////////////////////////////
var RealtimeMBTradingListener = function () 
{
    console.log("\n\n\n1. RealtimeMBTradingListener\n");
	
    var client = new require('net').Socket();
    client.bufferSize = 10000;
    client.connect(8080, '127.0.0.1', function () 
	{
        console.log('   RealtimeMBTradingListener - connected!\n');
    });
    client.on('data', function (data) 
	{
        sendRealtimeDataToClients(data);
    });
    client.on('error', function (error) 
	{
        console.log("   RealtimeMBTradingListener - error:  ");
        console.log(error);
    });
	
    // sendRealtimeDataToClients
    function sendRealtimeDataToClients(json) 
	{
        var parsedJSON;
		
        try 
		{
            parsedJSON = JSON.parse(json);
        } 
		catch (e) 
		{
            parsedJSON = "1";
        }
		
        io.sockets.emit('notification', parsedJSON);
    }
};


////////////////////////////////////////////////////////////////
//
// Set webTrading push realtime data service - Send to Client!
//
////////////////////////////////////////////////////////////////
var io;
var RealtimePushService = function () 
{
    console.log("2. RealtimePushService\n");
	
    io = require('socket.io').listen(8000);

    // io errors
    io.on('error', function (error) 
	{
        console.log("   RealtimePushService - ioError:  ");
        console.log(error);
    });

    // when client connect
    io.sockets.on('connection', function (socket) 
	{
        console.log('   RealtimePushService - client connected!\n');
        socket.on('disconnect', function () 
		{
            console.log('   RealtimePushService - client disconnected!\n');
        });
        socket.on('error', function (error) 
		{
            console.log("   RealtimePushService - socetError:  ");
            console.log(error);
        });
    });
};










////////////////////////////////////////////////////////////////
//
// Server Serviecs
//
////////////////////////////////////////////////////////////////
var collectionCandlesticks;
var collectionDashboard;
var ConnectToMongo = function () 
{
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/webTradingDB", function (err, db) 
	{
        if (err) 
		{
            return console.log("3. Mongo - can't connect!\n");
        }
        console.log("3. Mongo - connected!\n");
        collectionDashboard = db.collection('Dashboard');
        collectionCandlesticks = db.collection('Candlesticks');
    });
};





var ServerExpressListener = function () 
{
    var express = require('express');
    var server = express();
    server.listen(8011);
    console.log("4. ServerExpressListener\n");



    server.get('/getAllBallanceData', function (req, res) 
	{
        collectionDashboard.find().toArray(function (err, results) 
		{
            res.send(results);
        });
    });


    server.get('/getHistoricalPositionsDataByTime', function (req, res) 
	{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        collectionDashboard.aggregate(
		[
            { $match: { DateTime: { $gte: new Date(Number(req.query.startDate)), $lt: new Date(Number(req.query.endDate)) }}},
			{ $group: { _id: "$Symbol", Symbol: { $first: "$Symbol" }, totalPL: { $sum: "$TransactionPL" } } }
		], 
		function (err, results) 
		{
            res.send(results);
        });
    });
	
	server.get('/getShareHistoricalData', function (req, res) 
	{
	    res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        collectionDashboard.find({ "Symbol" : req.query.Symbol }).toArray(function (err, results) 
		{
            res.send(results);
        });
    });

	server.get('/getShareCandles', function (req, res) 
	{
	    res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        collectionCandlesticks.find({ "Symbol" : req.query.Symbol }, { "Candles" :{ $slice: -500 }, "Candles.Open" : 1, "Candles.Close" : 1,"Candles.High" : 1,"Candles.Low" : 1,"Candles.Date" : 1}).toArray(function (err, results) 
		{
            res.send(results);
        });
    });
	
	server.get('/getSharePossisionsBuyAndSellPoints', function (req, res) 
	{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        collectionCandlesticks.aggregate(
		[
			{ $project: { "Symbol" : 1, 
						  "Candles.CandleIndex" : 1, 
						  "Candles.IsPossition" : 1, 
						  "Candles.BuyIndicator" : 1, 
						  "Candles.SellIndicator" : 1, 
						  "Candles.BuyPrice" : 1, 
						  "Candles.SellPrice" : 1}},
			{ $match  : { "Symbol" : req.query.Symbol }},
			{ $unwind : "$Candles" },
			{ $match  : { $or: [{ "Candles.SellIndicator": true }, { "Candles.BuyIndicator": true }] }}
		], 
		function (err, results) 
		{
            res.send(results);
        });
    });
};



RealtimeMBTradingListener();
RealtimePushService();
ConnectToMongo();
ServerExpressListener();