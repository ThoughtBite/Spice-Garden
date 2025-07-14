import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useAuth } from '@/contexts/AuthContext';
import { useCartCalculations } from '@/hooks/useCartCalculations';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

const Cart = () => {
  const { toast } = useToast();
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { initiatePayment } = useRazorpay();
  const { user } = useAuth();
  const { subtotal, tax, total } = useCartCalculations(getTotalPrice());

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to proceed with checkout.",
        variant: "destructive"
      });
      return;
    }

    initiatePayment({
      amount: total,
      currency: 'USD',
      name: user.email || 'Customer',
      description: 'Spice Garden Order',
      prefill: {
        name: user.email,
        email: user.email
      },
      onSuccess: (response) => {
        clearCart();
        toast({
          title: "Payment Successful!",
          description: "Your order has been placed successfully.",
        });
      },
      onError: (error) => {
        toast({
          title: "Payment Failed",
          description: "There was an error processing your payment.",
          variant: "destructive"
        });
      }
    });
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground">
            Your Cart
          </h1>
          <Button variant="outline" onClick={clearCart} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Order Summary */}
          <CartSummary
            subtotal={subtotal}
            tax={tax}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;