import { ChatWidget } from '@poc/chat-widget';

export default function Home() {
  return <main className="page-shell"><div className="topbar"><div className="brand-mark">Q</div><div><strong>Qcells Support</strong><span>Customer assistance portal</span></div><div className="topbar-right"><span className="status-dot" /> POC environment</div></div><section className="intro"><div><p className="eyebrow">CUSTOMER SUPPORT</p><h1>How can we help?</h1><p className="intro-copy">Browse recent conversations or start a new message with our support team.</p></div><div className="intro-icon">✳</div></section><ChatWidget /></main>;
}
