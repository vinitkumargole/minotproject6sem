const mongoose = require("mongoose");
const express = require("express");
const validator = require("validator");

const contactDetail = new mongoose.Schema({
    name :{
        type:String,
        require:true,
        minLenght:3
    },
    email:{
        type:String,
        require:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email id`)
            }
        }
    },
    message:{
        type:String,
        require:true

    }
})


const Contact= new mongoose.model("Contact", contactDetail);

module.exports = Contact