import Link from 'next/link';
export default function instruction(){
    return(
        <main>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent" style={{backdropFilter: 'blur(10px)',WebkitBackdropFilter: 'blur(10px)',backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
    
            <div style={{marginLeft:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <h4 style={{color:'#ffa835', fontWeight:'700', fontSize:'30px', marginTop:'10px', marginLeft:'10px'}}>EduCourse</h4>
                </div>
    
                {/* 🔸 Mobile Toggler */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
    
                {/* 🔸 Buttons */}
                <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                    <Link href="/signup" className="btn text-white" id="button1">Join Now</Link>
                    <Link href="/login" className="btn"id="button2">Log in</Link>
                </div>
            </div>
            </nav>
            <section>
            </section>
        </main>
    );
}