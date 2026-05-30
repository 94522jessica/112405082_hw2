"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MESSAGES = [
  "正在幫你搭配早餐⋯⋯ 🍳",
  "翻開早餐店菜單中⋯⋯ 📋",
  "詢問早餐店老闆意見⋯⋯ 👨‍🍳",
  "你的早餐人格即將揭曉！ ✨",
];

export default function Prepare() {
  const router = useRouter();
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // 每 800ms 換一句話
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((i) => {
          if (i < MESSAGES.length - 1) return i + 1;
          return i;
        });
        setFade(true);
      }, 200);
    }, 900);

    // 3.6 秒後跳到結果頁
    const timeout = setTimeout(() => {
      clearInterval(interval);
      router.push("/result");
    }, 3600);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    // 1. 移除寫死的 font-family，版面設定跟作答頁一樣
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* ⚠️ 移除了原本的漸層背景 <div>，現在黃色小魚背景會正常顯示了 */}

      {/* 2. 題目卡片：套用完全相同尺寸的盤子造型 */}
      <div
        className="w-[95%] max-w-[550px] aspect-square flex flex-col items-center justify-center text-center p-6 sm:p-10 relative"
        style={{
          backgroundImage: "url('/plate.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        {/* 旋轉 emoji，稍微放大一點配合盤子比例 */}
        <div className="text-6xl sm:text-7xl mb-8" style={{ animation: "spin 2s linear infinite" }}>
          🍳
        </div>

        {/* 訊息文字：套用作答頁相同的 text-amber-950 和 font-black，並增加大小 */}
        <p
          className="text-lg sm:text-2xl font-black text-amber-950 text-center transition-opacity duration-200"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {MESSAGES[msgIndex]}
        </p>

        {/* 進度點：將顏色改為琥珀色，讓它與深棕色的字體更搭 */}
        <div className="flex gap-3 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
              style={{
                background: "#461901",
                animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  );
}