import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Gery Jonathan Portfolio",
  description: "Personal portfolio with AI chatbot assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}   {/* this renders page content like homepage */}
        <ChatWidget /> {/* floating chatbot widget */}
      </body>
    </html>
  );
}
