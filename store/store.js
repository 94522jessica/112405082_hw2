// src/store.js
import { create } from 'zustand'

const questionData = [
    {
      title: "麵包師傅要你「靜置 30 分鐘」，你會怎麼做？",
      options:[
        {
          text: "乖乖待著… 然後偷偷膨脹三倍大",
          value: 1
        },
        {
          text: "等個屁！我已經開始發酵狂飆了",
          value: 2
        },
        {
          text: "發…什麼？我忘記了，我睡著了",
          value: 3 
        }
      ]
    },
    {
      title: "當你被放進烤箱時，溫度突然升高，你的反應是？",
      options:[
        {
          text: "啊啊啊啊啊啊！（冒泡炸裂）",
          value: 1
        },
        {
          text: "熱熱熱快翻面！我要烤出最酥脆的皮！",
          value: 2
        },
        {
          text: "我已經放棄掙扎，來吧命運……",
          value: 3 
        }
      ]
    },
    {
      title: "如果你被顧客挑選時被放回去了，你會？",
      options:[
        {
          text: "立刻乾癟五公分，氣到扁掉",
          value: 1
        },
        {
          text: "更用力散發麵包香，讓他後悔！",
          value: 2
        },
        {
          text: "裝死，假裝自己是牛角麵包",
          value: 3 
        }
      ]
    }
];


// 建立 store hook
const usePsyStore = create((set) => ({
    // states and actions
    psyData:{
        score: 0,
        quizData: questionData
    },
    setScore: (score) => set( (state) => ( { psyData: { ...state.psyData, score: score}} )  )

}))


export { usePsyStore }
