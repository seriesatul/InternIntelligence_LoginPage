import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'






const Signup = () => {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [message, setMessage] = useState(""); // State for success/error messages
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const{ name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
    
  }


  const handleSignup = async (e) => {
    e.preventDefault();
    const {name, email, password} = signupInfo;
    if(!name ||!email ||!password){
      setMessage("All fields are required.");
      return;
    }

    try {
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const {success, message} = result;
      if(success){
        setMessage("Congratulations! You have successfully signed up. Redirecting to login page... 1 second.  ");
        setTimeout(() => {
          navigate('/login')
        }, 3000);
      }
      else if(password.length < 8){
        setMessage("Password should be at least 8 characters long.");
      }
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      setMessage("An error occurred. Please try again.");
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
     <h1>CREATE <span>an</span> </h1>
     <h1>ACCOUNT </h1>
     <p>Create an Account to Register Yourserlf...</p>
    </div>
    <div className="right">
    <div className="login-container">
      <h1>YOUR ACCOUNT</h1>
      <form onSubmit={handleSignup}>
        
          <label htmlFor="name">NAME</label>
          <input onChange={handleChange} autoFocus value={signupInfo.name} type="text"  name='name'/>
          
          <label htmlFor="email">EMAIL</label>
          <input  onChange={handleChange} autoFocus value={signupInfo.email} type="email" name="email" />

          <label htmlFor="password">PASSWORD</label>
          <input  onChange={handleChange} autoFocus value={signupInfo.password}  type="password" name="password" />

          
          <button type="submit" className="login-btn">SIGN UP</button>
          {message && <p className="message">{message}</p>} {/* Display messages */}
      </form>

      <div className="bottom-links">
          <a href="#">ALREADY HAVE AN ACCOUNT ↗</a>
          <Link  to="/login">LOG IN ↗</Link>
      </div>
  </div>
    </div>
    </div>
    
  </div>
  )
};

export default Signup