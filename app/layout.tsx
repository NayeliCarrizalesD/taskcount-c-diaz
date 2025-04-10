import './globals.css';

import { GeistSans } from 'geist/font/sans';

let title = 'Intranet MGO QOB OVERSEAS';
let description =
  'Control Interno';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://intranet-mgo-qob.vercel.app/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
