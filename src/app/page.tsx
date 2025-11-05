'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Lock, Zap } from 'lucide-react';

export default function Home() {
  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-48 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px]" />
          
          <div className="container relative px-4 md:px-6 mx-auto">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              {/* Left Column - Content */}
              <div className="flex flex-col justify-center space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span>AI-Powered Protection</span>
                  </div>
                  
                  <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    Your Content, Secured and Showcased
                  </h1>
                  
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[600px]">
                    SecureView provides a platform for creators to protect and monetize their digital media with cutting-edge AI watermarking and a seamless user experience.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button asChild size="lg" className="text-base font-semibold group">
                    <Link href="/dashboard" prefetch={false}>
                      Get Started
                      <Zap className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base font-semibold">
                    <Link href="#features" onClick={scrollToFeatures} prefetch={false}>
                      Learn More
                    </Link>
                  </Button>
                </motion.div>

                {/* Feature Pills */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <span>Military-grade encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                    <span>AI watermarking</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  
                  {/* Lock icon with animation */}
                  <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-primary/20">
                    <Logo className="h-auto w-full max-w-md mx-auto text-primary drop-shadow-2xl" />
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 bg-background border rounded-2xl p-4 shadow-xl"
                  >
                    <Shield className="h-8 w-8 text-primary" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-4 -left-4 bg-background border rounded-2xl p-4 shadow-xl"
                  >
                    <Sparkles className="h-8 w-8 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Why Choose SecureView?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Powerful features designed to protect your content and grow your business
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: 'Advanced Protection',
                  description: 'Military-grade encryption and AI-powered watermarking keep your content secure.',
                  delay: 0
                },
                {
                  icon: Sparkles,
                  title: 'AI Watermarking',
                  description: 'Invisible watermarks that protect your work without compromising quality.',
                  delay: 0.1
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Process and protect your content in seconds with our optimized pipeline.',
                  delay: 0.2
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  className="group relative bg-background rounded-2xl p-6 border hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
