"use client";

import { useMemo, useState } from "react";

export default function HomePage() {
  const moods = useMemo(
    () => [
      { key: "cozy", label: "Cozy 😴", desc: "Soft stories for quiet nights." },
      { key: "funny", label: "Funny 😹", desc: "Silly cat tales and laughs." },
      { key: "learn", label: "Learn 📚", desc: "Care tips, behavior, facts." },
      { key: "adventure", label: "Adventure 🐾", desc: "Brave cats and big quests." },
    ],
    []
  );

  const picksByMood = useMemo(
    () => ({
      cozy: [
        { title: "Cozy Cat Stories", sub: "Warm & relaxing tales" },
        { title: "Paws & Pages", sub: "Gentle bedtime reads" },
        { title: "Midnight Meow Tales", sub: "Quiet-night mysteries" },
      ],
      funny: [
        { title: "Meow Laugh Club", sub: "Cats doing chaos" },
        { title: "The Silly Cat Handbook", sub: "Jokes + cute moments" },
        { title: "Cats Being Cats", sub: "Ridiculous and real" },
      ],
      learn: [
        { title: "Understanding Your Cat", sub: "Body language & behavior" },
        { title: "Cat Care Essentials", sub: "Daily routines & health" },
        { title: "Amazing Cat Facts", sub: "Science & trivia" },
      ],
      adventure: [
        { title: "Whisker Warriors", sub: "Big quests, brave cats" },
        { title: "The Cat Explorer", sub: "Maps, travel, wonder" },
        { title: "Kittens of the Kingdom", sub: "Fantasy & friendship" },
      ],
    }),
    []
  );

  const facts = useMemo(
    () => [
      "Cats can sleep 12–16 hours a day 😴",
      "Slow blinking is a cat’s way of saying “I trust you.”",
      "Whiskers help cats sense space and movement.",
      "Cats communicate a lot with tail position.",
      "Purring can be calming for humans too.",
    ],
    []
  );

  const [mood, setMood] = useState("cozy");
  const [fact, setFact] = useState("");
  const [factKey, setFactKey] = useState(0); // re-triggers animation

  function newFact() {
    const random = facts[Math.floor(Math.random() * facts.length)];
    setFact(`🐾 ${random}`);
    setFactKey((k) => k + 1);
  }

  const moodDesc = moods.find((m) => m.key === mood)?.desc;

  return (
    <main className="container">
      {/* HERO */}
      <section className="homeHero">
        <div className="homeHeroInner">
          <div>
            <div className="kicker">🐱 The Cat Library</div>
            <h1 className="homeTitle">
              Welcome to The Cat Library <span className="paw">🐾</span>
            </h1>
            <p className="homeSub">
              Pick a mood, discover a shelf, and get a cat fact — make your library feel alive.
            </p>

            <div className="homeActions">
              <a className="primaryLink" href="/books">Browse Cat Books</a>
              <a className="secondaryLink" href="/about">About</a>
            </div>
          </div>

          <div className="heroStat">
            <div className="heroStatTitle">Today’s vibe</div>
            <div className="heroStatBig">{moods.find((m) => m.key === mood)?.label}</div>
            <div className="heroStatSmall">{moodDesc}</div>
          </div>
        </div>
      </section>

      {/* MOOD PICKER */}
      <section className="panel">
        <div className="panelHead">
          <h2 className="h2">Choose your reading mood</h2>
          <p className="muted">Click a mood to change recommendations.</p>
        </div>

        <div className="chips">
          {moods.map((m) => (
            <button
              key={m.key}
              className={`chip ${mood === m.key ? "chipActive" : ""}`}
              onClick={() => setMood(m.key)}
              type="button"
            >
              {m.label}
            </button>
          ))}
        </div>

        <p className="muted" style={{ marginTop: 12 }}>{moodDesc}</p>

        <div className="miniGrid">
          {picksByMood[mood].map((p) => (
            <div key={p.title} className="miniCard animPop">
              <div className="miniTitle">{p.title}</div>
              <div className="miniSub">{p.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CAT FACT */}
      <section className="panel">
        <div className="panelHead">
          <h2 className="h2">Cat Fact Generator</h2>
          <p className="muted">Press the button for a random cat fact.</p>
        </div>

        <div className="factRow">
          <button className="btn" type="button" onClick={newFact}>
            Give me a cat fact
          </button>

          {fact && (
            <div key={factKey} className="factBox animSlide">
              {fact}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
