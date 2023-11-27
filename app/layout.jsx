import "../styles/globals.css";

export const metadata = {
  title: "Positions-list app",
  description:
    "A list of positions that can be edited, saved, created, dragged, etc.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-ttSmalls">
        <div className="app">{children}</div>
      </body>
    </html>
  );
}
