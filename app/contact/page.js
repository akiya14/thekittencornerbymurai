"use client";

import { useState } from "react";

export default function ContactPage() {
  const email = "catlibrary@example.com";

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("✅ Email copied!");
      setTimeout(() => setStatus(""), 1800);
    } catch {
      setStatus("❌ Copy failed (try manually).");
      setTimeout(() => setStatus(""), 1800);
    }
  }

  function submitFake(e) {
    e.preventDefault();
    if (!name.trim() || !fromEmail.trim() || !msg.trim()) {
      setStatus("⚠️ Please fill all fields.");
      setTimeout(() => setStatus(""), 1800);
      return;
    }

    setStatus("✅ Message sent! (demo)");
    setName("");
    setFromEmail("");
    setMsg("");
    setTimeout(() => setStatus(""), 2500);
  }

  return (
    <main className="container">
      <header className="pageHeader">
        <div>
          <h1 className="title">Contact</h1>
          <p className="subtitle">
            Want to suggest a cat book or say hi? Send a message 🐾
          </p>

          <div className="contactRow">
            <span className="muted">Email:</span>
            <span className="contactEmail">{email}</span>
            <button className="btn ghostBtn smallBtn" type="button" onClick={copyEmail}>
              Copy
            </button>
          </div>

          {status && <div className="toast toastAnim" style={{ marginTop: 12 }}>{status}</div>}
        </div>
      </header>

      <section className="panel">
        <div className="panelHead">
          <h2 className="h2">Send a message</h2>
          <p className="muted">This is a demo form (no backend yet).</p>
        </div>

        <form className="formGrid" onSubmit={submitFake}>
          <label className="field">
            <span className="fieldLabel">Name</span>
            <input
              className="inputModern"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Email</span>
            <input
              className="inputModern"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="field fieldFull">
            <span className="fieldLabel">Message</span>
            <textarea
              className="inputModern textarea"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Write your message..."
              rows={5}
            />
          </label>

          <div className="fieldFull">
            <button className="btn" type="submit">Send</button>
          </div>
        </form>
      </section>
    </main>
  );
}
