import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }
  return (
   <div className='home'>
    <h1>Hello 🖐️,{loggedInUser}</h1>
    <h3>Welcome to the home page,You are currently logged in</h3>
    <button className='login-btn' onClick={handleLogout}>LOG OUT</button>
   </div>
  )
}

export default Home