import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./register.css"

const Register = () => {

    const [user, setUser] = useState({
        username: undefined, 
        password: undefined, 
        email: undefined
    })

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev, [e.target.id]: e.target.value
        }))
    }

    const navigate = useNavigate()

    const handleClick = async () => {
        const res = await axios.post("/auth/register", user)
        navigate("/login")
    }

    return(
        <div className="register">
            <div className="rContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="rInput" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="rInput" />
                <input type="email" placeholder="email" id="email" onChange={handleChange} className="rInput" />
                <button className="rButton" onClick={handleClick}>Register</button>
                {/* {error && <span>{error.message}</span>} */}
            </div>
        </div>
    )
}

export default Register