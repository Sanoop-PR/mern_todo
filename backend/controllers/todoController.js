import Todo from "../models/todoModel.js";
import { errorHandler } from '../utils/error.js';


export const addTodo = async (req, res, next) => {
    const {username,title,about,time} = req.body
    if (!title) return next(errorHandler(404, 'inputs not found'));
    // if (!title) return req.status(404).json('todo not found');
    try {
        const newTodo = new Todo({username,title,about,time})
        await newTodo.save();
        res.status(201).json({ message: 'todo added' });
      } catch (error) {
        console.log(error)
        next(error);
      }
}
 
export const getTodo = async (req,res,next) =>{
  const {username} = req.params
  try {
    const listing = await Todo.find({username:req.params.username});
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

export const deleteTodoItem = async (req,res,next) =>{
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json('Todo has been deleted...');
  } catch (error) {
    next(error);
  }
}

export const updateTodo = async (req,res,next) =>{
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          about: req.body.about,
        },
      },
      { new: true }
    ); 
    res.status(200).json('updated successfully');
  } catch (error) {
    res.status(401).json(error);
    next(error);
  }
}

export const isCompleteTodo = async (req,res,next) =>{
  try { 
    await Todo.updateOne(
      {"_id":req.params.id},
      [{
        $set: {
          complete:{"$not":"$complete"} 
        }
      }],
      { new: true }
    ); 
    res.status(200).json("");
  } catch (error) {
    res.status(401).json(error);
    next(error);
  }
}