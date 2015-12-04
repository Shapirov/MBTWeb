var initAccountData = 
	{ "_id": 1, "Ballance": 0, "TotalProfit": 1, "TotalLoss": -1, "Shares": [] };

var initHistoricalsharedata =
   [{ "DateTime": 2009, "TransactionPL": 23.5, "Duration": 21.1 }, 
	{ "DateTime": 2010, "TransactionPL": 26.2, "Duration": 30.5 }, 
	{ "DateTime": 2011, "TransactionPL": 30.1, "Duration": 34.9 }, 
	{ "DateTime": 2012,	"TransactionPL": 29.5, "Duration": 31.1 }, 
	{ "DateTime": 2013, "TransactionPL": 30.6, "Duration": 28.2 }, 
	{ "DateTime": 2014, "TransactionPL": 34.1, "Duration": 32.9, "dashLengthColumn": 5, "alpha": 0.2, "additional": "(projection)" }]

				  
var initColchartdata = 
   [{ "Symbol": "EUR/JPY", "PL": 0 },
    { "Symbol": "EUR/CHF", "PL": 0 },
    { "Symbol": "EUR/AUD", "PL": 0 },
    { "Symbol": "USD/CHF", "PL": 0 },
    { "Symbol": "AUD/JPY", "PL": 0 },
    { "Symbol": "USD/JPY", "PL": 0 },
    { "Symbol": "NZD/JPY", "PL": 0 },
    { "Symbol": "AUD/USD", "PL": 0 },
    { "Symbol": "NZD/USD", "PL": 0 },
    { "Symbol": "EUR/GBP", "PL": 0 },
    { "Symbol": "GBP/USD", "PL": 0 },
    { "Symbol": "GBP/JPY", "PL": 0 },
    { "Symbol": "EUR/USD", "PL": 0 },
    { "Symbol": "GBP/CHF", "PL": 0 },
    { "Symbol": "USD/CAD", "PL": 0 }];


var initGraphchartdata = 
   [{ "date": "2015", "value": 10000 }]
   

var initCandlesticks = 
[ {
	"CandleIndex" : 0,
	"Close": "91.16",
	"Date": "2015-10-05T18:03:01.736Z",
	"High": "98.17",
	"Low": "90.09",
	"Open": "93.21"
  },{
	"CandleIndex" : 1,
	"Close": "91.12",
	"Date": "2015-10-05T18:03:02.737Z",
	"High": "98.76",
	"Low": "90.03",
	"Open": "93.11"
  },{
	"CandleIndex" : 2,
	"Close": "91.12",
	"Date": "2015-10-05T18:03:03.738Z",
	"High": "98.16",
	"Low": "90.03",
	"Open": "93.11"
  }];
var initTrendLines = 
[ {
	"initialCategory" : "0",
	"initialValue": "91.16",
	"finalCategory" : "2",
	"finalValue": "94.12"
  }];