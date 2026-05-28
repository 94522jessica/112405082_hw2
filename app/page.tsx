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
      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
    >
      {/* 背景紋理 */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(160deg, #FFF8EE 0%, #FFF3DC 50%, #FFE9C4 100%)",
        }}
      />
      {/* 裝飾圓 */}
      <div
        className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full opacity-20 -z-10"
        style={{ background: "radial-gradient(circle, #F59E0B, transparent)" }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full opacity-20 -z-10"
        style={{ background: "radial-gradient(circle, #FB923C, transparent)" }}
      />

      {/* 頂部裝飾 emoji */}
      <div className="text-4xl mb-6 flex gap-3">
        <span style={{ animationDelay: "0s" }} className="inline-block animate-bounce">🥚</span>
        <span style={{ animationDelay: "0.15s" }} className="inline-block animate-bounce">🧋</span>
        <span style={{ animationDelay: "0.3s" }} className="inline-block animate-bounce">🍝</span>
      </div>

      {/* 標題卡片 */}
      <div
        className="w-full max-w-sm rounded-3xl px-8 py-10 text-center shadow-xl"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          border: "2px solid rgba(251,191,36,0.3)",
        }}
      >
        <p className="text-xs font-bold tracking-widest text-amber-500 mb-3 uppercase">
          早餐店人格測驗
        </p>
        <h1 className="text-2xl font-black text-stone-800 leading-snug mb-2">
          你是哪種
          <br />
          早餐店早餐？
        </h1>
        <div className="text-2xl my-3">🥪🥛</div>

        <div className="text-sm text-stone-500 leading-7 text-left mt-4 space-y-1">
          <p>有人像薯餅蛋餅，外酥內柔。</p>
          <p>有人像大冰奶，看起來沒事，</p>
          <p className="pl-4">其實隨時有可能「爆發」。</p>
          <p>也有人像鐵板麵，</p>
          <p className="pl-4">人生永遠一團混亂，但很好吃。</p>
          <p className="mt-2 font-medium text-stone-600">快來測測你是哪種早餐！</p>
        </div>

        {/* 開始按鈕 */}
        <button
          onClick={handleStart}
          className="mt-8 w-full py-4 rounded-2xl text-white font-black text-lg tracking-wider transition-all duration-200 active:scale-95 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #EA580C)",
            boxShadow: "0 6px 20px rgba(234,88,12,0.35)",
          }}
        >
          開始點餐 🛎️
        </button>

        <p className="text-xs text-stone-400 mt-4">共 4 題・約 1 分鐘</p>
      </div>

      {/* 底部小字 */}
      <p className="text-xs text-stone-400 mt-8">
        測驗結果僅供娛樂，請勿認真 😌
      </p>
    </main>
  );
}
