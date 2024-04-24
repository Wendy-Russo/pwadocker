import React, { useEffect, useState } from "react";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

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
  return minDist
}

const pad = (nbr) => {
  return ('0' + nbr).slice(-2)
}

const getMin = (nbr) => {
  if(nbr < 0){
    return 59
  }
  return Math.floor((nbr)/60)
}

const getSec = (nbr) => {
  if(nbr < 0){
    return 59
  }
  return (nbr%60) 
}

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "fr-FR";
recognition.interimResults = true;
recognition.maxAlternatives = 3;
recognition.interimResults = true;

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
      
      for (let i = 0; i < event.results.length; i++) {
        const element = event.results[i];
        for (let j = 0; j < element.length; j++) {
          const sentence = element[j].transcript.split(" ");
          for(let k = 0 ; k < sentence.length; k++){
            const wordlocal = sentence[k];
            //console.log(wordlocal)
            if(leastDistance(['commence','start','demarre','continue','reprends'],wordlocal) < 3){
              setTimer(true)
            }
            else if(leastDistance(['stop','tape','arete','pause'],wordlocal) < 3 ){
              setTimer(false)
            }
          }
        }
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
      className={`voiceContainer`} 
      onClick={() => {
        if(isRecording){
          recognition.stop();
          setRecording(false)
        }
        else{
          recognition.start();
          setRecording(true)
        }
      }}
    >
      <div
        className="timeContainer"
      >
        <div className="split">
        
        </div>
        <p className="timeUp">
          { pad(getMin(seconds-60)) + " " + pad(getSec(seconds-1))}
        </p>
        <p className="timeCenter">
          { pad(getMin(seconds)) + " " + pad(getSec(seconds))}
        </p>
        <p className="timeDown">
          { pad(getMin(seconds+60)) + " " + pad(getSec(seconds+1))}
        </p>
      </div>
      {
        isRecording ? 
        <p className="click">Recording</p> : 
        <p className="click">Click anywhere to record</p>
      }
    </div> 
  )
}

export default Voice
