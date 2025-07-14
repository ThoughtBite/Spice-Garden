import React from 'react';
import { Heart, Users, Award, Clock } from 'lucide-react';
import CardHover from '@/components/ui/card-hover';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Authentic Recipes",
      description: "Traditional family recipes passed down through four generations, preserving the true essence of Indian cuisine."
    },
    {
      icon: Users,
      title: "Family Tradition",
      description: "Started as a small family kitchen in Mumbai, now serving authentic flavors to our community with the same love."
    },
    {
      icon: Award,
      title: "Quality Ingredients",
      description: "We source the finest spices directly from India and use only the freshest local ingredients in our dishes."
    },
    {
      icon: Clock,
      title: "Time-Honored Methods",
      description: "Our chefs follow traditional cooking methods, taking time to develop rich flavors in every dish."
    }
  ];

  const milestones = [
    { year: "1985", event: "Founded in Mumbai as a small family kitchen" },
    { year: "2002", event: "Opened our first restaurant location" },
    { year: "2010", event: "Expanded with our signature spice blends" },
    { year: "2018", event: "Launched online ordering and delivery" },
    { year: "2024", event: "Celebrating 39 years of authentic Indian cuisine" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary-foreground mb-6">
            Our Story
          </h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed">
            From a humble family kitchen in Mumbai to your neighborhood favorite, 
            Spice Garden has been bringing authentic Indian flavors to the community for nearly four decades.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
                A Journey of Flavors
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <div className="text-6xl mb-4 text-center">🏠</div>
                <h3 className="text-2xl font-playfair font-semibold mb-4">Humble Beginnings</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our story began in 1985 in a small kitchen in Mumbai, where Grandma Lakshmi started 
                  cooking traditional Indian dishes for her family. Her secret was simple: use only the 
                  finest spices, cook with love, and never compromise on authenticity.
                </p>
              </div>
              <div>
                <div className="text-6xl mb-4 text-center">🌶️</div>
                <h3 className="text-2xl font-playfair font-semibold mb-4">The Secret Spices</h3>
                <p className="text-muted-foreground leading-relaxed">
                  What made Grandma Lakshmi's cooking special was her unique blend of spices, sourced 
                  directly from local markets in Mumbai. Each spice was carefully selected, roasted, 
                  and ground by hand to create the perfect balance of flavors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl mb-4 text-center">✈️</div>
                <h3 className="text-2xl font-playfair font-semibold mb-4">Coming to America</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In 2002, the family moved to America with dreams of sharing their authentic recipes 
                  with a new community. They opened the first Spice Garden restaurant, bringing the 
                  same traditional cooking methods and family recipes to a new continent.
                </p>
              </div>
              <div>
                <div className="text-6xl mb-4 text-center">👨‍👩‍👧‍👦</div>
                <h3 className="text-2xl font-playfair font-semibold mb-4">Growing Family</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Spice Garden is run by the third generation of the family, with Grandma 
                  Lakshmi's recipes still being followed to the letter. We've grown from a single 
                  restaurant to a beloved local institution, but our commitment to authenticity remains unchanged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by the values that Grandma Lakshmi instilled in us from the beginning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <CardHover
                  key={index}
                  title=""
                  gradient
                  className="text-center h-full"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto hero-gradient rounded-full flex items-center justify-center shadow-warm">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-playfair font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </CardHover>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in our family's culinary adventure
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 hero-gradient rounded-full flex items-center justify-center shadow-warm">
                  <span className="text-sm font-bold text-primary-foreground">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-medium text-foreground">
                    {milestone.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-foreground mb-4">
            Join Our Family
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            We invite you to be part of our story. Experience the warmth of Indian hospitality 
            and the authentic flavors that have been our family's passion for generations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;