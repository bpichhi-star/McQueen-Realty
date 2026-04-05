import './globals.css';

export const metadata = {
  title: 'McQueen Realty | Luxury Real Estate',
  description: 'Exceptional properties. Unmatched service. McQueen Realty.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
