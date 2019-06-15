/* 
 * @author William JACQUEMET
 */

'use strict';

const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const blockchain = require('./blockchain');
const user = require('./user');
var pug = require('pug');
var app = express();

app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.set('view engine', 'pug');
app.set('views','./views');
app.get('', function (req, res) {
res.render('page.pug');
});
var end = Date.now() + 5000  //timeout 50 ms

function block() {
			console.log(returneddata);
			const previousBlock = blockchain.getLastBlock();
			const proof = blockchain.proofOfWork(previousBlock.proof);
			const previousHash = blockchain.generateHash(previousBlock);
			const block = blockchain.createBlock({
				previousHash: previousHash,
				proof: proof,
				data : returneddata
			});
}

/*
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}// get the type of a variable and how to convert it to int
var x = Number("1000")*/
/*
			user.user2.transfer_token(-10);
			user.user1.show_token();
			*/

var returneddata = [];
var datareturned, giving, receiving, quantity, rawdata;


function getdata() {
		app.post('', function (req, res) {
			res.render('page.pug');
			
			datareturned = req.body.data;
			quantity = req.body.quantity;
			giving = req.body.giving;
			receiving = req.body.receiving;
			rawdata = "rawdata:"+datareturned +"     "+ "action:  "+giving +"     "+ "is giving to:   " + receiving +"     "+ "the amount of: "+ quantity + "  william_token";
			if (giving == 'user1'){
				user.user1.transfer_token(-quantity);
				user.user2.transfer_token(quantity);
			}
			if (giving == 'user2'){
				user.user2.transfer_token(-quantity);
				user.user1.transfer_token(quantity);
			}
			
			console.log(user.user1.show_token());
			console.log(rawdata)
		returneddata.push(rawdata);
			return returneddata;
		});
	};
getdata();

		app.get("/get_blockchain", function (request, response) {
			if(blockchain.isChainValid()) {
				response.status(200).json({
					length: blockchain.chain.length,
					blockchain: blockchain.chain,
			})
		} 
			else {
				response.status(417).json({
					message: 'Your Blockchain is invalid.',
					error: true
				})
			}
		});	
		
		app.get("**", function (req, response) {
			response.status(200).json({
				message: '404, Not Found.'
			});
		});

var cron = require('cron');
var cronJob = cron.job("*/15 * * * * *", function(){
	if(blockchain.isChainValid()) {
		console.log("good");
	}
	else { console.log("bad");}
	    block();
	   returneddata = [];
}); 
cronJob.start();
module.exports.returneddata = returneddata;


app.listen(4000);


//app.appExecute();