/* 
 * @author Shashank Tiwari
 * create basic blockchain using Nodejs
 */

'use strict';

const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const blockchain = require('./blockchain');
var pug = require('pug');
var app = express();

	/* Including app Routes starts*/
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
var returneddata = [];
var returned;
returneddata.push("data");
function getdata() {
		app.post('', function (req, res) {
			res.render('page.pug');
			returned = req.body.data;
			
			//block();
			returneddata.push(returned);
			console.log(returneddata);
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