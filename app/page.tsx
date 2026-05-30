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
      {/* 標題卡片：優化手機版內距為 p-6，桌機版 sm 以上維持 p-10 */}
      <div
        className="w-[95%] max-w-[550px] aspect-square flex flex-col items-center justify-center text-center p-6 sm:p-10 relative"
        style={{
          // 套用你的去背盤子圖案
          backgroundImage: "url('/plate.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain", // 使用 contain 確保盤子完整縮放不被裁切
          backgroundPosition: "center",
        }}
      >
        {/* 文字內置區：限制寬度 w-[85%]，確保文字百分之百留在盤子中心，絕不凸出 */}
        <div className="text-base sm:text-xl text-amber-950 leading-relaxed sm:leading-8 text-center mt-1 sm:mt-2 space-y-1 sm:space-y-2 font-bold w-[85%] sm:w-[80%]">
          <p>「阿姆...好吃」</p>
          <p>你重生了，由於上一世太愛吃早餐</p>
          {/* ⚠️ 移除了手機版的 pl-4 縮排，讓文字在窄螢幕上完美置中，不偏向任何一邊 */}
          <p>這一世，你將化身早餐店熱門品項</p>
          <p>陷入無限被吃的循環  (嚼嚼嚼) </p>
          
          {/* ⚡️ 提示文字：手機版 text-lg，電腦版 text-2xl */}
          <p className="mt-4 sm:mt-8 text-center text-amber-950 text-lg sm:text-2xl font-black tracking-wide">
            快來測測你是早餐店的哪個品項！
          </p>
        </div>

        {/* 2. 開始按鈕：手機版 w-[70%] py-3.5 比例更和諧，並保留你的專屬舒適配色 */}
        <button
          onClick={handleStart}
          className="mt-6 sm:mt-8 w-[70%] sm:w-[55%] py-3.5 sm:py-4.5 rounded-full text-[#356392] font-black text-lg sm:text-2xl tracking-widest transition-all duration-200 active:scale-95 shadow-xl hover:shadow-2xl hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #f7e596, #f7e596)", 
            boxShadow: "0 6px 20px rgba(180,83,9,0.25)",
          }}
        >
          開　始　測　驗
        </button>

        {/* ⚡️ 底部小字微調 */}
        <p className="text-xs sm:text-sm text-amber-950/80 mt-3 sm:mt-4 font-bold">
          共 4 題・約 1 分鐘
        </p>
      </div>
    </main>
  );
}