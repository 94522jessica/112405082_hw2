"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePsyStore } from "@/store/store";
import { useRouter } from "next/navigation"

export default function Result() {
  const router = useRouter();
  const psyData = usePsyStore( (state)=> state.psyData );
  const setPsyScore = usePsyStore( (state) => state.setScore );
  const [psyResult, setPsyResult] = useState(<></>);
  
  useEffect( ()=>{
    getResult();
  }, [psyData.score]);


  function getResult(){
    if( psyData.score < 3 ){
      setPsyResult(
        <div>
          結果 A
          <a href="https://google.com">GOOGLE</a>
        </div>
      );
    }else if( psyData.score >= 3 && psyData.score < 7 ){
      setPsyResult(<div>結果 B</div>);
    }else{
      setPsyResult(<div>結果 C</div>);
    }
  }

  function playAgain(){
    setPsyScore(0);
    router.push("/");
  }

  
  
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        
        結果，目前積分：{psyData.score}
        
        {psyResult}
        
        <div 
          className="text-white bg-black px-3 py-2" 
          onClick={playAgain}>
          再玩一次
        </div>
      </div>
    </>
  );

}
