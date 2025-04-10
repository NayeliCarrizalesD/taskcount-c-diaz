/*import './globals.css';

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
};*/

// eslint-disable-next-line react/no-children-prop
// filepath: c:\Program Files\Ampps\www\taskcount-c-diaz\app\protected\layout.tsx
"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { baselightTheme } from "../utils/theme/DefaultColors";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={baselightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}