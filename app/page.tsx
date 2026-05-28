"use client"
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Home() {

  //階段名稱      路由規劃
  //1. 歡迎畫面   /
  //2. 答題      /question
  //3. 準備看結果 /prepare
  //4. 看結果    /result
  // https://psy-test.com/love/result?id=10
  

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        歡迎！
        <Link className="text-white bg-black px-3 py-2" href="/question">START</Link>
      </div>
    </>
  );
}
