const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.get('/api',(req,res)=>{
	res.json({
		message:'welcome to the API'
	});
});
app.post('/api/post',verifyToken,(req,res)=>{
	 jwt.verify(req.token,'secretKey',(err,authData)=>{
	 	if(err){
	 	res.sendStatus(403);
	 	}else{
	      res.json({
		message:'Post created',
		authData
	}); 		
	 	}
	 });
	
});
app.post('/api/login',(req,res)=>{
	//fake user
	const user={
		id:1,
		username:'kimatia',
		email:'kimatiadaniel@gmail.com'

	}
	jwt.sign({user},'secretKey',{expiresIn:'30s'},(err,token)=>{
		res.json({
			token
		});
	});
});
function verifyToken(req,res,next){
	//get aouth header value
	const bearerHeader=req.headers['authorization'];
	//check if bearer is undefined
	if(typeof bearerHeader !== 'undefined'){
     //split at the space
     const bearer= bearerHeader.split(' ');
     //get token from array
     const bearerToken=bearer[1];
     req.token=bearerToken;
     //next middleware
     next();
	}else{
		//forbiden
		res.sendStatus(403);
	}
}
app.listen(5000,()=>console.log('server started at port 5000'));