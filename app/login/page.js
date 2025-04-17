"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login(){
    const [email, setemail]= useState('');
    const [pass, setpass] = useState('');
    const router = useRouter();
    const handleEmailChange = (e) => setemail(e.target.value);
    const handlePassChange = (e) => setpass(e.target.value);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(email==='admin@gmail.com' && pass==='qwerty'){
            router.push('/AdminComponent/sidebar');
        }
        else if(email==='user@gmail.com' && pass==='qwerty'){
                router.push('/component/sidebar');
            }
        else{
            alert('Invalid Cradiential');
        }
    }

    
    return(
        <>

            <section className="login-section">
                <Link style={{textDecoration:'none'}} href="/Home"><h1 className="fw-bold" style={{color:'#ffa835'}}>EduCourse</h1></Link>
                <div className="form-section">
                
                <form className="p-4 ">
                    <h5 className="text-center mb-3">Login to EduCourse</h5>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'17px'}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"  onChange={handleEmailChange} required/>
                    </div>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'17px'}}  type="password" className="form-control" id="exampleInputPassword1"placeholder="Password"  onChange={handlePassChange}/>
                    </div>
                    <button style={{padding:'8px 8px', fontSize:'18px'}} id="button1" type="submit" className="btn btn-light w-100 text-white" onClick={handleSubmit}>Submit</button>
                    <div className="d-flex justify-content-between">
                        <Link href="/signup" className="mt-2" style={{textDecoration:'none',}}>Sign Up for EduCourse</Link>
                        <a href="#" className="mt-2" style={{textDecoration:'none',}}>Forgot Password</a>
                    </div>
                </form>
                </div>
            </section>
        </>
    );
}