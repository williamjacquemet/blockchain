/* 
* @author Shashank Tiwari
* create basic blockchain using Nodejs
*/
'use strict';
const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
var pug = require('pug');
var app = express();

	/* Including app Routes starts*/
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.set('view engine', 'pug');
app.set('views','./views');
app.get('', function (req, res) {
res.render('index.pug');
});
const SHA256 = require("crypto-js/sha256");
var server = require('./server');


	/*var end = Date.now() + 5000  //timeout 50 ms
	while (Date.now() < end) {
		console.log(bla);
		};*/
	/* Including app Routes starts*/

class Blockchain {

	constructor() {
				
		this.chain = [];
		this.createBlock({previousHash: 0, proof: 1});
	}

	createBlock({ previousHash, proof, data}) {

		const block = {
			index: this.chain.length + 1,
			timestamp: (+new Date()).toString(),
			data: data,
			proof: proof,
			previous_hash: previousHash
		}
		this.chain.push(block);
		return block;
	}

	getLastBlock() {
		return this.chain[this.chain.length - 1] !== undefined ? this.chain[this.chain.length - 1] :  null;
	}

	proofOfWork(previousProof) {
		let newProof = 1;
		let checkProof = false;
		while (!checkProof) {
			const blockHash = SHA256((Math.pow(newProof, 5) - Math.pow(previousProof, 5)).toString()).toString();
			if (blockHash.substring(0, 5) === '00000') {
				checkProof = true;
			} else {
				newProof++;
			}
		}
		return newProof;
	}

	generateHash(block) {
		return SHA256(JSON.stringify(block)).toString();
	}

	isChainValid() {
		const chain = this.chain;
		let previousBlock = chain[0];
		let blockIndex = 1;
		while (blockIndex < chain.length) {
			const currentBlock = chain[blockIndex];
			if (currentBlock.previous_hash !== this.generateHash(previousBlock)) {
				return false;
			}
			const previousProof = previousBlock.proof;
			const currentProof = currentBlock.proof;
			const blockHash = SHA256((Math.pow(currentProof, 5) - Math.pow(previousProof, 5)).toString()).toString();
			if (blockHash.substring(0, 5) !== '00000') {
				return false;
			}
			previousBlock = currentBlock;
			blockIndex += 1;
		}
		return true;
	}
}

module.exports = new Blockchain();
