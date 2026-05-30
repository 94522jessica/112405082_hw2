"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore, quizData, calcResult, BreakfastType } from "@/store/store";

const OPTION_LABELS = ["A", "B", "C", "D"];
const OPTION_COLORS = [
  { bg: "#FEF9C3", border: "#f9b72b", hover: "#FEF08A" },
  { bg: "#FEF9C3", border: "#f9b72b", hover: "#FEF08A" },
  { bg: "#FEF9C3", border: "#f9b72b", hover: "#FEF08A" },
  { bg: "#FEF9C3", border: "#f9b72b", hover: "#FEF08A" },
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
    // 移除原本強制設定的字體與多餘的 padding，讓版面完全貼合全局 layout
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* ⚠️ 原本的漸層背景 <div> 已經移除，這樣就能透出底層的黃色小魚背景了 */}

      {/* 題目卡片：套用首頁同款盤子造型 */}
      <div
        className="w-[95%] max-w-[550px] aspect-square flex flex-col items-center justify-center text-center p-6 sm:p-10 relative transition-all duration-300"
        style={{
          backgroundImage: "url('/plate.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-[400px] flex flex-col items-center">
          
          {/* 進度標示 (改為精緻的文字風格，搭配盤子質感) */}
          <p className="text-xs sm:text-sm font-bold tracking-widest text-amber-800/80 mb-2 sm:mb-4 uppercase">
            Question {questionIndex + 1} / {quizData.length}
          </p>

          {/* 題目文字 */}
          <h2 className="text-lg sm:text-2xl font-black text-amber-950 leading-snug mb-4 sm:mb-6">
            {current.title}
          </h2>

          {/* 選項區域：縮小寬度比例以免碰到盤子邊緣 */}
          <div className="flex flex-col gap-2 sm:gap-3 w-[80%] sm:w-[70%]">
            {current.options.map((opt, i) => {
              const col = OPTION_COLORS[i];
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  // 調整 padding 讓四個按鈕在小螢幕也能剛好塞進盤子
                  className="w-full text-left rounded-2xl px-4 py-3 sm:py-4 flex items-center gap-3 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md hover:scale-[1.02]"
                  style={{
                    background: isSelected ? col.border : col.bg,
                    border: `2px solid ${isSelected ? col.border : "transparent"}`,
                    transform: isSelected ? "scale(0.97)" : "scale(1)",
                  }}
                >
                  {/* 選項字母 A, B, C, D */}
                  <span
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs sm:text-sm font-black text-white shadow-sm"
                    style={{ background: col.border }}
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  
                  {/* 選項文字 */}
                  <span className={`text-sm sm:text-base font-bold ${isSelected ? "text-white" : "text-amber-950"}`}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </main>
  );
}
