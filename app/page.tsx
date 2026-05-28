"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from '@heroui/react';
import { ColorSlider, Label } from '@heroui/react';
import {parseColor} from "react-aria-components";
import ActionButton from "@/component/ActionButton";

export default function Home() {

  const [color, setColor] = useState(parseColor("hsl(0, 100%, 50%)"));

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
        <ColorSlider
          value={color}
          onChange={setColor}
          channel="hue" className="w-full max-w-xs" defaultValue="hsl(0, 100%, 50%)">
          <Label>Hue</Label>
          <ColorSlider.Output />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>

        {color.toString()}

        <Link className="text-white bg-black px-3 py-2" href="/question">START</Link>
        
        <ActionButton/>
        
      </div>
    </>
  );
}
