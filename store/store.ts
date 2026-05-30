// src/store.js
import { create } from "zustand";

export type BreakfastType = "薯餅蛋餅" | "雞塊拼盤" | "奶酥厚片" | "鐵板麵" | "大冰奶";

export type QuizOption = {
  text: string;
  type: BreakfastType;
};

export type QuizQuestion = {
  title: string;
  options: QuizOption[];
};

export type ResultData = {
  emoji: string;
  name: BreakfastType;
  core: string;
  description: string;
  tags: string[];
  pairing: string;
  pairingEmoji: string;
  stats: {
    社交力: number;
    情緒感知: number;
    穩定度: number;
    行動力: number;
    內耗值: number;
  };
  color: string;       // 主題色
  bgColor: string;     // 背景色
};

// ─── 題目資料 ────────────────────────────────────────────────
export const quizData: QuizQuestion[] = [
  {
    title: "如果今天突然放假，你最想？",
    options: [
      { text: "躺回床上繼續睡", type: "薯餅蛋餅" },
      { text: "找朋友出去玩", type: "雞塊拼盤" },
      { text: "自己去咖啡廳放空", type: "奶酥厚片" },
      { text: "把拖延很久的事情一次做完", type: "鐵板麵" },
    ],
  },
  {
    title: "在朋友群裡，你通常是？",
    options: [
      { text: "氣氛擔當", type: "雞塊拼盤" },
      { text: "突然消失又突然出現的人", type: "大冰奶" },
      { text: "最會照顧大家情緒的人", type: "奶酥厚片" },
      { text: "負責規劃行程的人", type: "鐵板麵" },
    ],
  },
  {
    title: "面對壓力時，你會⋯⋯？",
    options: [
      { text: "先耍廢再說", type: "薯餅蛋餅" },
      { text: "假裝沒事繼續撐", type: "大冰奶" },
      { text: "emo 然後聽歌", type: "奶酥厚片" },
      { text: "開始進入高效率模式", type: "鐵板麵" },
    ],
  },
  {
    title: "你最怕別人覺得你⋯⋯？",
    options: [
      { text: "很無聊", type: "雞塊拼盤" },
      { text: "不可靠", type: "大冰奶" },
      { text: "不被需要", type: "奶酥厚片" },
      { text: "沒能力", type: "鐵板麵" },
    ],
  },
];

