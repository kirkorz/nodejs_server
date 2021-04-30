const { query } = require('express');
const { MongoClient, Db } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
var ObjectID = require('mongodb').ObjectID;

const Dbquery = require('../mongodbquery/publicdb');


let makePublic = async(req,res) =>{
    try{
        const result = await Dbquery.makePublic(req.body);
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}

let deleteQuestion = async(req,res) =>{
    try{
        const result = await Dbquery.deleteQuestion(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let notcheck = async(req,res) =>{
    try{
        const result = await Dbquery.notcheck(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
module.exports = {
    makePublic:makePublic,
    deleteQuestion : deleteQuestion,
    notcheck: notcheck
}