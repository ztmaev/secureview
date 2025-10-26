import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DollarSign, Eye, Users, TrendingUp } from 'lucide-react';
import { DashboardChart } from '@/components/dashboard-chart';

const kpiData = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
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
    value: '$5,782',
    change: '+5 since last month',
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="lg:col-span-5">
            <DashboardChart />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">New Sponsorship Offer</p>
                        <p className="text-sm text-muted-foreground">From TechCorp</p>
                    </div>
                    <div className="ml-auto font-medium text-primary">+$1,999.00</div>
                </div>
                <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Video "Project X" went viral</p>
                        <p className="text-sm text-muted-foreground">2M views</p>
                    </div>
                    <div className="ml-auto font-medium">Trending</div>
                </div>
                 <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Ad Revenue Payout</p>
                        <p className="text-sm text-muted-foreground">via Partner Program</p>
                    </div>
                    <div className="ml-auto font-medium text-primary">+$999.00</div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
