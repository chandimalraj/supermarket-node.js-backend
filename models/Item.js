const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const itemSchema = new Schema({
   item_id:{
        type:String,
        required:true
    },
    item_name:{
        type:String,
        required:true

    },
    measuring_unit:{
        type:String,
        required:true

    },
    item_size:{
        type:String,
        required:true

    },

    item_image:{
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
    sale_price:{
        type:Number,
        required:true
    },
    selling_price:{
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