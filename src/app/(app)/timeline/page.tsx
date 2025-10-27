'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useMemoFirebase, useFirestore } from '@/firebase/provider';
import { collection, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Briefcase, FileText, Loader2, CalendarCheck, CalendarClock, CalendarPlus } from 'lucide-react';

interface EventItem {
  id: string;
  eventType: 'new_project' | 'new_proposal';
  title: string;
  description: string;
  timestamp: string;
  startDate?: string;
  endDate?: string;
}

const EventCard = ({ event }: { event: EventItem }) => {
  const Icon = event.eventType === 'new_project' ? Briefcase : FileText;
  const typeLabel = event.eventType === 'new_project' ? 'Project' : 'Proposal';
  
  const getStatus = () => {
    if (!event.startDate) return { text: 'Upcoming', color: 'text-blue-500' };
    const now = new Date();
    const start = new Date(event.startDate);
    const end = event.endDate ? new Date(event.endDate) : null;

    if (end && now > end) return { text: 'Completed', color: 'text-green-500' };
    if (now >= start) return { text: 'Ongoing', color: 'text-yellow-500' };
    return { text: 'Upcoming', color: 'text-blue-500' };
  };

  const status = getStatus();

  return (
    <Card className="flex items-start gap-4 p-4">
       <div className={`p-2 bg-accent rounded-full mr-2`}>
         <Icon className={`h-5 w-5 text-primary`} />
       </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs text-muted-foreground">{typeLabel}</p>
                <h3 className="font-semibold">{event.title}</h3>
            </div>
            <p className={`text-xs font-medium ${status.color}`}>{status.text}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
        <div className="text-xs text-muted-foreground mt-2 space-y-1">
            {event.startDate && 
                <p>
                    <span className="font-semibold">Start: </span> 
                    {new Date(event.startDate).toLocaleDateString()}
                </p>
            }
            {event.endDate && 
                <p>
                    <span className="font-semibold">End: </span>
                    {new Date(event.endDate).toLocaleDateString()}
                </p>
            }
        </div>
      </div>
    </Card>
  );
};

const EventList = ({ events, isLoading }: { events: EventItem[] | null, isLoading: boolean }) => {
    if (isLoading) {
        return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    if (!events || events.length === 0) {
        return <p className="text-muted-foreground text-center p-8">No items found.</p>;
    }

    return (
        <div className="space-y-4">
            {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
    );
}

export default function TimelinePage() {
    const firestore = useFirestore();

    const ongoingQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(
            collection(firestore, 'website_updates'),
            where('startDate', '<=', new Date().toISOString()),
            orderBy('startDate', 'desc')
        );
    }, [firestore]);

    const upcomingQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(
            collection(firestore, 'website_updates'),
            where('startDate', '>', new Date().toISOString()),
            orderBy('startDate', 'asc')
        );
    }, [firestore]);

    const completedQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(
            collection(firestore, 'website_updates'),
            where('endDate', '<', new Date().toISOString()),
            orderBy('endDate', 'desc')
        );
    }, [firestore]);

    const { data: rawOngoing, isLoading: loadingOngoing } = useCollection<EventItem>(ongoingQuery);
    const { data: upcoming, isLoading: loadingUpcoming } = useCollection<EventItem>(upcomingQuery);
    const { data: completed, isLoading: loadingCompleted } = useCollection<EventItem>(completedQuery);

    const ongoing = rawOngoing?.filter(item => !item.endDate || new Date(item.endDate) >= new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Timeline</CardTitle>
        <CardDescription>
          An overview of your projects and proposals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ongoing">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ongoing"><CalendarClock className="mr-2"/>Ongoing</TabsTrigger>
            <TabsTrigger value="upcoming"><CalendarPlus className="mr-2"/>Upcoming</TabsTrigger>
            <TabsTrigger value="completed"><CalendarCheck className="mr-2"/>Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="ongoing" className="mt-4">
            <EventList events={ongoing} isLoading={loadingOngoing} />
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            <EventList events={upcoming} isLoading={loadingUpcoming} />
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <EventList events={completed} isLoading={loadingCompleted} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
