'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-brand">MERN Commerce</h3>
            <p className="mt-4 text-sm text-slate-600">
              Your one-stop shop for premium products. Built with Next.js and
              modern technologies.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 transition-colors hover:text-brand"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 transition-colors hover:text-brand"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 transition-colors hover:text-brand"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-slate-600 transition-colors hover:text-brand"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-slate-900">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/shop" className="hover:text-brand">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-brand">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-brand">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-slate-900">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/support/help" className="hover:text-brand">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support/shipping" className="hover:text-brand">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/support/returns" className="hover:text-brand">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/support/contact" className="hover:text-brand">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-900">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/legal/privacy" className="hover:text-brand">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-brand">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="hover:text-brand">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-600">
          <p>
            © {currentYear} MERN Commerce. All rights reserved. Built with
            Next.js 15 & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
};
