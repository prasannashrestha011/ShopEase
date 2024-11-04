
import "./globals.css";
import StoreProvider from "./StoreProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Shop Ease</title>
      </head>
      <body
       
      >
        <StoreProvider>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
