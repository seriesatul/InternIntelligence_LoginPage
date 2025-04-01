import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: ''
    })
  
    const [message, setMessage] = useState(""); // State for success/error messages
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      const{ name, value } = e.target;
      console.log(name, value);
      const copyLoginInfo = {...loginInfo};
      copyLoginInfo [name] = value;
      setLoginInfo(copyLoginInfo);
      
    }
  
  
    const handleLogin = async (e) => {
      e.preventDefault();
      const {email, password} = loginInfo;
      if(!email ||!password){
        setMessage("All fields are required.");
        return;
      }
  
      try {
        const url = 'http://localhost:8080/auth/login';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginInfo)
        });
        const result = await response.json();
        const {success, message,jwtToken,name,error} = result;
        if(success){
          setMessage("Congratulations! You are currently logged in.");
          localStorage.setItem('jwtToken', jwtToken);
          localStorage.setItem('loggedInUser', name);
          setTimeout(() => {
            navigate('/home');
          }, 3000);
        }
        else if(error){
          const details =error?.details[0].message;
          setMessage(details);
        }
        else if(!success){
          setMessage(message);
        }
        console.log(result);
      } catch (error) {
        console.error('Error:', error);
        setMessage(error.message);
      }
  
    }
  

  return (
    <div className='main'>
      <div className="navbar">
        <h1>LOGIN</h1>
        <h1>SIGNUP</h1>
        <h1>HOME</h1>
      </div>
      <div className="box">
      <div className="left">
       <h3><i>Log in</i></h3>
       <h1>WELCOME BACK</h1>
       <p>Sign in to access your account</p>
      </div>
      <div className="right">
      <div className="login-container">
        <h1>YOUR ACCOUNT</h1>
        <form onSubmit={handleLogin}>
        <label htmlFor="email">EMAIL</label>
          <input  onChange={handleChange} autoFocus value={loginInfo.email} type="email" name="email" />

          <label htmlFor="password">PASSWORD</label>
          <input  onChange={handleChange} autoFocus value={loginInfo.password}  type="password" name="password" />
            
            <button type="submit" className="login-btn">LOG IN</button>
            {message && <p className="message">{message}</p>} {/* Display messages */}
        </form>

        <div className="bottom-links">
            <a href="#">FORGOTTEN PASSWORD ↗</a>
            <Link to ="/signup">CREATE AN ACCOUNT ↗</Link>
        </div>
    </div>
      </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login