'use client';

import { motion, type Variants } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'fadeIn' | 'slideIn';
  delay?: number;
  duration?: number;
}

const variants: Record<
  NonNullable<AnimatedProps['variant']>,
  (delay: number, duration: number) => Variants
> = {
  fadeIn: (delay, duration) => ({
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  }),
  slideIn: (delay, duration) => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  }),
};

export function Animated({
  variant = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className,
  children,
  ...props
}: AnimatedProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[variant](delay, duration)}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const MotionCard = motion(Card);
import { Card } from './card';

export const MotionImage = motion(Image);
import Image from 'next/image';
