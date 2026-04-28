"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const saveChoice = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-banner-wrap" role="dialog" aria-live="polite" aria-label="Согласие на cookie">
        <div className="cookie-banner-text">
          Мы используем cookie для анализа посещаемости (Яндекс.Метрика).{" "}
          <a href="/privacy" className="cookie-banner-link">
            Политика конфиденциальности
          </a>
        </div>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-banner-decline" onClick={() => saveChoice("declined")}>
            Отказаться
          </button>
          <button type="button" className="cookie-banner-accept" onClick={() => saveChoice("accepted")}>
            Принять
          </button>
        </div>
      </div>

      <style>{`
        .cookie-banner-wrap {
          position: fixed;
          left: 50%;
          bottom: 20px;
          transform: translateX(-50%);
          width: calc(100% - 24px);
          max-width: 680px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px 16px;
          background: #1d1d1f;
          border-radius: 14px;
          z-index: 9999;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
        }

        .cookie-banner-text {
          color: #f5f5f7;
          font-size: 0.9rem;
          line-height: 1.45;
        }

        .cookie-banner-link {
          color: #7ab8e0;
          text-decoration: none;
        }

        .cookie-banner-link:hover {
          text-decoration: underline;
        }

        .cookie-banner-actions {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .cookie-banner-accept {
          background: #1a3c5e;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 9px 20px;
          cursor: pointer;
        }

        .cookie-banner-decline {
          background: transparent;
          border: 1px solid #3a3a3a;
          color: #6e6e73;
          border-radius: 8px;
          padding: 9px 20px;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .cookie-banner-wrap {
            flex-direction: column;
            align-items: stretch;
          }

          .cookie-banner-actions {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </>
  );
}
