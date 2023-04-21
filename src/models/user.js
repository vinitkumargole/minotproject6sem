const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator");

const userDetail = new mongoose.Schema({
    name :{
        type:String,
        require:true,
        minLenght:3
    },
    email:{
        type:String,
        unique:true,
        require:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email id`)
            }
        },
       
    },
    password:{
        type:String,
        require:true,

    }
})
const User = new mongoose.model("User",userDetail);
module.exports = User