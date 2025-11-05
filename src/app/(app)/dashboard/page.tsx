'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Twitter, Linkedin, Instagram, Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { MotionImage } from '@/components/ui/animated';
import { useUser } from '@/firebase/provider';
import { useFirestore } from '@/firebase/provider';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';

const socialLinks = [
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Github, label: 'GitHub' },
];

interface UserProfile {
  id: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  bio?: string;
  tagline?: string;
  vision?: string;
  achievements?: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
}

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  
  // Memoize the document reference
  const userDocRef = useMemo(() => {
    if (!user?.uid || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user?.uid, firestore]);
  
  // Fetch user profile from Firestore
  const { data: userProfile, isLoading: isProfileLoading, error: profileError } = useDoc<UserProfile>(userDocRef);
  
  const avatar = PlaceHolderImages.find(p => p.id === 'profile-avatar');
  const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));
  const media = PlaceHolderImages.filter(p => p.id.startsWith('media-'));
  
  const isLoading = isUserLoading || isProfileLoading;
  
  // Get user display information
  const displayName = userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'User';
  const userEmail = userProfile?.email || user?.email || '';
  const photoURL = userProfile?.photoURL || user?.photoURL || avatar?.imageUrl;
  const bio = userProfile?.bio || 'Welcome to my digital space. I am a passionate creator dedicated to pushing the boundaries of digital media and storytelling.';
  const tagline = userProfile?.tagline || 'Content Creator | Visionary | Innovator';
  const vision = userProfile?.vision || 'My vision is to build a community around authentic and high-quality content, protected from unauthorized use.';
  const achievements = userProfile?.achievements || [
    'Forbes 30 Under 30',
    'Digital Creator of the Year 2023',
    '1M+ Followers on Social Media',
    'Keynote Speaker at VidCon'
  ];
  
  // Merge social links with user profile
  const userSocialLinks = socialLinks.map(link => ({
    ...link,
    href: userProfile?.socialLinks?.[link.label.toLowerCase() as keyof typeof userProfile.socialLinks] || link.href
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary">
            {photoURL && <AvatarImage src={photoURL} alt={displayName} />}
            <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-headline font-bold">{displayName}</h1>
            <p className="text-muted-foreground">{tagline}</p>
            {userEmail && <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>}
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              {userSocialLinks.map(social => (
                <Button key={social.label} variant="outline" size="icon" asChild>
                  <Link href={social.href}>
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Biography</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>{bio}</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">My Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>{vision}</p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        {achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Featured Projects</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project.id} className="relative group overflow-hidden rounded-lg">
                <MotionImage 
                    src={project.imageUrl} 
                    alt={project.description} 
                    width={600} 
                    height={400} 
                    className="object-cover w-full h-full" 
                    data-ai-hint={project.imageHint}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-bold">{project.description}</p>
                </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Media Gallery</CardTitle>
          <CardDescription>All media is protected by SecureView.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map(item => (
            <div key={item.id} className="relative aspect-square group overflow-hidden rounded-lg">
                <MotionImage 
                  src={item.imageUrl} 
                  alt={item.description} 
                  width={400} 
                  height={400} 
                  className="object-cover w-full h-full" 
                  data-ai-hint={item.imageHint}
                  whileHover={{ scale: 1.05, filter: 'brightness(0.8)' }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                     <p className="text-white text-xs font-semibold truncate">{item.description}</p>
                </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
