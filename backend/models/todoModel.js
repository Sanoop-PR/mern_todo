import mongoose, { model } from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title:{
            type:String,
            required:true
        },
        about:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        complete:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }

)

const Todo = mongoose.model('Todo',todoSchema)

export default Todo;