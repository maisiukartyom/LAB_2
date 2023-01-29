import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import downloadjs from 'downloadjs';

const Details = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const [note, setNote] = useState({})
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`/notes/getNote/${id}`)
            setNote(res.data.note)
            setFiles(res.data.files)
            setLoading(false)
        }
        getData()

    },[])

    const navigate = useNavigate()

    const deleteNote = () => {
        const func = async () => await axios.get(`/notes/delete/${id}`)
        func()
        navigate("/")
    }

    const handleClick = () => {
        const edit = async () => await axios.post(`/notes/edit/${id}`, {complete: !note.complete})
        setNote(prev => {
            return {
                ...prev, complete: !prev.complete
            }
        })
        edit()
    }

    const [file, setFile] = useState()

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleFileLoad = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('file', file)
        axios.post(`/files/upload/${id}`, data).then(res => setFiles(res.data.files))
    }   

    const deleteFile = (e) => {
        axios.post(`/files/delete/`, {id: id, filename: e.target.value}).then(res => setFiles(res.data.files))
    }

    const downloadFile = (e) => {
        axios.post(`/files/download/`, {id: id, filename: e.target.value}).then(res => {
            const blob = res.blob
            downloadjs(blob, e.target.value)
        })
        
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-2"><a className="navbar-brand">
        <Link to="/" style={{color: "white", textDecoration: "none"}}>На главную</Link></a></nav>
            {
            loading ? "LOADING..." : 
                (
                    <div className="container-fluid">
                        <h1>{note.title}</h1>
                
                        <div className="row">
                            <div className="col-8 bg-light rounded ml-3 pt-2 pb-2"><pre>{note.content}</pre></div>
                            <div className="col bg-light rounded ml-1 mr-3 d-flex align-items-center">
                                    
                                <form method="post" action="/complete" className="flex-fill pb-2 pt-2">                  
                
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Дата окончания:</span>
                                        </div>
                                        <input type="text" className="form-control" value={note.date} readOnly />
                                    </div>
                
                                    <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                        <input type="checkbox" name="complete" checked={note.complete} onChange={handleClick} />
                                        </div>
                                    </div>
                                    <input type="text" className="form-control" value="Завершено" readOnly />
                                    </div>
                
                                </form>
                
                            </div>
                        </div>
                        <form onSubmit={handleFileLoad}>
                        <div className="form-group mt-2">
                                <div className="input-group">
                                    <button className="btn btn-secondary mr-1" type='submit'>Загрузить файл</button>					
                                    <div className="custom-file">
                                        <input type="file" onChange={handleFileChange} className="custom-file-input" />
                                        <label className="custom-file-label">Выберите файл</label>
                                    </div>
                                </div>
                        </div>
                        </form>
                
                        {
                            files.length > 0 &&
                            <table className="table table-hover table-bordered">
                                <thead className="thead-light">
                                    <tr><th>Название файла</th><th>Действия</th></tr>
                                </thead>
                                <tbody>
                                    {
                                        files.map(file => (
                                            <tr>
                                                <td className="align-middle">{file}</td>
                                                <td>  
                                                    <div className="d-flex justify-content-center"> 
                                                            <div className="btn-group btn-group-md">
                                                                <button className="btn btn-danger" value={file} onClick={deleteFile}>Удалить</button>
                                                                <button className="btn btn-info" value={file} onClick={downloadFile}>Скачать</button>
                                                            </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    
                
                                </tbody>
                            </table> 
                        }
                
                            
                    
                        <div className="d-flex justify-content-center">
                                <div className="btn-group btn-group-md">
                                    <button className="btn btn-danger" type="submit" onClick={deleteNote}>Удалить записку</button> 
                                    <button className="btn btn-info" type="submit" onClick={() => navigate(`/edit/${id}`)}>Изменить записку</button> 
                                </div>
                        </div>
                
                    </div>
                )
                    
            }
        </>
        
        
    )
}

export default Details