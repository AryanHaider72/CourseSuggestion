import Link from 'next/link';
import UserLayout from '../component/sidebar/page';

export default function Signup(){
    return(
        <>
            <section className="login-section">
            <Link style={{textDecoration:'none'}} href="/Home"><h1 className="fw-bold" style={{color:'#ffa835'}}>EduCourse</h1></Link>
                <div className="form-section">
                
                <form className="p-4 ">
                    <h5 className="text-center mb-3">Create an Account</h5>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'17px'}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
                    </div>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'17px'}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                    </div>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'17px'}}  type="password" className="form-control" id="exampleInputPassword1"placeholder="Password"/>
                    </div>
                    <div className="mb-3">
                        <input style={{padding:'14px', fontSize:'17px'}}  type="password" className="form-control" id="exampleInputPassword1"placeholder="Confirm Password"/>
                    </div>
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