'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DollarSign, Eye, Users, TrendingUp, Bell, Briefcase, FileText } from 'lucide-react';
import { DashboardChart } from '@/components/dashboard-chart';
import { Animated } from '@/components/ui/animated';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useMemoFirebase, useFirestore } from '@/firebase/provider';
import { AdminOnly } from '@/components/admin-only';
import { collection, query, orderBy, limit } from 'firebase/firestore';

const kpiData = [
  {
    title: 'Total Revenue',
    value: 'KSh 5,880,147',
    change: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Total Views',
    value: '1,250,000',
    change: '+180.1% from last month',
    icon: Eye,
  },
  {
    title: 'Engagement Rate',
    value: '12.5%',
    change: '+19% from last month',
    icon: Users,
  },
  {
    title: 'Sponsorship Value',
    value: 'KSh 751,660',
    change: '+5 since last month',
    icon: TrendingUp,
  },
];

const eventTypeToHumanReadable: { [key: string]: {text: string, icon: React.ElementType} } = {
  new_proposal: { text: 'New Proposal', icon: FileText },
  new_project: { text: 'New Project', icon: Briefcase },
  new_picture: { text: 'New Picture Uploaded', icon: Bell },
}

function RecentActivity() {
  const firestore = useFirestore();
  const updatesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'website_updates'), orderBy('timestamp', 'desc'), limit(5));
  }, [firestore]);

  const { data: updates, isLoading, error } = useCollection(updatesQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading && <p>Loading activity...</p>}
        {error && <p className="text-destructive">Error loading activity.</p>}
        {updates && updates.length === 0 && <p className="text-muted-foreground">No recent activity.</p>}
        {updates && updates.map((update) => {
          const eventInfo = eventTypeToHumanReadable[update.eventType] || { text: 'New Update', icon: Bell };
          const Icon = eventInfo.icon;
          return (
            <div key={update.id} className="flex items-center">
              <div className="p-2 bg-accent rounded-full mr-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{eventInfo.text}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(update.timestamp).toLocaleTimeString()} - {new Date(update.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}


export default function AnalyticsPage() {
  return (
    <AdminOnly>
      <div className="flex flex-col gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Animated key={kpi.title} delay={index * 0.1}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground">{kpi.change}</p>
                </CardContent>
              </Card>
            </Animated>
          ))}
        </div>
        <Animated delay={0.4}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <div className="lg:col-span-5">
              <DashboardChart />
            </div>
            <div className="lg:col-span-2">
             <RecentActivity />
            </div>
          </div>
        </Animated>
      </div>
    </AdminOnly>
  );
}
