"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const books = [
  // Care
  {
    title: "Think Like a Cat",
    author: "Pam Johnson-Bennett",
    cover: "/covers/think-like-a-cat.jpg",
    tag: "Behavior",
    category: "Care",
    created: "2011",
    summary:
      "A practical guide to understanding cat behavior and solving common problems with routines, enrichment, and communication.",
  },
  {
    title: "Total Cat Mojo",
    author: "Jackson Galaxy (with Mikel Delgado, PhD)",
    cover: "/covers/total-cat-mojo.jpg",
    tag: "Care + Behavior",
    category: "Care",
    created: "2017",
    summary:
      "A full-life guide for cats—confidence, routines, enrichment, and common behavior challenges—built around what cats naturally need.",
  },

  // Training
  {
    title: "The Trainable Cat",
    author: "John Bradshaw & Sarah Ellis",
    cover: "/covers/the-trainable-cat.jpg",
    tag: "Training",
    category: "Training",
    created: "2017",
    summary:
      "Shows how training can reduce stress and improve daily life—like vet visits, introductions, and adjusting to new situations.",
  },

  // Science
  {
    title: "Cat Sense",
    author: "John Bradshaw",
    cover: "/covers/cat-sense.jpg",
    tag: "Science",
    category: "Science",
    created: "2013",
    summary:
      "Explores what research tells us about how cats think, communicate, and behave—and how humans can live better with them.",
  },

  // History
  {
    title: "The Lion in the Living Room",
    author: "Abigail Tucker",
    cover: "/covers/lion-in-the-living-room.jpg",
    tag: "History",
    category: "History",
    created: "2016",
    summary:
      "A fun science-and-history story of how cats spread around the world and shaped their relationship with humans.",
  },

  // Fiction
  {
    title: "The Travelling Cat Chronicles",
    author: "Hiro Arikawa",
    cover: "/covers/travelling-cat-chronicles.jpg",
    tag: "Fiction",
    category: "Fiction",
    created: "2012",
    summary:
      "A warm, emotional journey told through a cat’s perspective as he travels with his owner across Japan meeting old friends.",
  },
  {
    title: "Warriors: Into the Wild",
    author: "Erin Hunter",
    cover: "/covers/into-the-wild.jpg",
    tag: "Fantasy Cats",
    category: "Fiction",
    created: "2003",
    summary:
      "The book that begins the Warriors series—cats living in clans, facing danger, loyalty, and adventure in the wild.",
  },
  {
    title: "The Cat Who Could Read Backwards",
    author: "Lilian Jackson Braun",
    cover: "/covers/cat-who-could-read-backwards.jpg",
    tag: "Mystery",
    category: "Fiction",
    created: "1966",
    summary:
      "A cozy mystery that introduces Qwilleran and his Siamese cat Koko—smart clues, small-town vibes, and feline charm.",
  },

  // Poetry
  {
    title: "Old Possum's Book of Practical Cats",
    author: "T. S. Eliot",
    cover: "/covers/practical-cats.jpg",
    tag: "Poetry",
    category: "Poetry",
    created: "1939",
    summary:
      "A classic collection of whimsical poems about cats—playful, clever, and the inspiration behind the musical 'Cats'.",
  },
];

