import { testerResourcesData } from '@/lib/data';
import type { Resource, ResourceCategory } from '@/lib/definitions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Users, SearchCheck } from 'lucide-react'; // Added SearchCheck
import Link from 'next/link';

const ResourceItem = ({ resource }: { resource: Resource }) => (
  <li className="py-3 border-b border-border last:border-b-0">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-foreground">{resource.name}</h4>
        <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
        {resource.tags && (
          <div className="mt-2 flex flex-wrap gap-2">
            {resource.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <Button variant="outline" size="sm" asChild className="ml-4 shrink-0">
        <Link href={resource.url} target="_blank" rel="noopener noreferrer">
          Visit <ExternalLink className="ml-2 h-3 w-3" />
        </Link>
      </Button>
    </div>
  </li>
);

export function TesterResources() {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <SearchCheck className="h-16 w-16 text-primary mx-auto mb-4" /> {/* Changed Users to SearchCheck */}
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Connect with Testers
        </h2>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover platforms and communities to find paid testers for your product and gather valuable feedback.
        </p>
      </div>

      <Accordion type="multiple" defaultValue={testerResourcesData.map(cat => cat.id)} className="w-full space-y-4">
        {testerResourcesData.map((category: ResourceCategory) => (
          <AccordionItem key={category.id} value={category.id} className="border-none">
             <Card className="shadow-lg">
                <AccordionTrigger className="p-0 hover:no-underline">
                    <CardHeader className="flex flex-row items-center justify-between w-full p-6">
                        <div className="flex items-center gap-3">
                            {category.icon && <category.icon className="h-8 w-8 text-primary" />}
                            <CardTitle className="text-2xl">{category.name}</CardTitle>
                        </div>
                        {/* The ChevronDown icon is part of AccordionTrigger */}
                    </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                    <CardContent className="pt-0 pb-6 px-6">
                      <ul className="divide-y divide-border">
                        {category.resources.map((resource) => (
                          <ResourceItem key={resource.id} resource={resource} />
                        ))}
                      </ul>
                    </CardContent>
                </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
