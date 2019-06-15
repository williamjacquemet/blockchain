'use strict';
const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');


class User {

	constructor() {
	this.token = 50;
		
	}
	
	attribute_token(value) {
		this.token= value;
	}
	show_token(){
		console.log(this.token);
	}
	checking_value(value){
		if(this.token+value <0){
		console.log("not enough william_token, cancelling...");
		return 0;
		}
		if(this.token+value >0){
		console.log("validating...");
		return 1;
		}}	
	transfer_token(value) {
	
	if(this.checking_value(value)==1){
	this.token = this.token + value;
	console.log("transfering", value);
	}
	}

}
var user1 = new User();
var user2 = new User();
exports.user1 = user1;
exports.user2 = user2;

//module.exports = new User();