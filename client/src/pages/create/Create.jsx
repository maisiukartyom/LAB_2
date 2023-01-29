import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Create = () => {

  const unique_id = uuid();

  const [note, setNote] = useState({
    title: undefined,
    content: undefined,
    date: undefined,
    complete: false,
  })

  const handleChange = (e) => {
    setNote(prev => {
      return {
        ...prev, 
        [e.target.name]: e.target.value
      }
    })
  }

  const navigate = useNavigate()

  const handleClick = () => {
    const res = axios.post("/notes/create", note)
    navigate("/")
  }

  return (
    
    <div className="container-fluid">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-2"><a className="navbar-brand">
        <Link to="/" style={{color: "white", textDecoration: "none"}}>На главную</Link></a></nav>
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