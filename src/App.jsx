import { useState,useCallback,useEffect, useRef } from "react";
function App(){
  let [length,setLength]=useState(4);
  let refe=useRef(null);
  let [password,setPassword]=useState("");
  let [numbers,setnumbers]=useState(false);
  let [symbols,setSymbols]=useState(false);
  let [visible,setvisibility]=useState(false);
  let passwordGenerator=()=>{
  let pass="";
  let Str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numbers){Str= Str + "0123456789";}
  if(symbols){Str= Str + "!@#$%^&*()_+[]{}|;:,.<>?";}
  for(let i=0;i<length;i++){
    pass=pass+Str.charAt(Math.floor(Math.random()* Str.length));
  }
  setPassword(pass);
  };

  let copie=()=>{
    refe.current.select();
    navigator.clipboard.writeText(password);
    setvisibility(true);
    setTimeout(() => {
      setvisibility(false);
    }, 500);
  }

  useEffect(()=>{
    passwordGenerator();
  },[length,numbers,symbols]);

  return <>
  <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
    <div className="h-[50vh] w-[50vw] rounded-2xl bg-gray-300 drop-shadow-2xl flex flex-row justify-center items-center">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="relative flex flex-row"><input className="h-20 w-100 bg-transparent rounded-2xl border-1 text-xl"  ref={refe} type="text" value={password}/><button onClick={copie} className="h-20 w-20 bg-green-800 absolute right-[0.1px] text-white top-[0.1px] rounded-r-2xl hover:text-2xl">copy</button></div>
        <label className="text-2xl font-bold text-green-800" style={{visibility:visible?"visible":"hidden"}}>copied</label>
      </div> 
      <div className="h-full w-60 rounded-r-2xl  bg-amber-50 flex flex-col justify-center items-center">
        <input type="range" name="range" max={100} min={4} value={length} onChange={(e)=>setLength(e.target.value)} defaultValue={4}/>
        <label >range={length}</label>
        <hr className="w-full border-0.5 border-gray-300 m-10"/>
        <input  onChange={(e)=>setnumbers(e.target.checked)} type="checkbox" name="numbers " defaultChecked={numbers} placeholder="numbers"/>
        <label >numbers</label>
        <hr className="w-full border-0.5 border-gray-300 m-10"/>
        <input onChange={(e)=>setSymbols(e.target.checked)} type="checkbox" name="symbols" defaultChecked={symbols} placeholder="symbols"/>
        <label >symbols</label>
      </div>
    </div>
  </div>
  </>

}
export default App;