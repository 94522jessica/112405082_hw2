"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePsyStore } from "@/store/store";

export default function Result() {
  
  const psyData = usePsyStore( (state: { psyData: any; })=> state.psyData );
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

  
  
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        
        結果，目前積分：{psyData.score}
        
        {psyResult}
        
        <Link className="text-white bg-black px-3 py-2" href="/">再玩一次</Link>
      </div>
    </>
  );

}
