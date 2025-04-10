import './globals.css';

let title = 'Contadores Carrizales Diaz';
let description =
  'Control Interno';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title: 'Contadores Carrizales Diaz',
    description:
      'Contadores Carrizales Diaz',
  },
  metadataBase: new URL('https://taskcount-c-diaz.vercel.app'),
};

// eslint-disable-next-line react/no-children-prop
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}