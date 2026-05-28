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
    <main
      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(160deg, #FFF8EE 0%, #FFF3DC 50%, #FFE9C4 100%)" }}
      />

      {/* 旋轉 emoji */}
      <div className="text-6xl mb-8" style={{ animation: "spin 2s linear infinite" }}>
        🍳
      </div>

      {/* 訊息 */}
      <p
        className="text-base font-bold text-stone-700 text-center transition-opacity duration-200"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {MESSAGES[msgIndex]}
      </p>

      {/* 進度點 */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "#F59E0B",
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </main>
  );

}