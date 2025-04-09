import './globals.css';
import RootLayout from './protected/layout';

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
<RootLayout children={undefined}/>