// -------- Confetti helpers (no libraries) --------
function makeConfetti(count = 28) {
  const pieces = [];
  for (let i = 0; i < count; i++) {
    pieces.push({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100, // vw
      size: 6 + Math.random() * 8, // px
      drift: (Math.random() * 2 - 1) * 18, // px sideways
      delay: Math.random() * 0.08, // sec
      duration: 0.75 + Math.random() * 0.55, // sec
      rot: Math.floor(Math.random() * 360),
    });
  }
  return pieces;
}

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  // Borrow state
  const [borrowed, setBorrowed] = useState([]);

  // Modal state
  const [activeBook, setActiveBook] = useState(null);

  // Confetti + bounce
  const [confetti, setConfetti] = useState([]);
  const [bounceTitle, setBounceTitle] = useState("");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(books.map((b) => b.category)));
    return ["All", ...unique];
  }, []);

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return books.filter((b) => {
      const catOk = selectedCategory === "All" ? true : b.category === selectedCategory;
      const qOk =
        q === ""
          ? true
          : b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [selectedCategory, query]);

  function launchConfetti() {
    const pieces = makeConfetti(30);
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 1400);
  }

  function borrowBook(title) {
    if (borrowed.includes(title)) return;

    setBorrowed((prev) => [...prev, title]);
    setMessage(`🎉 Borrowed "${title}" 🐾`);
    setBounceTitle(title);
    launchConfetti();

    setTimeout(() => setMessage(""), 2200);
    setTimeout(() => setBounceTitle(""), 450);
  }

  // ✅ Cancel/Return
  function returnBook(title) {
    setBorrowed((prev) => prev.filter((t) => t !== title));
    setMessage(`↩️ Returned "${title}"`);
    setTimeout(() => setMessage(""), 1800);
  }

  function openModal(book) {
    setActiveBook(book);
  }

  function closeModal() {
    setActiveBook(null);
  }

  const relatedBooks = useMemo(() => {
    if (!activeBook) return [];
    return books
      .filter(
        (b) =>
          b.title !== activeBook.title &&
          (b.category === activeBook.category || b.tag === activeBook.tag)
      )
      .slice(0, 3);
  }, [activeBook]);

  return (
    <main className="container">
      {/* Confetti overlay */}
      {confetti.length > 0 && (
        <div className="confettiWrap" aria-hidden="true">
          {confetti.map((p) => (
            <span
              key={p.id}
              className="confettiPiece"
              style={{
                left: `${p.left}vw`,
                width: `${p.size}px`,
                height: `${p.size * 1.6}px`,
                transform: `rotate(${p.rot}deg)`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                ["--drift"]: `${p.drift}px`,
              }}
            />
          ))}
        </div>
      )}

      <header className="pageHeader booksHeader">
        <div>
          <h1 className="title">Cat Book Collection 🐾</h1>
          <p className="subtitle">
            Real cat books — search, filter, borrow, and open Description.
          </p>
        </div>

        <div className="controls booksControls">
          <div className="searchWrap">
            <input
              className="inputModern"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title or author..."
              aria-label="Search books"
            />
            {query && (
              <button
                className="iconBtn"
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <select
            className="selectModern"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </header>

      {message && <div className="toast toastAnim">{message}</div>}

      {filteredBooks.length === 0 ? (
        <div className="emptyState">
          <div className="emptyTitle">No books found</div>
          <div className="muted">Try a different search or category.</div>
          <button
            className="btn ghostBtn"
            type="button"
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
          >
            Reset
          </button>
        </div>
      ) : (
        <section className="grid">
          {filteredBooks.map((book) => {
            const isBorrowed = borrowed.includes(book.title);
            const bounce = bounceTitle === book.title;

            return (
              <article
                key={book.title}
                className={`card cardInteractive ${isBorrowed ? "cardBorrowed" : ""}`}
              >
                <div className="coverWrap">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="tag">{book.tag}</span>
                </div>

                <div className="cardBody">
                  <h3 className={`bookTitle ${bounce ? "pop" : ""}`}>{book.title}</h3>
                  <p className="bookAuthor">{book.author}</p>

                  <div className="cardBtns">
                    {!isBorrowed ? (
                      <button
                        className="btn"
                        type="button"
                        onClick={() => borrowBook(book.title)}
                      >
                        Borrow
                      </button>
                    ) : (
                      <button
                        className="btn btnDisabled"
                        type="button"
                        onClick={() => returnBook(book.title)}
                        title="Cancel / return this book"
                      >
                        Return ✕
                      </button>
                    )}

                    <button
                      className="btn ghostBtn"
                      type="button"
                      onClick={() => openModal(book)}
                    >
                      Description
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* MODAL */}
      {activeBook && (
        <div className="modalOverlay" role="dialog" aria-modal="true">
          <div className="modalCard">
            <button
              className="modalClose"
              onClick={closeModal}
              type="button"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="modalGrid">
              <div className="modalCover">
                <Image
                  src={activeBook.cover}
                  alt={activeBook.title}
                  fill
                  className="cover"
                  sizes="(max-width: 800px) 100vw, 360px"
                />
              </div>

              <div className="modalBody">
                <div className="modalTagRow">
                  <span className="tag">{activeBook.tag}</span>
                  <span className="modalMeta">Published: {activeBook.created}</span>
                </div>

                <h2 className="modalTitle">{activeBook.title}</h2>
                <p className="modalAuthor">{activeBook.author}</p>

                <p className="modalSummary">{activeBook.summary}</p>

                {relatedBooks.length > 0 && (
                  <>
                    <div className="modalSectionTitle">Related books</div>
                    <div className="relatedList">
                      {relatedBooks.map((b) => (
                        <button
                          key={b.title}
                          className="relatedItem"
                          type="button"
                          onClick={() => openModal(b)}
                        >
                          <span className="relatedName">{b.title}</span>
                          <span className="relatedSub">{b.category}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <div className="modalActions">
                  {!borrowed.includes(activeBook.title) ? (
                    <button
                      className="btn"
                      type="button"
                      onClick={() => borrowBook(activeBook.title)}
                    >
                      Borrow
                    </button>
                  ) : (
                    <button
                      className="btn btnDisabled"
                      type="button"
                      onClick={() => returnBook(activeBook.title)}
                    >
                      Return ✕
                    </button>
                  )}

                  <button className="btn ghostBtn" type="button" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>

            <div className="modalHint muted">
              Tip: tap a “Related book” to switch instantly ✨
            </div>
          </div>

          {/* Click outside to close */}
          <button className="modalBackdropBtn" onClick={closeModal} aria-label="Close modal" />
        </div>
      )}
    </main>
  );
}
