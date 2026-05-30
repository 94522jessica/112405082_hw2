"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore, resultData, BreakfastType } from "@/store/store";
import Image from "next/image";

// ── 五角形雷達圖 (整體放大，字體改為深棕色) ──────────────────
function RadarChart({ stats, color }: { stats: Record<string, number>; color: string }) {
  const labels = Object.keys(stats);
  const size = 200; // ⚡️ 從 160 放大到 200
  const cx = size / 2;
  const cy = size / 2;
  const r = 65;    // ⚡️ 半徑從 52 放大到 65
  const n = labels.length;

  function polarToXY(angle: number, radius: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  const bgPolygons = [1, 0.66, 0.33].map((scale) => {
    const pts = labels.map((_, i) => {
      const { x, y } = polarToXY((360 / n) * i, r * scale);
      return `${x},${y}`;
    });
    return pts.join(" ");
  });

  const dataPoints = labels.map((label, i) => {
    const val = stats[label] / 100;
    const { x, y } = polarToXY((360 / n) * i, r * val);
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="overflow-visible">
      {bgPolygons.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
      ))}
      {labels.map((_, i) => {
        const { x, y } = polarToXY((360 / n) * i, r);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1.5" />;
      })}
      <polygon
        points={dataPoints.join(" ")}
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="2.5"
      />
      {labels.map((_, i) => {
        const val = stats[Object.keys(stats)[i]] / 100;
        const { x, y } = polarToXY((360 / n) * i, r * val);
        return <circle key={i} cx={x} cy={y} r={4} fill={color} />;
      })}
      {labels.map((label, i) => {
        const { x, y } = polarToXY((360 / n) * i, r + 16);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="#451a03" // ⚡️ 強制設定為 amber-950 色號
            fontWeight="900"
            letterSpacing="1"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

// ── 主頁面 ────────────────────────────────────────────────────
export default function Result() {
  const router = useRouter();
  const reset = usePsyStore((s) => s.reset);
  const result = usePsyStore((s) => s.result);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!result) {
      router.replace("/");
      return;
    }
    setTimeout(() => setVisible(true), 100);
  }, [result, router]);

  if (!result) return null;

  const data = resultData[result as BreakfastType];

  function handlePlayAgain() {
    reset();
    router.push("/");
  }

  function handleCopy() {
    // 自動取得目前網站的首頁網址 (例如：https://112405082-hw2.vercel.app)
    const appUrl = window.location.origin;
    
    // 將網址加入到複製的文字中
    const text = `我的早餐人格是「 ${data.name}」！\n核心：${data.core}\n${data.tags.join(" ")}\n\n快來測你是哪種早餐店早餐 🥪🥛\n👉 點此測驗：${appUrl}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const prevPage = () => setCurrentPage((p) => (p > 1 ? p - 1 : 4));
  const nextPage = () => setCurrentPage((p) => (p < 4 ? p + 1 : 1));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-[95%] max-w-[550px] relative flex items-center justify-center">
        
        {/* ⬅️ 左切換按鈕 */}
        <button 
          onClick={prevPage}
          className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-[#FDF5E6]/90 border-2 border-[#356392] text-[#356392] font-black text-xl rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
        >
          ‹
        </button>

        {/* ➡️ 右切換按鈕 */}
        <button 
          onClick={nextPage}
          className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-[#FDF5E6]/90 border-2 border-[#356392] text-[#356392] font-black text-xl rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
        >
          ›
        </button>

        {/* 🍽️ 主體大盤子卡片 */}
        <div
          className="w-full aspect-square flex flex-col items-center justify-center text-center p-8 sm:p-12 relative transition-all duration-500 select-none"
          style={{
            backgroundImage: "url('/plate.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.95)"
          }}
        >
          <div className="w-[85%] sm:w-[80%] h-[75%] flex flex-col items-center justify-center relative">
            
            {/* ─── 第 1 頁：主餐圖片 + 標題 + 人生核心 (全面放大 + 統一 amber-950) ─── */}
            {currentPage === 1 && (
              <div className="animate-fade-in flex flex-col items-center">
                <div className="mb-2 sm:mb-4 hover:scale-105 transition-transform duration-300">
                  {/* ⚡️ 圖片放大：h-36 -> h-44 */}
                  <Image src={data.image} alt={data.name} width={200} height={200} className="drop-shadow-md object-contain h-36 sm:h-44 w-auto" />
                </div>
                <p className="text-m sm:text-base font-black tracking-widest mb-1 text-amber-950/80">
                  你的早餐靈魂是
                </p>
                {/* ⚡️ 標題放大：text-2xl -> text-4xl */}
                <h1 className="text-4xl sm:text-5xl font-black text-amber-950 mb-3">{data.name}</h1>
                <p
                  className="text-sm sm:text-base font-bold px-5 py-2.5 rounded-full inline-block shadow-sm border border-amber-900/10 text-amber-950 bg-amber-900/5 gap-2"
                >
                  {data.core}
                </p>
              </div>
            )}

            {/* ─── 第 2 頁：標籤群 + 人格深度敘述 (字體放大 + 統一 amber-950) ─── */}
            {currentPage === 2 && (
              <div className="animate-fade-in flex flex-col items-center w-full">
                {/* ⚡️ 標籤放大 */}
                <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-5 max-h-[80px] overflow-hidden">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded-md text-amber-950 bg-amber-900/10"
                      style={{ background: "linear-gradient(135deg, #f7e596, #f7e596)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* ⚡️ 敘述文字放大 */}
                <div 
                className="text-sm sm:text-base text-amber-950 leading-7 sm:leading-8 text-left font-bold bg-[#FDF5E6]/40 p-4 rounded-2xl max-h-[160px] sm:max-h-[200px] overflow-y-auto tracking-wide border border-dashed border-amber-900/10 w-full"
                style={{ background: "linear-gradient(135deg, #f7e596, #f7e596)" }}
                >
                  {data.description}
                </div>
              </div>
            )}

            {/* ─── 第 3 頁：雷達圖 + 數值分析面板 (全面放大 + 統一 amber-950) ─── */}
            {currentPage === 3 && (
              <div className="animate-fade-in flex flex-col items-center w-full">
                <RadarChart stats={data.stats} color={data.color} />
                <div className="w-full mt-4 sm:mt-6 grid grid-cols-5 gap-1 text-center border-t border-dashed border-amber-900/20 pt-3 sm:pt-4">
                  {Object.entries(data.stats).map(([key, val]) => (
                    <div key={key}>
                      {/* ⚡️ 數值放大 */}
                      <div className="text-sm sm:text-lg font-black text-amber-950">{val}</div>
                      <div className="text-[10px] sm:text-xs text-amber-950/80 font-bold">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── 第 4 頁：完美搭配餐點 + 功能操作區 (去外框 + 放大 + 專屬按鈕配色) ─── */}
            {currentPage === 4 && (
              <div className="animate-fade-in flex flex-col items-center w-full space-y-4 sm:space-y-6">
                
                {/* ⚡️ 搭配餐點 (拔掉背景與外框，像第一頁一樣純圖文) */}
                <div className="flex flex-col items-center gap-2 w-full mt-2">
                  <div className="mb-1 hover:scale-105 transition-transform duration-300">
                    <Image src={data.pairingImage} alt={data.pairing} width={140} height={140} className="object-contain drop-shadow-md h-28 sm:h-32 w-auto" />
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950/80 font-black tracking-widest">最佳組合夥伴</p>
                  <p className="text-2xl sm:text-4xl font-black text-amber-950"> {data.pairing}</p>
                </div>

                {/* ⚡️ 按鈕功能區 (放大 + 改色) */}
                <div className="flex flex-col gap-3 w-full max-w-[260px]">
                  <button
                    onClick={handleCopy}
                    className="w-full py-3.5 sm:py-4 rounded-full font-black text-lg sm:text-xl tracking-widest transition-all duration-200 active:scale-95 shadow-lg text-[#356392]"
                    style={{ background: "linear-gradient(135deg, #f7e596, #f7e596)" }}
                  >
                    {copied ? "已複製連結" : "分享點餐單"}
                  </button>
                  <button
                    onClick={handlePlayAgain}
                    className="w-full py-3.5 sm:py-4 rounded-full font-black text-lg sm:text-xl tracking-widest transition-all duration-200 active:scale-95 shadow-lg text-[#356392]"
                    style={{ background: "linear-gradient(135deg, #f7e596, #f7e596)" }}
                  >
                    再點一次
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* 📍 盤底分頁小進度點 */}
          <div className="absolute bottom-8 sm:bottom-12 flex gap-2">
            {[1, 2, 3, 4].map((page) => (
              <div
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentPage === page ? "w-6 bg-[#356392]" : "w-2.5 bg-[#356392]/30 hover:bg-[#356392]/50"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}