import "./kampanye.css";
import AuthProvider from "../../components/AuthProvider";

export const metadata = {
  title: "Dr. Ir. Nurul Hidayat, M.Kom | Calon Dekan FT UNSOED 2026–2030",
  description: "Website visi, misi, program kerja, roadmap, dan aspirasi Dr. Ir. Nurul Hidayat, M.Kom.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
