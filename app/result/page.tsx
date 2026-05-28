"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore, resultData, BreakfastType } from "@/store/store";

// ── 五角形雷達圖 ──────────────────────────────────────────────
function RadarChart({ stats, color }: { stats: Record<string, number>; color: string }) {
  const labels = Object.keys(stats);
  const values = Object.values(stats);
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const n = labels.length;

  function polarToXY(angle: number, radius: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  // 背景五邊形（3 層）
  const bgPolygons = [1, 0.66, 0.33].map((scale) => {
    const pts = labels.map((_, i) => {
      const { x, y } = polarToXY((360 / n) * i, r * scale);
      return `${x},${y}`;
    });
    return pts.join(" ");
  });

  // 資料多邊形
  const dataPoints = labels.map((label, i) => {
    const val = stats[label] / 100;
    const { x, y } = polarToXY((360 / n) * i, r * val);
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* 背景網格 */}
      {bgPolygons.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#E5E7EB" strokeWidth="1" />
      ))}
      {/* 軸線 */}
      {labels.map((_, i) => {
        const { x, y } = polarToXY((360 / n) * i, r);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E5E7EB" strokeWidth="1" />;
      })}
      {/* 資料填色區 */}
      <polygon
        points={dataPoints.join(" ")}
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="2"
      />
      {/* 資料點 */}
      {labels.map((_, i) => {
        const val = stats[Object.keys(stats)[i]] / 100;
        const { x, y } = polarToXY((360 / n) * i, r * val);
        return <circle key={i} cx={x} cy={y} r={4} fill={color} />;
      })}
      {/* 標籤 */}
      {labels.map((label, i) => {
        const { x, y } = polarToXY((360 / n) * i, r + 18);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fill="#6B7280"
            fontWeight="bold"
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

  useEffect(() => {
    // 若直接進入此頁（無結果），跳回首頁
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
    const text = `我的早餐人格是「${data.emoji} ${data.name}」！\n核心：${data.core}\n${data.tags.join(" ")}\n\n快來測你是哪種早餐店早餐 🥪🥛`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main
      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
      className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: `linear-gradient(160deg, ${data.bgColor} 0%, #FFF8EE 100%)` }}
      />

      <div
        className="w-full max-w-sm transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
      >
        {/* 結果標題卡 */}
        <div
          className="rounded-3xl px-7 py-8 text-center shadow-xl mb-5"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            border: `2px solid ${data.color}40`,
          }}
        >
          <div className="text-6xl mb-3">{data.emoji}</div>
          <p className="text-xs font-bold tracking-widest mb-1" style={{ color: data.color }}>
            你是
          </p>
          <h1 className="text-3xl font-black text-stone-800 mb-2">{data.name}</h1>
          <p
            className="text-sm font-bold px-4 py-1.5 rounded-full inline-block"
            style={{ background: `${data.color}18`, color: data.color }}
          >
            {data.core}
          </p>
        </div>

        {/* 描述 */}
        <div
          className="rounded-3xl px-7 py-6 shadow-md mb-5"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(8px)",
            border: `1.5px solid ${data.color}25`,
          }}
        >
          <p className="text-sm text-stone-600 leading-7">{data.description}</p>
        </div>

        {/* 標籤 */}
        <div className="flex flex-wrap gap-2 mb-5 px-1">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: `${data.color}15`, color: data.color }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 雷達圖 */}
        <div
          className="rounded-3xl px-7 py-6 shadow-md mb-5 flex flex-col items-center"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(8px)",
            border: `1.5px solid ${data.color}25`,
          }}
        >
          <p className="text-xs font-bold tracking-widest mb-4" style={{ color: data.color }}>
            人格五角形
          </p>
          <RadarChart stats={data.stats} color={data.color} />
          {/* 數值列表 */}
          <div className="w-full mt-4 grid grid-cols-5 gap-1 text-center">
            {Object.entries(data.stats).map(([key, val]) => (
              <div key={key}>
                <div className="text-xs font-black text-stone-700">{val}</div>
                <div className="text-[10px] text-stone-400">{key}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 適合搭配 */}
        <div
          className="rounded-3xl px-7 py-5 shadow-md mb-7 flex items-center gap-4"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(8px)",
            border: `1.5px solid ${data.color}25`,
          }}
        >
          <div className="text-3xl">{data.pairingEmoji}</div>
          <div>
            <p className="text-xs text-stone-400 font-medium">最佳搭配</p>
            <p className="text-base font-black text-stone-800">{data.pairing}</p>
          </div>
        </div>

        {/* 按鈕 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCopy}
            className="w-full py-4 rounded-2xl font-black text-base tracking-wide transition-all duration-200 active:scale-95 shadow-lg text-white"
            style={{ background: `linear-gradient(135deg, ${data.color}, #EA580C)` }}
          >
            {copied ? "已複製 ✅" : "分享結果 📤"}
          </button>
          <button
            onClick={handlePlayAgain}
            className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: `2px solid ${data.color}40`,
              color: data.color,
            }}
          >
            重新測驗 🔄
          </button>
        </div>
      </div>
    </main>
  );
}
