import { AppHeader } from '@/components/app-header';
import { SubmitIdeaForm } from '@/components/submit-idea-form';
import { CommunityIdeas } from '@/components/community-ideas';
import { TesterResources } from '@/components/tester-resources';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">
        {/* Hero / Idea Submission Section */}
        <section 
          id="submit-idea" 
          className="relative py-16 md:py-24 bg-gradient-to-br from-primary/30 via-background to-background flex items-center justify-center min-h-[calc(100vh-4rem)] px-4"
        >
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234DB6AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
                Launch Your Next <span className="text-primary">Big Idea</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Validated helps you truly validate your business concepts. The ultimate test: will people actually pay for your idea? Connect with real paying users for beta testing and get the feedback that truly matters.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                 <a href="#view-feedback" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 shadow-md transition-transform hover:scale-105">
                    Explore Ideas
                  </a>
                  <a href="#find-testers" className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-background hover:bg-primary/10 shadow-md transition-transform hover:scale-105">
                    Find Testers
                  </a>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <SubmitIdeaForm />
            </div>
          </div>
        </section>

        <Separator className="my-16 md:my-24" />

        {/* View Feedback Section */}
        <section id="view-feedback" className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <CommunityIdeas />
          </div>
        </section>

        <Separator className="my-16 md:my-24" />

        {/* Find Testers Resources Section */}
        <section id="find-testers" className="py-16 md:py-24 bg-secondary/30 px-4">
          <div className="container mx-auto">
            <TesterResources />
          </div>
        </section>
      </main>

      <footer className="py-8 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Validated. All rights reserved.</p>
          <p className="text-sm opacity-80 mt-1">Validate if people will pay. Take flight.</p>
        </div>
      </footer>
    </div>
  );
}
