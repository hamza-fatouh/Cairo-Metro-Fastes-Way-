import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Signup() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    
    const handleSubmit = (event) => {
        const values = {userName, email, password};
        event.preventDefault();
        fetch('http://localhost:2900/signup', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            res.json()
        })
        .then((data) => {
            console.log(JSON.stringify(values));
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return ( 
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-4 form rounded w-50'>
                <h2>Sign-Up</h2>
                <form action="" onSubmit={ handleSubmit }>
                    <div className='mb-3 inp'>
                        <label htmlFor="name"><b>Name</b></label>
                        <input type="text" 
                        placeholder='Enter Name' name="name" 
                        onChange={e => setUserName(e.target.value)} 
                        />

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
                    <div className="Links">
                        <button><b>Sign up</b></button>
                        <Link to='/' className="Link"><b>Login</b></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;