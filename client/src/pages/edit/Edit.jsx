import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {

  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const [note, setNote] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
        const res = await axios.get(`/notes/getNote/${id}`)
        setNote(res.data.note)
        setLoading(false)
    }
    getData()
    },[])
  

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
    axios.post(`/notes/edit/${id}`, note)
    navigate("/")
  }

  return (
    <>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-2"><a className="navbar-brand">
        <Link to="/" style={{color: "white", textDecoration: "none"}}>На главную</Link></a></nav>
        {
            loading? "LOADING": (
                <div className="container-fluid">
                    <div className="form-group">
                        <label>Заголовок:</label>
                        <input className="form-control" name="title" value={note.title} onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Описание заметки:</label>
                        <textarea className="form-control" name="content" value={note.content} onChange={handleChange}></textarea>
                    </div>

                    <div className="form-group">
                        <label>Дата окончания:</label>
                        <input type="date" value={note.date} name="date" onChange={handleChange}/>
                    </div>

                    <div className="panel-body">
                        <button className="btn btn-success" onClick={handleClick}>Сохранить</button>
                    </div>

                </div>
            )
        }
    </>
  )
}

export default Edit