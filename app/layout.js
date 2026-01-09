import "./globals.css";

export const metadata = {
  title: "The Cat Book Library",
  description: "A modern collection of cat books.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="topbarInner">
            <a className="logo" href="/">🐱 The Cat Library</a>

            <nav className="navlinks">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/books">Books</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
