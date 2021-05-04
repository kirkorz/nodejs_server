const { query } = require('express');
const { MongoClient, Db } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
var ObjectID = require('mongodb').ObjectID;

const Dbquery = require('../mongodbquery/answerdb');


let getAnswers = async(req,res) =>{
    try{
        const result = await Dbquery.getAnswers(req.body);
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}

let postAnswers = async(req,res) =>{
    try{
        req.body.user_id =  req.decoded['id'];
        const result = await Dbquery.postAnswers(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}

module.exports = {
    postAnswers:postAnswers,
    getAnswers : getAnswers,
}