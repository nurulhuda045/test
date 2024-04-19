export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-96 m-auto mt-8">
      {children}
    </div>
  );
}
