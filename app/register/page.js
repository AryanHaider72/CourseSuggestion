"use client";
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { Eye } from 'lucide-react';

export default function Signup(){
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const[userpass, setUserpass] = useState('');
  const[userCpass, setUserCpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const[message, setmessage] = useState('');
  const [messageColor, setMessageColor] = useState(''); 
  const register = async (e) => {
    e.preventDefault(); // ✅ prevents the form from doing GET request

    if(userpass==userCpass){
      setmessage("Password Matched");
      setMessageColor('success');
    try {
      const res = await axios.get(" https://coursesuggestion-production.up.railway.app/register", {
        username: username,
        email: useremail,
        password: userpass,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
  
      console.log(res.status);
      if(res.status==200){
        alert(res.data.message);
        window.location.reload();
    }
    } catch (err) {
      if (err.response) {
        alert('Email Already Exist');
        window.location.reload();
        console.log("Error response:", err.response.data);
      } else if (err.request) {
        console.log("No response received:", err.request);
      } else {
        console.log("Error message:", err.message);
      }
    }
  }
  else{
       setmessage("Passwrod not Matched");
       setMessageColor('danger');
  }
}

    return(
        <>
            <section className="login-section">
            <Link style={{textDecoration:'none'}} href="/Home"><h1 className="fw-bold" style={{color:'#ffa835'}}>WidsomNest</h1></Link>
                <div className="form-section">
                
                <form className="p-4" onSubmit={register}>
                    <h5 className="text-center mb-3">Create an Account</h5>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'20px'}} type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" required/>
                    </div>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'20px'}}  type="email" onChange={(e) => setUseremail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"required/>
                    </div>
                    <div className="mb-3 position-relative">
                        <input style={{padding:'14px', fontSize:'20px'}}  type={showPassword ? 'text' : 'password'} className="form-control" onChange={(e) => setUserpass(e.target.value)}  id="exampleInputPassword1"placeholder="Password" required/>
                        <span onClick={() => setShowPassword(!showPassword)} style={{position: 'absolute',top: '50%',right: '15px',transform: 'translateY(-50%)',cursor: 'pointer'}}><Eye /></span>
                    </div>
                    <div className="mb-3 position-relative">
                        <input style={{padding:'14px', fontSize:'20px'}}  type={showPassword ? 'text' : 'password'} className="form-control" onChange={(e) => setUserCpass(e.target.value)}  id="exampleInputPassword1"placeholder="Confirm Password" required/>
                        <span onClick={() => setShowPassword(!showPassword)} style={{position: 'absolute',top: '50%',right: '15px',transform: 'translateY(-50%)',cursor: 'pointer'}}><Eye /></span>
                    </div>
                    <p className={messageColor === 'danger' ? 'text-danger' : 'text-success'}>{message}</p>
                    <button style={{padding:'8px 8px', fontSize:'18px'}} id="button1" type="submit" className="btn btn-light w-100 text-white">Submit</button>
                    <div className="d-flex justify-content-between">
                    <Link  href="/login" className="btn btn-link">Already have an account?</Link>
                    </div>
                </form>
                </div>
            </section>
        </>
    );
}