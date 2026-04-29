import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const saveChoice = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Согласие на cookie"
      className="fixed bottom-5 left-1/2 z-[10000] flex w-[calc(100%-24px)] max-w-[680px] -translate-x-1/2 flex-col gap-3 rounded-[14px] border border-white/10 bg-[#1d1d1f] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.25)] sm:flex-row sm:items-center sm:justify-between sm:gap-[14px]"
    >
      <p className="text-[0.9rem] leading-[1.45] text-[#f5f5f7]">
        Мы используем cookie для анализа посещаемости (Яндекс.Метрика).{" "}
        <a href="/privacy.html" className="text-[#7ab8e0] hover:underline">
          Политика конфиденциальности
        </a>
      </p>
      <div className="inline-flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-[10px]">
        <button
          type="button"
          className="cursor-pointer rounded-lg border border-[#3a3a3a] bg-transparent px-5 py-[9px] text-[#b8b8be]"
          onClick={() => saveChoice("declined")}
        >
          Отказаться
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-lg border-0 bg-[#1a3c5e] px-5 py-[9px] text-white"
          onClick={() => saveChoice("accepted")}
        >
          Принять
        </button>
      </div>
    </div>
  );
}
