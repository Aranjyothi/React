import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
// import { getAllByPlaceholderText } from "@testing-library/react";


function Login({ setUser }) {

    const navigate = useNavigate()

    let [form, setForm] = useState({ 
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
console.log(1)
        try {
console.log(2)
            const response = await axios.post('http://localhost:8080/auth/login', form)
            
            const info = await axios.get('http://localhost:8080/users/info', {
                headers: {
                    'Authorization': `Bearer ${response.data.token}`
                }
            })
            console.log(response.data.token)

            localStorage.setItem("token", response.data.token)
            setUser(info.data)
            navigate('/profile')

        } catch (error) {
            console.log(error.response)
            alert(error.response)
        }


    }

    return ( 
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <br />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        </>
     );
}

export default Login;