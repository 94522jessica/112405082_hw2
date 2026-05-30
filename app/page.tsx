"use client";
import { useRouter } from "next/navigation";
import { usePsyStore } from "@/store/store";

export default function Home() {
  const router = useRouter();
  const reset = usePsyStore((s) => s.reset);

  function handleStart() {
    reset();
    router.push("/question");
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >

      {/* 標題卡片：改為盤子造型，移除原有的邊框與背景色 */}
      <div
        className="w-[95%] max-w-[550px] aspect-square flex flex-col items-center justify-center text-center p-10 relative"
        style={{
          // 套用你的去背盤子圖案
          backgroundImage: "url('/plate.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain", // 使用 contain 確保盤子完整縮放不被裁切
          backgroundPosition: "center",
        }}
      >
        <div className="text-lg sm:text-xl text-amber-950 leading-8 text-center mt-2 space-y-2 font-bold">
          <p>「阿姆...好吃」</p>
          <p>你重生了，由於上一世太愛吃早餐</p>
          {/* 如果你希望文字完美置中，建議可以把這裡原本的 pl-4 拿掉，或者保留製造錯落感 */}
          <p className="pl-4">這一世，你將化身早餐店熱門品項</p>
          <p>陷入無限被吃的循環  (嚼嚼嚼) </p>
          <p className="mt-8 text-center text-amber-950 text-xl">快來測測你是早餐店的哪個品項！</p>
        </div>

        {/* 2. 開始按鈕放大：寬度改為 75%，上下 padding 加大到 py-4，字體放大到 text-xl sm:text-2xl */}
        <button
          onClick={handleStart}
          className="mt-8 w-[60%] sm:w-[50%] py-4 sm:py-5 rounded-full text-[#356392] font-bold text-xl sm:text-2xl tracking-widest transition-all duration-200 active:scale-95 shadow-xl hover:shadow-2xl hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #f7e596, #f7e596)", 
            boxShadow: "0 6px 20px rgba(180,83,9,0.35)",
          }}
        >
          開　始　測　驗
        </button>

        <p className="text-m text-amber-950 mt-4 font-bold">共 4 題・約 1 分鐘</p>
      </div>
    </main>
  );
}