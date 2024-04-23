import React, { useEffect, useState } from "react";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    console.log('You let me use your mic!')
  })
  .catch(function(err) {
    console.log('No mic for you!')
  });

const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

const leastDistance = (arr,str) => {
  let minDist = 99999;
  for(let i = 0 ; i < arr.length; i++){
    let wrd = arr[i];
    let wrdDist = levenshteinDistance(wrd,str)
    if(wrdDist < minDist){
      minDist = wrdDist
    }
  }
}

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "fr-FR";
recognition.interimResults = true;
recognition.maxAlternatives = 1;

function Voice(){
  const [isRecording,setRecording] = useState()
  const [seconds,setSeconds] = useState(0)
  const [isTimer,setTimer] = useState(false)
   
  useEffect(() => {     
    const interval = setInterval(() => {     
      if(isTimer){
        setSeconds(seconds => seconds + 1);     
      }  
    }, 1000);     
    
    const recOnResut = (event) => {
      const wordlocal = event.results[0][0].transcript
      console.log(event.results[0][0])
      if(leastDistance(['commence','start'],wordlocal) < 3){
        setTimer(true)
      }
      else if(leastDistance(['stop','tape','arete'],wordlocal) < 3 ){
        setTimer(false)
      }
    }

    recognition.onresult = recOnResut;

    return () => {
      recognition.onresult = () => {};
      clearInterval(interval)
    };
  }, [isTimer]); 

  return(
    <div
      className={`voiceContainer user-select-none card card-body m-4 p-0 ${isRecording ? 'shadow' : 'shadow-sm'}`} 
      onMouseDown={() => {
        recognition.start();
        setRecording(true)
      }}
      onMouseUp={() => {
        recognition.stop()
        setRecording(false)
      }}
      onMouseLeave={() => {
        recognition.stop()
        setRecording(false)
      }}
    >
      <h2
        className="card-header "
      >
          Voice recorder
      </h2>
      <div
        className={`card-body d-flex flex-row `}
      >
        <div
          className="col-8 d-flex justify-content-center align-items-center fs-3 "
        >
          {
            isRecording ? <p>Recording</p> : <p>Click to record</p>
          }
          </div>
        <div
          className="col-4"
        >
          <div
            className="timeContainer d-flex display-1"
          >
            <p>
              { ('0' + Math.floor(seconds/60)).slice(-2) + ":"}
            </p>
            <p>
              {('0' + seconds%60).slice(-2)}
            </p>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Voice

