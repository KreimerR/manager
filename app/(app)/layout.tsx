import Header from "@/components/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />

      <div>
        {children}
      </div>
    </div>
  );
}
