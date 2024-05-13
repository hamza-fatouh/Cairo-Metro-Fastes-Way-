import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    
    const handleSubmit = (event) => {
        const values = { email, password};
        event.preventDefault();
        axios.post('http://localhost:2900/login', values)
        .then(res => {
            if (res.data.message == "Success") {
                navigate('/metro');
            } else {
                alert(res.data.message)
            }
        })
    }

    return ( 
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-4 form rounded w-50'>
                <h2>Log-In</h2>
                <form action="" onSubmit={ handleSubmit }>
                    <div className='mb-3 inp'>
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="email" 
                        placeholder='Enter Email' name="email"
                        onChange={e => setEmail(e.target.value)} 
                        />

                        <label htmlFor="Password"><b>Password</b></label>
                        <input type="Password" 
                        placeholder='Enter Password' name="password"
                        onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="Links mt-4">
                        <button type='submit' ><b>Login</b></button>
                        <Link to='/signup' className="Link"><b>Create Account</b></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;