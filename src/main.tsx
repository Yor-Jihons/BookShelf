import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initI18n, resources } from './i18n/i18n.ts';

async function startApp(){
  // メインプロセスから言語設定を取得
  const locale = await window.interprocessCommunication.getSystemLocale();

  // i18nextの初期化設定に取得した言語を適用
  await initI18n(locale);

  window.interprocessCommunication.initI18nData( resources );

  // レンダリング
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
startApp();
