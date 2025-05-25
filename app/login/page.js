"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import axios from 'axios';
import MCQQuizWithSearch from '../component/Dashboard/page';
import { useRouter } from 'next/navigation';

export default function Login(){
    const [useremail, setUseremail] = useState('');
    const[userpass, setUserpass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [Invalid, setInvalid] = useState('')
    const router = useRouter();



      const Login = async (e) => {
          e.preventDefault(); // ✅ prevents the form from doing GET request
      
          try {
            const res = await axios.post('https://server-production-1573.up.railway.app/login',
              {
              email: useremail,
              password: userpass
            }, {
              withCredentials: true,
              headers: {
                  'Content-Type': 'application/json',
              }
          });
            console.log(res.status);
            console.log(res.data.message);
            const mess = res.data.message;
            if(mess == "Welcome User"){
              router.push('/component/sidebar');
            }
            if(mess == "Welcome Admin"){
              router.push('/AdminComponent/sidebar');
            }
            else{
              console.log(res.status)
            }
          } catch (err) {
            if (err.response) {
              if (err.response.status === 401) {
                  setInvalid("Invalid Email/Password");
                } 
              console.log("Error response:", err.response.data);
            }
            else {
              console.log("Error message:", err.message);
            }
          }
        }
       
    return(
        <>

            <section className="login-section">
                <Link style={{textDecoration:'none'}} href="/Home"><h1 className="fw-bold" style={{color:'#ffa835'}}>WidsomNest</h1></Link>
                <div className="form-section">
                
                <form className="p-4" onSubmit={Login}>
                    <h5 className="text-center mb-3">Login to WidsomNest</h5>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'20px'}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" onChange={(e) => setUseremail(e.target.value)} required/>
                    </div>
                    <div className="mb-3 position-relative">
                        <input style={{padding:'14px', fontSize:'20px'}}  type={showPassword ? 'text' : 'password'} className="form-control" onChange={(e) => setUserpass(e.target.value)}  id="exampleInputPassword1"placeholder="Password" required/>
                        <span onClick={() => setShowPassword(!showPassword)} style={{position: 'absolute',top: '50%',right: '15px',transform: 'translateY(-50%)',cursor: 'pointer'}}><Eye /></span>
                    </div>
                    <p className='text-secondary'>{Invalid}</p>
                    <button style={{padding:'8px 8px', fontSize:'18px'}} id="button1" type="submit" className="btn btn-light w-100 text-white">Submit</button>
                    <div className="d-flex justify-content-between">
                        <Link href="/register" className="mt-2" style={{textDecoration:'none',}}>Sign Up for WidsomNest</Link>
                        <a href="#" className="mt-2" style={{textDecoration:'none',}}>Forgot Password</a>
                    </div>
                </form>
                </div>
            </section>
        </>
    );
}