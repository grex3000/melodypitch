'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { List, X } from '@phosphor-icons/react';
import { Button } from '../ui';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-bg-base/80 backdrop-blur-xl border-b border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-gold to-accent-teal flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent-gold/30 transition-shadow duration-300">
              <span className="text-white font-bold text-base">M</span>
            </div>
            <span className="hidden sm:inline text-lg font-semibold text-fg-1">MelodyPitch</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-fg-2 hover:text-fg-1 transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="secondary" size="md" asChild>
              <a href="/login">Sign in</a>
            </Button>
            <Button variant="primary" size="md" asChild>
              <a href="/register">Get started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-bg-surface-1 hover:bg-bg-surface-2 transition-colors text-fg-2 hover:text-fg-1"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X size={24} weight="bold" />
            ) : (
              <List size={24} weight="bold" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-border-subtle"
        >
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block px-4 py-2 text-fg-2 hover:text-fg-1 hover:bg-bg-surface-1 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="secondary" size="md" asChild className="w-full">
                <a href="/login">Sign in</a>
              </Button>
              <Button variant="primary" size="md" asChild className="w-full">
                <a href="/register">Get started</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
