"use client";

import { useMemo, useState } from "react";

export default function AboutPage() {
  const quotes = useMemo(
    () => [
      "“Time spent with cats is never wasted.” — Sigmund Freud",
      "“In ancient times cats were worshipped as gods; they have not forgotten this.” — Terry Pratchett",
      "“Cats choose us; we don’t own them.” — Kristin Cast",
      "“A cat will do what it wants, when it wants.” — Unknown",
      "“Cats are connoisseurs of comfort.” — James Herriot",
    ],
    []
  );

  const [quote, setQuote] = useState("");

  function newQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(q);
  }

  return (
    <main className="container">
      <header className="pageHeader">
        <div>
          <h1 className="title">About 🐱</h1>
          <p className="subtitle">
            The Cat Library is a cozy modern website for cat lovers who enjoy books.
          </p>
          <p className="subtitle" style={{ marginTop: 10 }}>
            Add your own covers inside <code className="inlineCode">public/covers</code> and update the Books page.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="statRow">
        <div className="statCard">
          <div className="statBig">100%</div>
          <div className="statSmall">Cat approved</div>
        </div>
        <div className="statCard">
          <div className="statBig">0</div>
          <div className="statSmall">Ads forever</div>
        </div>
        <div className="statCard">
          <div className="statBig">∞</div>
          <div className="statSmall">Cozy vibes</div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="panel">
        <div className="panelHead">
          <h2 className="h2">Our mission</h2>
          <p className="muted">A tiny library made to feel warm and fun.</p>
        </div>

        <div className="miniGrid">
          <div className="miniCard lift">
            <div className="miniTitle">Curate</div>
            <div className="miniSub">Collect great cat books and organize them by category.</div>
          </div>
          <div className="miniCard lift">
            <div className="miniTitle">Discover</div>
            <div className="miniSub">Find books using search, filters, and related suggestions.</div>
          </div>
          <div className="miniCard lift">
            <div className="miniTitle">Enjoy</div>
            <div className="miniSub">Micro-animations, simple borrowing, and cozy design.</div>
          </div>
        </div>
      </section>

      {/* Quote Generator */}
      <section className="panel">
        <div className="panelHead">
          <h2 className="h2">Cat quote generator</h2>
          <p className="muted">Press the button for a random cat quote.</p>
        </div>

        <div className="factRow" style={{ marginTop: 12 }}>
          <button className="btn" type="button" onClick={newQuote}>
            Give me a cat quote
          </button>

          {quote && <div className="factBox animSlide">{quote}</div>}
        </div>
      </section>
    </main>
  );
}
