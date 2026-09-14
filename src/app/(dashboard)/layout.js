import "./dashboard.css";
import AuthProvider from "../../components/AuthProvider";

export const metadata = {
  title: "Command Center | FT UNSOED",
  description: "Dashboard pimpinan terpusat FT UNSOED.",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
