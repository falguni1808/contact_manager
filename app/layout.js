import Providers from '@/lib/providers';

export const metadata = {
  title: 'Contact App',
  description: 'Manage contacts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

