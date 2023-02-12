import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../../context/AuthContext'

const Create = () => {

  const unique_id = uuid();
  const {user} = useContext(AuthContext)

  const [note, setNote] = useState({
    owner: undefined,
    title: undefined,
    content: undefined,
    date: undefined,
    complete: false,
  })

  useEffect(() => {
    setNote(prev => {
      return {
        ...prev, owner: user.details._id
      }
    })
  }, [user])

  const handleChange = (e) => {
    setNote(prev => {
      return {
        ...prev, 
        [e.target.name]: e.target.value
      }
    })
  }

  const navigate = useNavigate()

  const [error, setError] = useState(false)

  const handleClick = () => {
    axios.post("/notes/create", note).then((res) => navigate("/")).catch(setError(true))
  }
  // const handleClick = async () => {
  //   await axios.post("/notes/create", note)
  // }

  return (
    
    <div className="container-fluid">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-2"><a className="navbar-brand">
        <Link to="/" style={{color: "white", textDecoration: "none"}}>На главную</Link></a></nav>
        {
          error && (<dialog open>
            <p>You are not authorized!</p>
            <form method="dialog">
              <button>OK</button>
            </form>
          </dialog>)
        }
			<div className="form-group">
	      <label for="title">Заголовок:</label>
	      <input className="form-control" name="title" onChange={handleChange}/>
	    </div>

	    <div className="form-group">
	      <label for="content">Описание заметки:</label>
	      <textarea className="form-control" name="content" placeholder="Описание заметки..." onChange={handleChange}></textarea>
	    </div>

	    <div className="form-group">
	      <label for="date">Дата окончания:</label>
	      <input type="date" name="date" onChange={handleChange}/>
	    </div>

	    <div className="panel-body">
	      <button className="btn btn-success" onClick={handleClick}>Сохранить</button>
	    </div>

	</div>
  )
}

export default Create