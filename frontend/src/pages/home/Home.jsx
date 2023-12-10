import React, { useEffect, useState } from 'react'
import Spinner from '../../components/loader/Spinner';
import './home.css'
import Header from "../../components/header/Header";
import { ToastContainer, toast } from 'react-toastify';
import AddTodo from '../../components/addTodo/AddTodo';
import TodoList from '../../components/todoList/TodoList';
import {useSelector} from 'react-redux'


function Home() {

  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },500);
  }, [])


  return (
    <div>
      {
        loading ?
        <div className='loadingDiv'><Spinner className={'loader'} loading={loading}/></div>
        :
        <div className='home_div'>
          <Header/>
          <div className='addTodo'>
            <AddTodo/>
          </div>
            <div className='todolist'>
              <TodoList/>
            </div>
        </div>
      }
      {/* <ToastContainer/> */}
    </div>
  )
}

export default Home