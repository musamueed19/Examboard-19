import "./globals.css";

export const metadata = {
  title: "ExamBoard - EMS",
  description: "ExamBoard Management System (EMS)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
