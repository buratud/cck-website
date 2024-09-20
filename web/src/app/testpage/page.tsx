'use client'

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';  // Import the Footer component
import '../globals.css';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Other page content */}

      <Footer />  {/* Add the Footer component */}
    </>
  );
}
