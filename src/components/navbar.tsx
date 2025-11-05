'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b"
    >
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center justify-center gap-2 group" prefetch={false}>
          <Logo className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
          <span className="font-bold text-lg hidden sm:inline-block">SecureView</span>
          <span className="sr-only">SecureView</span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-4">
          <Button variant="ghost" asChild className="font-medium">
            <Link href="/login" prefetch={false}>
              Login
            </Link>
          </Button>
          <Button asChild className="font-medium">
            <Link href="/signup" prefetch={false}>
              Sign Up
            </Link>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