// ─── 結果資料 ─────────────────────────────────────────────────
export const resultData = {
  薯餅蛋餅: {
    name: "薯餅蛋餅",
    image: "/food-crepe.png",         // 新增：自己的去背圖
    pairingImage: "/food-nugget.png", // 新增：配對餐點的去背圖
    core: "先舒服，才能面對人生。",
    description:
      "你的人生信仰很簡單：能躺就不要站，能晚點做就不要現在做。你不是沒有夢想，只是每天都在和疲憊戰鬥。你討厭太複雜的人際關係，也不喜歡高壓競爭。你其實很會照顧別人，只是首先要確保：自己今天還活得下去。你像薯餅蛋餅一樣——外表看起來普通，但真正懂的人，都知道這是早餐店最頂的存在。",
    tags: ["#低電量人格", "#慢熱系生物", "#拖延症晚期", "#舒服最重要"],
    pairing: "雞塊拼盤",
    pairingEmoji: "🍗",
    stats: { 社交力: 60, 情緒感知: 70, 穩定度: 85, 行動力: 40, 內耗值: 50 },
    color: "#D97706",
    bgColor: "#FFFBEB",
  },
  雞塊拼盤: {
    name: "雞塊拼盤",
    image: "/food-nugget.png",
    pairingImage: "/food-crepe.png",
    core: "氣氛不能冷掉。",
    description:
      "你是人群裡最容易被注意到的人。只要場面一尷尬，你就會自動開啟搞笑模式。你喜歡熱鬧、喜歡陪伴、喜歡大家一起笑到瘋掉。很多人都覺得有你在真的很好玩。但其實你很怕孤單。你總是努力讓大家開心，因為你害怕安靜下來後，沒有人會留下。你的人生像雞塊拼盤：熱量很高，快樂也很高。",
    tags: ["#社交悍匪", "#聚會發起人", "#越難過越愛講幹話"],
    pairing: "薯餅蛋餅",
    stats: { 社交力: 95, 情緒感知: 60, 穩定度: 45, 行動力: 75, 內耗值: 65 },
    color: "#EA580C",
    bgColor: "#FFF7ED",
  },
  奶酥厚片: {
    name: "奶酥厚片",
    image: "/food-toast.png",
    pairingImage: "/food-teppanyaki.png",
    core: "我只是想被真正理解。",
    description:
      "你是一個情緒非常細膩的人。別人隨口一句話，你可能會記很久。你很會觀察氣氛、察覺情緒、照顧別人的感受。但相對地，你也很容易內耗。很多時候你不是不快樂，只是太容易胡思亂想。你其實比任何人都溫柔，只是很少有人真正懂你。你像奶酥厚片：外表安靜普通，但裡面甜得很深。",
    tags: ["#高敏感人格", "#腦內小劇場", "#戀愛腦候選人"],
    pairing: "鐵板麵",
    stats: { 社交力: 40, 情緒感知: 95, 穩定度: 35, 行動力: 45, 內耗值: 98 },
    color: "#B45309",
    bgColor: "#FEFCE8",
  },
  鐵板麵: {
    name: "鐵板麵",
    image: "/food-teppanyaki.png",
    pairingImage: "/food-toast.png",
    core: "再亂，我都能撐住。",
    description:
      "你是典型的壓力型人格。越忙、越亂、越緊急，你反而越冷靜。很多人依賴你，因為你總是能把事情處理好。你很有責任感，也很容易把所有壓力扛在自己身上。你不太擅長求救，因為你早就習慣自己處理一切。你的人生像鐵板麵：看起來混亂，但其實一直都在控制之中。",
    tags: ["#deadline戰神", "#責任感過重", "#高壓生存專家"],
    pairing: "奶酥厚片",
    stats: { 社交力: 55, 情緒感知: 50, 穩定度: 80, 行動力: 95, 內耗值: 60 },
    color: "#7C3AED",
    bgColor: "#F5F3FF",
  },
  大冰奶: {
    name: "大冰奶",
    image: "/food-milktea.png",
    pairingImage: "/food-crepe.png",
    core: "雖然快瘋了，但還活著。",
    description:
      "你的精神狀態有點危險，但非常真實。你的人生日常包括：熬夜、拖延、已讀忘記回、說要重啟人生，然後明天繼續一樣。你是靠意志力硬撐的人類奇蹟。很多人覺得你很瘋，但你其實只是太累了。你像大冰奶：大家都知道有風險，但還是會忍不住選。",
    tags: ["#精神狀態美麗", "#早餐店都市傳說", "#活著全靠意志力"],
    pairing: "薯餅蛋餅",
    stats: { 社交力: 20, 情緒感知: 85, 穩定度: 5, 行動力: 15, 內耗值: 100 },
    color: "#0891B2",
    bgColor: "#F0F9FF",
  },
};

// ─── 計算結果邏輯 ─────────────────────────────────────────────
const tiebreakOrder: BreakfastType[] = ["鐵板麵", "大冰奶", "奶酥厚片", "雞塊拼盤", "薯餅蛋餅"];

export function calcResult(answers: BreakfastType[]): BreakfastType {
  const count: Partial<Record<BreakfastType, number>> = {};
  for (const a of answers) count[a] = (count[a] ?? 0) + 1;
  const maxCount = Math.max(...Object.values(count as Record<string, number>));
  const tied = tiebreakOrder.filter((t) => (count[t] ?? 0) === maxCount);
  return tied[0];
}

// ─── Zustand Store ────────────────────────────────────────────
type PsyStore = {
  answers: BreakfastType[];
  result: BreakfastType | null;
  addAnswer: (type: BreakfastType) => void;
  setResult: (type: BreakfastType) => void;
  reset: () => void;
};

export const usePsyStore = create<PsyStore>((set) => ({
  answers: [],
  result: null,
  addAnswer: (type) => set((s) => ({ answers: [...s.answers, type] })),
  setResult: (type) => set({ result: type }),
  reset: () => set({ answers: [], result: null }),
}));