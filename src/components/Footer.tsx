import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Jawad Yazbek. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
