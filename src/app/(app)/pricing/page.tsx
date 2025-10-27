
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Check, Star, Gem, Crown } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Basic Access',
    id: 'basic',
    price: '$9.99',
    period: 'monthly',
    description: 'Get access to our core library of watermarked content.',
    features: [
      'View all content with watermarks',
      'Basic search and filtering',
      'Email support',
    ],
    icon: Star,
    buttonLabel: 'Subscribe',
  },
  {
    name: 'Premium',
    id: 'premium',
    price: '$29.99',
    period: 'monthly',
    description: 'Download unwatermarked content and get premium features.',
    features: [
      'Everything in Basic',
      'Download up to 20 unwatermarked images/month',
      'Access to exclusive content',
      'Priority support',
    ],
    icon: Gem,
    buttonLabel: 'Go Premium',
    popular: true,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: 'Contact Us',
    period: 'for custom pricing',
    description: 'Full access for large teams and commercial use.',
    features: [
      'Everything in Premium',
      'Unlimited downloads',
      'Team accounts and management',
      'Dedicated account manager',
    ],
    icon: Crown,
    buttonLabel: 'Contact Sales',
  },
];

export default function PricingPage() {
  const { toast } = useToast();

  const handleSubscription = (tierName: string) => {
    toast({
      title: 'Checkout Simulation',
      description: `You have started the checkout process for the ${tierName} plan.`,
      variant: 'default',
    });
    // In a real app, this would redirect to a Stripe Checkout page.
    // e.g., createStripeCheckoutSession(planId).then(url => router.push(url));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Find the Perfect Plan</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Unlock the full potential of your content with our flexible pricing.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${tier.popular ? 'border-primary shadow-lg' : ''}`}
          >
            <CardHeader className="items-center text-center">
              {tier.popular && (
                <div className="text-xs uppercase font-bold text-primary mb-2">Most Popular</div>
              )}
              <tier.icon className="w-12 h-12 mb-4 text-primary" />
              <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
              <div className="text-4xl font-bold">{tier.price}</div>
              <p className="text-sm text-muted-foreground">{tier.period}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-center text-muted-foreground mb-6">{tier.description}</p>
              <ul className="space-y-4">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {tier.id === 'enterprise' ? (
                 <Button className="w-full" asChild>
                    <Link href="mailto:sales@secureview.com?subject=Enterprise%20Plan%20Inquiry">
                      {tier.buttonLabel}
                    </Link>
                  </Button>
              ) : (
                <Button
                    className="w-full"
                    variant={tier.popular ? 'default' : 'outline'}
                    onClick={() => handleSubscription(tier.name)}
                >
                    {tier.buttonLabel}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
