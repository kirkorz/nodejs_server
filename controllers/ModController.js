const Dbquery = require('../mongodbquery/publicdb');
var fs = require('fs');


let makePublic = async(req,res) =>{
    try{
        if(req.decoded['role']!='admin'){
            return res.status(500).json('e');
        }
        const result = await Dbquery.makePublic(req.body.questionsId);
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}

let deleteQuestion = async(req,res) =>{
    try{
        if(req.decoded['role']!='admin'){
            return res.status(500).json('e');
        }
        const result = await Dbquery.deleteQuestion(req.body.questionsId);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let getUnlive = async(req,res) =>{
    try{
        if(req.decoded['role']!='admin'){
            return res.status(500).json('e');
        }
        const result = await Dbquery.getUnlive(1 * req.body.skip,req.body.limit);
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}
let addCategory = async(req,res)=>{
    try{
        if(req.decoded['role']!='admin'){
            return res.status(500).json('e');
        }
        const result = await Dbquery.addCategory(req.body.questionsId,req.body.category);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
const getAuto = (req,res)=>{
    try {
        if(req.decoded['role']!='admin'){
            return res.status(500).json('e');
        }
        let auto = require('../config.json');   
        res.status(200).json(auto)    
    } catch (error) {
        return res.status(500).json(error);
    }
}
const setAuto = (req,res)=>{
    try {
        if(req.decoded['role']!='admin'){
            return res.status(500).json('e');
        }
        let auto = require('../config.json');  
        auto['status'] = !auto['status'];
        fs.writeFile('../config.json', JSON.stringify(auto), 'utf8',()=>{
            res.status(200).json(auto);
        });
        // fs.writeFileSync('../config.txt', JSON.stringify(auto)); 
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}
module.exports = {
    makePublic:makePublic,
    deleteQuestion : deleteQuestion,
    getUnlive: getUnlive,
    addCategory: addCategory,
    getAuto:getAuto,
    setAuto:setAuto
}