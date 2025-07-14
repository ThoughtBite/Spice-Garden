import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-playfair font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any delicious dishes to your cart yet.
          </p>
          <Button size="lg" asChild>
            <Link to="/menu">Browse Our Menu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;