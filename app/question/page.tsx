"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore, quizData, calcResult, BreakfastType } from "@/store/store";

const OPTION_LABELS = ["A", "B", "C", "D"];
const OPTION_COLORS = [
  { bg: "#FEF9C3", border: "#FDE047", hover: "#FEF08A" },
  { bg: "#FFEDD5", border: "#FB923C", hover: "#FED7AA" },
  { bg: "#FCE7F3", border: "#F472B6", hover: "#FBCFE8" },
  { bg: "#E0F2FE", border: "#38BDF8", hover: "#BAE6FD" },
];

export default function Question() {

  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const addAnswer = usePsyStore((s) => s.addAnswer);
  const setResult = usePsyStore((s) => s.setResult);
  const answers = usePsyStore((s) => s.answers);

  const current = quizData[questionIndex];
  const progress = ((questionIndex) / quizData.length) * 100;

  function handleSelect(optionIndex: number) {
    if (animating || selected !== null) return;
    setSelected(optionIndex);
    setAnimating(true);

    const chosenType = current.options[optionIndex].type as BreakfastType;
    addAnswer(chosenType);

    setTimeout(() => {
      if (questionIndex < quizData.length - 1) {
        setQuestionIndex((i) => i + 1);
        setSelected(null);
        setAnimating(false);
      } else {
        // 最後一題：計算結果
        const allAnswers = [...answers, chosenType];
        const finalResult = calcResult(allAnswers);
        setResult(finalResult);
        router.push("/prepare");
      }
    }, 500);
  }

  return (
    <main
      style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(160deg, #FFF8EE 0%, #FFF3DC 50%, #FFE9C4 100%)" }}
      />

      <div className="w-full max-w-sm">
        {/* 進度列 */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-stone-400 mb-2 font-medium">
            <span>第 {questionIndex + 1} 題</span>
            <span>共 {quizData.length} 題</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #F59E0B, #EA580C)",
              }}
            />
          </div>
        </div>

        {/* 題目卡片 */}
        <div
          className="rounded-3xl px-7 py-8 shadow-xl mb-6"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            border: "2px solid rgba(251,191,36,0.25)",
          }}
        >
          <p className="text-xs font-bold tracking-widest text-amber-500 mb-3">
            Q{questionIndex + 1} / {quizData.length}
          </p>
          <h2 className="text-lg font-black text-stone-800 leading-snug">
            {current.title}
          </h2>
        </div>

        {/* 選項 */}
        <div className="flex flex-col gap-3">
          {current.options.map((opt, i) => {
            const col = OPTION_COLORS[i];
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="w-full text-left rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-200 active:scale-95 shadow-sm"
                style={{
                  background: isSelected ? col.border : col.bg,
                  border: `2px solid ${isSelected ? col.border : "transparent"}`,
                  transform: isSelected ? "scale(0.97)" : "scale(1)",
                }}
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white"
                  style={{ background: col.border }}
                >
                  {OPTION_LABELS[i]}
                </span>
                <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-stone-700"}`}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );

}

