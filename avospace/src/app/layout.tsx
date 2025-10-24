import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'AvoSpace',
  description: 'A social media platform for avocado lovers.',
};

export default function RootLayout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
          {children}
      </body>
    </html>
  );
}
