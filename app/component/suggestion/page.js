"use client";
import React, { useEffect } from "react";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import Payment from "../payments/page";
import { Search } from "lucide-react";
import SubmitPayment from "../submit/page";


export default function CourseSuggestions() {
  const [active, setactive] = useState('')
  const [showsuggestion, setshowSuggestions]= useState([]);
  const [selectCourse, setselectCourse] = useState(null);
  const router = useRouter()
  useEffect(()=>{
    const suggestCourses = async ()=>{
      try{
        const response = await axios.post(' /component/suggestion',{}, {
          withCredentials: true,
        });
      if(response.status === 200){
        const cleanedSuggestions = response.data.showSuggest.map(
          (arr) => [arr[0].replace(/^Improve\s+/i, '')]
        );
          setshowSuggestions(cleanedSuggestions);
      }
      }
      catch (error) {
        if (error.response?.status === 500) {
          console.log("Database Error");
        } else if (error.response?.status === 404) {
          console.log(error);
        } else if (error.response?.status === 401) {
          console.log("Not logged in",error);
        } else {
          console.log("Other error:", error);
        }
      }      
      
    };
    suggestCourses();
  },[])
  console.log(showsuggestion);
  const handleEnroll=(suggestion)=>{
    setselectCourse(suggestion)
    setactive('payment');
  }
  const handlepay=(Search)=>{
    setactive('search');
  }
  return (
    <div className="container" style={{ overflowY: "scroll", height: '80vh', position: "relative", scrollbarWidth:'none'}}>
      {active === '' ? (
        <>
          <h2 className="text-center mb-3 fw-bold">Recommended Courses</h2>
          <p className="text-center text-muted mb-5">
            Handpicked just for you to level up your learning journey
          </p>

          <hr />

          <div className="row g-4 mt-5">
            {showsuggestion.map((suggestion, idx) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={idx}>
                <div className="card h-100 shadow-sm rounded-4">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-semibold">{suggestion[0]}</h5>
                      <p className="card-text text-muted small">Master al The basic and  Master level and became and professional{suggestion[0].replace(/^Improve\s+/i, '')}</p>
                    </div>
                    <div className="mt-3">
                      <button className="btn text-white w-100 rounded-pill" id="button1" onClick={()=>handleEnroll(suggestion)}>
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <button className="btn text-white mx-auto text-center w-25 rounded-pill mt-5 fs-5" id="button1" onClick={()=>handlepay(Search)}>Search Course</button>
          </div>
        </>
      ) : (
        // Display Payment component when 'active' is set to 'payment'
        <div>
          
          {active === 'payment' && <Payment courseTitle={selectCourse} />}
          {active === 'search' && <SubmitPayment />}
        </div>
      )}
    </div>
  );
}
