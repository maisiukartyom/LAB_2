import './home.css'
import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'

const Home = () => {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("")

    const navigate = useNavigate()

    const {user} = useContext(AuthContext)
    if (!user){
        navigate("/login")
    }

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/notes/home")
            setData(res.data)
            setLoading(false)
        }
        getData()

    },[])

    const formatDate = (strDate) => {
        let output = '';
        if (strDate == '') {
            output = "-"
        } else {
            let date = new Date(strDate);
            output = date.toLocaleDateString("ru-RU", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        }
    
        return output;
    }

    const getStatus = (completeDate) => {
        let status = "В процессе!";
        
        if (Date.parse(completeDate) - Date.now() < 0) 
            status = "Время вышло!";

        if (completeDate === '') {
            status = 'Бессрочно!';
        }

	    return status;
    }

    const filterNotes = async () => {
        const res = await axios.get("/notes/home")

        let notes = res.data.notes
        let filtredNotes = [];

        if (status === 'Все') {
            filtredNotes = notes;
        } else {
            if (status === 'Завершено!') {
                filtredNotes = notes.filter(note => note.complete);
            } else {
                filtredNotes = notes.filter(note => getStatus(note.date) === status && !note.complete);
            }
        }

        setData(prev => {
            return {
                ...prev, notes: filtredNotes
            }
        })
    }

    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    
    const handleClick = () => {
        navigate("/create")
    }

    return (
        <div className="container-fluid mt-5">
            <h1>Заметки</h1>

                <div className="input-group mb-2">
                    <select className="custom-select" name="status" onChange={handleChange}>
                        <option value="Все">Все</option>
                        <option value="Завершено!">Завершенные</option>
                        <option value="В процессе!">В процессе</option>
                        <option value="Время вышло!">Время вышло</option>
                        <option value="Бессрочно!">Бессрочно</option>
                    </select>

                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={filterNotes}>Фильтровать</button>
                        <button className="btn btn-success" type="submit" onClick={handleClick}>Добавить</button>
                    </div>                
                </div>
            {
                loading? "LOADING..." : 
                    data.isVisible ? 
                    (<table className="table table-hover table-bordered">
                        <thead className="thead-light">
                            <tr><th>Заголовок</th><th>Дата</th><th>Статус</th></tr>
                        </thead>
                        <tbody>
                            {
                                data.notes.map(note => 
                                    note.complete ? 
                                    (
                                        <tr className="table-success">
                                            <td><Link to={`/details/${note._id}`}>{note.title}</Link></td>
                                            <td>{note.date}</td>
                                            <td>Завершено!</td>
                                        </tr>
        
                                    ) :
                                    (
                                        <tr>
                                            <td><Link to={`/details/${note._id}`}>{note.title}</Link></td>
                                            <td>{note.date}</td>
                                            <td>{getStatus(note.date)}</td>
                                        </tr>
                                    )
                                
                                )
                                
                            }
        
                        </tbody>
                    </table>) : (<h2>Заметок нет {data.isVisible}</h2>)
                
            }
            
                
        </div>
    )
}

export default Home