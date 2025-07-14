import React from 'react';
import { Button } from '@/components/ui/button';
import CardHover from '@/components/ui/card-hover';
import { Link } from 'react-router-dom';

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, tax, total, onCheckout }) => {
  return (
    <div className="lg:col-span-1">
      <CardHover title="Order Summary" gradient className="sticky top-24">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <Button 
              size="lg" 
              className="w-full shadow-warm"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link to="/menu">Continue Shopping</Link>
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Delivery Information</h4>
            <p className="text-sm text-muted-foreground">
              Free delivery on orders over $25. Estimated delivery time: 30-45 minutes.
            </p>
          </div>
        </div>
      </CardHover>
    </div>
  );
};

export default CartSummary;