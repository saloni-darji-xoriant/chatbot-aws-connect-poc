'use client';

import { useMemo, useState } from 'react';
import conversationsData from '../data/conversations.json';
import './widget.css';

type Message = { id: string; sender: 'agent' | 'customer'; name: string; time: string; text: string };
type Conversation = { id: string; customer: string; email: string; subject: string; status: string; updatedAt: string; avatar: string; messages: Message[] };

export function ChatWidget() {
  const [conversations, setConversations] = useState<Conversation[]>(conversationsData as Conversation[]);
  const [activeId, setActiveId] = useState(conversationsData[0].id);
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const active = conversations.find((item) => item.id === activeId) ?? conversations[0];
  const filtered = useMemo(() => conversations.filter((item) => `${item.customer} ${item.subject} ${item.id}`.toLowerCase().includes(search.toLowerCase())), [conversations, search]);

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConversations((current) => current.map((chat) => chat.id === activeId ? { ...chat, updatedAt: 'Just now', messages: [...chat.messages, { id: `m-${Date.now()}`, sender: 'customer', name: 'You', time: now, text }] } : chat));
    setDraft('');
  }

  return <section className="chat-widget" aria-label="Customer support chat">
    <aside className="chat-sidebar">
      <div className="sidebar-heading"><div><h2>Conversations</h2><p>{conversations.length} recent chats</p></div><button className="new-chat" title="Start a new chat" onClick={() => { setActiveId(conversations[0].id); setSearch(''); }}>＋</button></div>
      <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search conversations" /></label>
      <div className="conversation-list">{filtered.map((chat) => <button key={chat.id} className={`conversation ${activeId === chat.id ? 'selected' : ''}`} onClick={() => setActiveId(chat.id)}><span className="avatar">{chat.avatar}</span><span className="conversation-info"><span className="conversation-line"><strong>{chat.customer}</strong><small>{chat.updatedAt}</small></span><span className="subject">{chat.subject}</span><span className="conversation-line"><small>{chat.id}</small><span className={`mini-status ${chat.status.toLowerCase()}`}>{chat.status}</span></span></span></button>)}{filtered.length === 0 && <p className="empty-search">No conversations found.</p>}</div>
      <div className="sidebar-footer"><span className="agent-avatar">S</span><span><strong>Support Agent</strong><small>Online</small></span><span className="online-dot" /></div>
    </aside>
    <div className="chat-main">
      <header className="chat-header"><div className="header-person"><span className="avatar large">{active.avatar}</span><div><h3>{active.customer}</h3><p>{active.email}</p></div></div><div className="header-meta"><span className={`mini-status ${active.status.toLowerCase()}`}>{active.status}</span><span className="chat-id">{active.id}</span></div></header>
      <div className="chat-context"><span>Subject</span><strong>{active.subject}</strong></div>
      <div className="messages"><div className="date-divider"><span>Conversation history</span></div>{active.messages.map((message) => <div key={message.id} className={`message-row ${message.sender === 'customer' ? 'mine' : ''}`}><div className="message-content"><span className="message-author">{message.name} <time>{message.time}</time></span><div className="bubble">{message.text}</div></div></div>)}</div>
      <form className="composer" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}><textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Write a message..." rows={2} /><div className="composer-bottom"><span>Press Enter to send · Shift + Enter for a new line</span><button type="submit" disabled={!draft.trim()}>Send message <span>➤</span></button></div></form>
    </div>
  </section>;
}
