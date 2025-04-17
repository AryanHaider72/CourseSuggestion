'use client';

import { useState } from "react";

export default function Test() {
    const [reply,setreply] = useState('');
    const [userinput,setuserinput] = useState("");
  async function ApiCalling() {
    const prompt = userinput;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCWD0FVKuuQIGod65RtmnnvjOm75jaPI48`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      });

      const data = await response.json();

      const airesponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setreply(airesponse || 'No response from Gemini 🤔');

    } catch (error) {
      console.error('❌ Error during API request:', error);
      setReply('❌ Failed to fetch response');
    }
  }

  return (
    <>
      <p onClick={ApiCalling} style={{ cursor: 'pointer', color: 'blue' }}>
        Click me to talk to Gemini
        <input type="text" onChange={(e) => setuserinput(e.target.value)} placeholder="Enter Prompt" value={userinput}></input>
      </p>
      <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
        {reply && (
          <>
            <h3>🤖 Gemini&apos;s Reply:</h3>
            <p>{reply}</p>
          </>
        )}
      </div>
    </>
  );
}
