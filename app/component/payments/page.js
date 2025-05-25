"use client";
import { useEffect, useState,useRef } from "react";
import CourseSuggestions from "../suggestion/page";
import { ChevronUp } from "lucide-react";
import { Smartphone } from "lucide-react";
import SubmitPayment from "../submit/page";
export default function Payment({courseTitle}){
    const [active,setactive]= useState('');
    const [selectedForm, setSelectedForm] = useState('');
    const [fetchdata, setfetchdata]= useState(null);
      const [showScroll, setShowScroll] = useState(false);
      const scrollContainerRef = useRef(null);
      const movetoPayment=()=>{
        setactive('payment')
      }
    const handleclick=()=>{
        setactive('suggestion');
    }

      // Handle scrolling to show the button
      useEffect(() => {
        const handleScroll = () => {
          if (scrollContainerRef.current) {
            setShowScroll(scrollContainerRef.current.scrollTop > 300);
          }
        };
    
        const container = scrollContainerRef.current;
        if (container) {
          container.addEventListener("scroll", handleScroll);
        }
    
        return () => {
          if (container) {
            container.removeEventListener("scroll", handleScroll);
          }
        };
      }, []);

    useEffect(()=>{
        fetchCourseDetails();
    },[])
    const fetchCourseDetails = async () => {
    
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `Create a detailed course outline for a ${courseTitle} course.
                                Divide the course into 5 modules.
                                - Each module should have a clear title and a short description of what the learner will gain write approximately 3 topic of what they will learn.
                                - Include a course summary (150–200 words) describing what the course covers, its goals, and who it's intended for.
                                - Ensure the content is beginner-friendly and structured for progressive learning.
                                - Do **not** include any Markdown formatting, explanations, or extra text — only the raw JSON object.`,
                      },
                    ],
                  },
                ],
              }),
            }
          );
          const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleanText = rawText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanText);
        console.log(parsed);
        setfetchdata(parsed);
        
        } catch (error) {
            console.error("Error fetching course details:", error);
        } 
      };


    return(
        <>
        {active == '' ?
            (
            <>
                <div className="py-5 container" ref={scrollContainerRef}  style={{ overflowY: "scroll", height: "640px" }}>
                {fetchdata ? (
                    <>
                    <div className="d-flex flex-column">
                      <div className = "d-flex justify-content-between align-items-center">
                        <h1>{fetchdata.courseTitle}</h1>
                        <button onClick={handleclick} className="btn btn-sm btn-outline-danger"style={{ fontSize: "1.5rem", lineHeight: "1" }}>&times;</button>
                      </div>
                        <hr className="w-100" />
                        <h2>Summary</h2>
                        <p>{fetchdata.courseSummary}</p>
                        <hr className="w-100" />
                        <div>
                            <div>
                            {fetchdata.modules.map((module, index) => (
                            <div key={index}>
                                
                                <h3 className="m-3">{module.moduleTitle}</h3>
                                <p>{module.moduleDescription}</p>
                                {fetchdata.modules.map((topic, index)=>
                                <ul key={index}>
                                    <li>{topic.topics}</li>
                                </ul>
                                )}
                                <hr className="w-80 mx-auto" />
                            </div>
                            ))}
                            </div>
                        </div>
                    </div>

                        {showScroll && (
                                <button
                                  onClick={() => {
                                    if (scrollContainerRef.current) {
                                      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
                                    }
                                  }}
                                  id="button1"
                                  className="btn position-fixed bg-warning"style={{bottom: "20px",right: "20px",zIndex: 1000,padding: "10px",borderRadius: "50%",}}>
                                  <ChevronUp color="white" />
                                </button>
                              )}
                              <button className="btn mt-4 fs-4 text-white " id="button1" onClick={movetoPayment}>Move to Payment</button>
                            </>
                            ): (
                            <p>Loading course details...</p>
                            )}
                </div>

                
            </>):
            (<div>
                {active === 'suggestion' && <CourseSuggestions />}
                {active === 'payment' && <SubmitPayment />}
            </div>)
            }
        
        </>
        
    );
}