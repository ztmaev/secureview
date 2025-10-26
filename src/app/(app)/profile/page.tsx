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
import { Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import Link from 'next/link';
import { MotionImage } from '@/components/ui/animated';

const socialLinks = [
  { href: '#', icon: Twitter, label: 'Twitter' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Github, label: 'GitHub' },
];

export default function ProfilePage() {
  const avatar = PlaceHolderImages.find(p => p.id === 'profile-avatar');
  const projects = PlaceHolderImages.filter(p => p.id.startsWith('project-'));
  const media = PlaceHolderImages.filter(p => p.id.startsWith('media-'));

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary">
            {avatar && <AvatarImage src={avatar.imageUrl} alt="Profile" data-ai-hint={avatar.imageHint} />}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-headline font-bold">Client Name</h1>
            <p className="text-muted-foreground">Content Creator | Visionary | Innovator</p>
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              {socialLinks.map(social => (
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
              <p>
                Welcome to my digital space. I am a passionate creator dedicated to pushing the boundaries of digital media and storytelling. My work explores the intersection of technology, art, and human experience. 
              </p>
              <p>
                With a background in visual arts and computer science, I strive to create engaging content that inspires and provokes thought. This platform serves as a central hub for all my projects, visions, and achievements.
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">My Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                My vision is to build a community around authentic and high-quality content, protected from unauthorized use. I believe in empowering creators by providing tools and platforms that respect their work and offer clear paths to monetization. SecureView is the first step towards this goal, ensuring that every piece of content is valued and secured.
              </p>
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
                        <li>Forbes 30 Under 30</li>
                        <li>Digital Creator of the Year 2023</li>
                        <li>1M+ Followers on Social Media</li>
                        <li>Keynote Speaker at VidCon</li>
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
