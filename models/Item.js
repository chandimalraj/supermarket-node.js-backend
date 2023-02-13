const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const itemSchema = new Schema({
   itemid:{
        type:String,
        required:true
    },
    itemname:{
        type:String,
        required:true

    },
    itemimage:{
        type:String,
        required:false
    },
    catogery:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    saleprice:{
        type:Number,
        required:true
    },
    sellingprice:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        required:false,
        default:false
    }
})

const Item = mongoose.model("Item",itemSchema);

module.exports = Item;