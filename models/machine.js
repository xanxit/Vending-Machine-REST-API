const mongoose = require('mongoose')
const machineSchema= new mongoose.Schema({
    "drink":{ type: String,required: true },
    "quantity":{type :Number,required: true},
    "price":{type:Number,required: true}
    },
    {
        timestamps:true
    }
    );
    const Machine=mongoose.model('Machine',machineSchema);
module.exports= Machine;    