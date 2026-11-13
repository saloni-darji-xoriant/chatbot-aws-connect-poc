import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Support Chat | POC',
  description: 'A standalone chat microfrontend proof of concept',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
