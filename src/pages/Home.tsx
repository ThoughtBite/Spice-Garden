import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Heart, Users } from 'lucide-react';
import CardHover from '@/components/ui/card-hover';

const Home = () => {
  const popularDishes = [
    {
      name: "Chicken Biryani",
      description: "Aromatic basmati rice layered with tender chicken and exotic spices",
      price: "$18.99",
      image: "🍛"
    },
    {
      name: "Paneer Butter Masala",
      description: "Creamy tomato curry with soft cottage cheese cubes",
      price: "$15.99",
      image: "🧀"
    },
    {
      name: "Tandoori Chicken",
      description: "Marinated chicken cooked in traditional clay oven",
      price: "$16.99",
      image: "🍗"
    }
  ];

  const features = [
    {
      icon: Star,
      title: "Authentic Flavors",
      description: "Traditional recipes passed down through generations"
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every dish is prepared with care and passion"
    },
    {
      icon: Users,
      title: "Family Owned",
      description: "A family business serving the community for over 20 years"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-primary-foreground mb-6">
            Welcome to
            <span className="block spice-text text-5xl md:text-7xl">
              Spice Garden
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Experience the authentic flavors of India with our traditional recipes, 
            warm hospitality, and aromatic spices that transport you to the heart of Indian cuisine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="shadow-gold" asChild>
              <Link to="/menu" className="flex items-center">
                View Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Popular Dishes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved dishes, each bursting with authentic Indian flavors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDishes.map((dish, index) => (
              <CardHover
                key={index}
                title={dish.name}
                description={dish.description}
                gradient
                className="text-center"
              >
                <div className="mb-4">
                  <div className="text-6xl mb-4">{dish.image}</div>
                  <div className="text-2xl font-bold text-primary font-playfair">
                    {dish.price}
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Add to Cart
                </Button>
              </CardHover>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-4">
              Why Choose Spice Garden?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 hero-gradient rounded-full flex items-center justify-center shadow-warm">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary-foreground mb-4">
            Ready to Experience Authentic Indian Cuisine?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join us for an unforgettable dining experience filled with traditional flavors and warm hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="shadow-gold" asChild>
              <Link to="/contact">Make a Reservation</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
              <Link to="/menu">Order Online</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;