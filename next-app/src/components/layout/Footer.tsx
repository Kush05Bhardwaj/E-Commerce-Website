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
                <Link href="/shop?category=electronics" className="hover:text-brand">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/shop?category=fashion" className="hover:text-brand">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/shop?category=home" className="hover:text-brand">
                  Home & Living
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-slate-900">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/help" className="hover:text-brand">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-brand">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-brand">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand">
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
                <Link href="/privacy" className="hover:text-brand">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-brand">
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
