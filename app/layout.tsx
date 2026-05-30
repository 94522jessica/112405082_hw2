import type { Metadata } from "next";
// 1. 將原本的 Noto_Sans_TC 改成 Noto_Serif_TC
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google"; 
import "./globals.css";
import Image from "next/image";

// 2. 初始化思源宋體，並設定你需要的字重 (例如 400一般, 700粗體, 900極粗)
const notoSerif = Noto_Serif_TC({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"] 
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "早餐店人格測驗",
  description: "快來測你是哪種早餐店早餐",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 3. 將原本的 noto.className 改成 notoSerif.className */}
      <body 
        className={`${notoSerif.className} h-full w-full relative overflow-hidden`}
        style={{
          backgroundImage: "url('/fish-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#FDF5E6" 
        }}
      >
        
        {/* ================= 裝飾早餐圖案 (大螢幕顯示) ================= */}
        
        {/* 1. 左上：鐵板麵 */}
        <div className="absolute top-[20%] left-[5%] z-0 animate-sway pointer-events-none hidden xl:block" style={{ animationDelay: '0s' }}>
          <Image src="/food-teppanyaki.png" alt="鐵板麵" width={180} height={180} className="opacity-90 drop-shadow-md hover:scale-110 transition-transform" />
        </div>

        {/* 2. 左中：薯餅蛋餅 */}
        <div className="absolute top-[35%] left-[20%] z-0 animate-sway pointer-events-none hidden xl:block" style={{ animationDelay: '0.7s' }}>
          <Image src="/food-crepe.png" alt="薯餅蛋餅" width={160} height={160} className="opacity-90 drop-shadow-md" />
        </div>

        {/* 3. 左下：大冰奶 */}
        <div className="absolute bottom-[20%] left-[6%] z-0 animate-sway pointer-events-none hidden xl:block" style={{ animationDelay: '1.2s' }}>
          <Image src="/food-milktea.png" alt="大冰奶" width={130} height={130} className="opacity-90 drop-shadow-md" />
        </div>

        {/* 4. 右上：奶酥厚片 */}
        <div className="absolute top-[22%] right-[7%] z-0 animate-sway pointer-events-none hidden xl:block" style={{ animationDelay: '0.4s' }}>
          <Image src="/food-toast.png" alt="奶酥厚片" width={170} height={170} className="opacity-90 drop-shadow-md" />
        </div>

        {/* 5. 右下：雞塊拼盤 */}
        <div className="absolute bottom-[20%] right-[12%] z-0 animate-sway pointer-events-none hidden xl:block" style={{ animationDelay: '0.9s' }}>
          <Image src="/food-nugget.png" alt="雞塊拼盤" width={220} height={220} className="opacity-90 drop-shadow-md" />
        </div>

        {/* ================= 中央測驗內容區 ================= */}
        <div className="h-full flex justify-center w-full p-4 relative z-10 overflow-y-auto">
          <div className="max-w-[800px] w-full min-h-full py-4 flex flex-col">
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}