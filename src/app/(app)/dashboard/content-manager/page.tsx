'use client';

import React, { useState } from 'react';
import { AdminOnly } from '@/components/admin-only';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirebaseApp, useFirestore } from '@/firebase/provider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Loader2, Upload } from 'lucide-react';

export default function ContentManagerPage() {
  const { user, isUserLoading } = useUser();
  const firebaseApp = useFirebaseApp();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [copyrightOwner, setCopyrightOwner] = useState('');
  const [copyrightNote, setCopyrightNote] = useState('All rights reserved. Unauthorized use requires explanation.');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({ title: 'Not signed in', description: 'You must be signed in as admin to upload content.', variant: 'destructive' });
      return;
    }

    if (!file) {
      toast({ title: 'No file', description: 'Please choose a file to upload.', variant: 'destructive' });
      return;
    }

    if (!firebaseApp || !firestore) {
      toast({ title: 'Firebase not ready', description: 'Unable to access backend services.', variant: 'destructive' });
      return;
    }

    try {
      setIsUploading(true);
      const storage = getStorage(firebaseApp);
      const path = `content/${Date.now()}_${file.name}`;
      const sRef = storageRef(storage, path);
      const uploadTask = uploadBytesResumable(sRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(pct);
      });

      await uploadTask;
      const downloadURL = await getDownloadURL(sRef);

      // Save metadata to Firestore
      const col = collection(firestore, 'content');
      await addDoc(col, {
        title,
        description,
        copyrightOwner,
        copyrightNote,
        fileUrl: downloadURL,
        storagePath: path,
        uploaderId: user.uid,
        copyrighted: true,
        createdAt: serverTimestamp(),
      });

      toast({ title: 'Uploaded', description: 'File uploaded and content record created.', variant: 'default' });
      // reset
      setTitle('');
      setDescription('');
      setCopyrightOwner('');
      setFile(null);
      setProgress(0);
    } catch (err) {
      console.error('Upload error', err);
      toast({ title: 'Upload failed', description: 'There was an error uploading the file.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AdminOnly>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">Content Manager</CardTitle>
          <CardDescription>Upload images or other media. All uploads are marked copyrighted.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Image title" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Copyright Owner</label>
              <Input value={copyrightOwner} onChange={(e) => setCopyrightOwner(e.target.value)} placeholder="Owner name or company" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Copyright Note (shown on record)</label>
              <Textarea value={copyrightNote} onChange={(e) => setCopyrightNote(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">File</label>
              <input type="file" accept="image/*" onChange={onFileChange} />
            </div>

            {isUploading && (
              <div className="text-sm">Uploading: {progress}%</div>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={isUploading}>
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminOnly>
  );
}
