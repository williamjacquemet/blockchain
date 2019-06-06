/* 
 * @author Shashank Tiwari
 * create basic blockchain using Nodejs
 */

'use strict';

const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
let i;
const blockchain = require('./blockchain');
var pug = require('pug');


class Server {

	constructor() {
		this.port = process.env.PORT || 4000;
		this.host = `localhost`;

		this.app = express();
		this.http = http.Server(this.app);
		var datablock = "popo";
	}

  	appConfig() {
		this.app.use(
			bodyParser.json()
		);
		this.app.use(require("express").static('client'));
 	}

	/* Including app Routes starts*/
  	includeRoutes(app) {
		

		app.use(bodyParser.json()); // to support JSON bodies
		app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
		app.set('view engine', 'pug');
		app.set('views','./views');
		app.get('', function (req, res) {
		res.render('index.pug');
		});

function block(data) {
			const previousBlock = blockchain.getLastBlock();
			const proof = blockchain.proofOfWork(previousBlock.proof);
			const previousHash = blockchain.generateHash(previousBlock);
			const block = blockchain.createBlock({
				previousHash: previousHash,
				proof: proof
			});
			const jsonResponse = {
				index: block.index,
				timestamp: block.timestamp,
				data: data,
				proof: block.proof,
				previous_hash: block.previous_hash
			}	
			
			var end = Date.now() + 50
			while (Date.now() < end) ;
			return jsonResponse;
}
		
function getdata() {
		app.post('/index', function (req, res) {
			res.render('index.pug');
			//console.log(req.body.data);
			block(req.body.data);
			return req.body.data;

		});
	};

getdata();
		app.get("/get_blockchain", function (request, response) {
			//console.log(getdata());
			if(blockchain.isChainValid()) {
				response.status(200).json({
					//message: 'Your Blockchain is valid. \r\n',
                	//error: false,
					length: blockchain.chain.length,
					blockchain: blockchain.chain,
					//data: "dezdze"
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
	}
	/* Including app Routes ends*/

	appExecute() {

		this.appConfig();
		this.includeRoutes(this.app);

		this.http.listen(this.port, this.host, () => {
			console.log(`Listening on http://${this.host}:${this.port}`);
		});
	}

}

module.exports = new Server();
const app = new Server();
app.appExecute();
