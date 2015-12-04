1. NodeJS + python2.7
   download and install node.js + python2.7
   download all nodejs requiries
   a. open cmd on administration mode
   b. cd [project directory]
   c. npm install socket.io
   d. npm install mongodb
   e. npm install express
   f. npm install body-parser
   g. npm install multer

2. IIS
   Go to: Control Panel > Programs > turn windows features on or off > 
   a. v - internet information services hostable web core
   b. v - internet information services - web menagement tools
   c. v - internet information services - web wide web services

3. ChromeExtention 
   install this chrome extention (Allow-Control-Allow-Origin: *): 
   https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
	
4. MongoDB
   a. download roboMongo
   c. download Win7 Hotfix: http://hotfixv4.microsoft.com/Windows%207/Windows%20Server2008%20R2%20SP1/sp2/Fix405791/7600/free/451413_intl_x64_zip.exe
   b. download mongoDB: https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/
   c. configure mongoDB in CMD (Administrator):
      - cd "C:\Program Files\MongoDB\Server\3.0\bin"
	  - mkdir data
	  - cd data
	  - mkdir db
	  - cd ..
	  - mkdir log
	  - cd "C:\Program Files\MongoDB\Server\3.0\bin"
	  - mongod.exe --dbpath "C:\Program Files\MongoDB\Server\3.0\bin\data\db"
   e. open folder "C:\Program Files\MongoDB\Server\3.0\bin\" and create "mongod.cfg" file with the content:
   
		systemLog:
			destination: file
			path: C:\Program Files\MongoDB\Server\3.0\bin\data\log\mongod.log
		storage:
			dbPath: C:\Program Files\MongoDB\Server\3.0\bin\data\db
	
   f. run CMD (Administrator):  
      - "C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\3.0\bin\mongod.cfg" --install
      - net start MongoDB
   g. Done! - now you have MongoDB "windowsService" running in your windows  
	
	  