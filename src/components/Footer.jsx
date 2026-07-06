import React from 'react';
import Link from 'next/link';
import {LogoFacebook, LogoLinkedin} from '@gravity-ui/icons';
const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 px-6 md:px-16 py-16 mt-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Brand Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Pet<span className="text-rose-500">Adopt</span>
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
            Connecting loving families with pets in need of a forever home. Start your journey of unconditional love today.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Newsletter Section */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">NEWSLETTER</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Subscribe to get adoption stories, pet care tips, and updates on new pets available.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">QUICK LINKS</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-rose-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-rose-500 transition-colors">Find a Pet</Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-rose-500 transition-colors">Success Stories</Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-rose-500 transition-colors">Volunteer</Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">RESOURCES</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="hover:text-rose-500 transition-colors">Adoption FAQ</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-rose-500 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-rose-500 transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">CONTACT US</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="font-medium text-zinc-300">+880 1700 000000</li>
              <li className="hover:text-rose-500 transition-colors">
                <a href="mailto:support@petadopt.com">support@petadopt.com</a>
              </li>
              <li className="text-zinc-500 text-xs mt-2 leading-relaxed">
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-900 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-zinc-500">
          <p className="text-xs">
            &copy; 2026 PetAdopt. Built with love for animals. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-4 md:mt-0 text-zinc-400 text-base">
            <a href="#" className="hover:text-rose-500 transition-colors" title="Facebook">
              <LogoFacebook/>
            </a>
            <a href="#" className="hover:text-rose-500 transition-colors" title="linkedin">
              <LogoLinkedin/>
            </a>
            <a href="#" className="hover:text-rose-500 transition-colors" title="Twitter">
              X
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;