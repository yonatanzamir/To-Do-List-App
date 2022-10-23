const mongoose = require("mongoose")
const Schema=mongoose.Schema;

const TodoSchema=new Schema({
    TaskName:{
        type:String,
        required:true
    },
    done:{
        type: Boolean,
        default:false
    },
    timestamp:{
        type:String,
        default:Date.now()
    }
},{versionKey: false })

const Todo =mongoose.model("Todo",TodoSchema);
module.exports=Todo;