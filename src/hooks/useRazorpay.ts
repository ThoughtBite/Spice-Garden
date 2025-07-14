import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RazorpayOptions {
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  orderId?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const { toast } = useToast();

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(async (options: RazorpayOptions) => {
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      toast({
        title: "Payment Error",
        description: "Failed to load payment gateway. Please try again.",
        variant: "destructive"
      });
      return;
    }

    const rzpOptions = {
      key: 'rzp_test_9999999999999999', // Replace with your actual test key
      amount: options.amount * 100, // Convert to paise
      currency: options.currency || 'INR',
      name: options.name || 'Spice Garden',
      description: options.description || 'Order Payment',
      order_id: options.orderId,
      prefill: options.prefill,
      theme: {
        color: '#D97706'
      },
      handler: (response: any) => {
        toast({
          title: "Payment Successful!",
          description: "Your order has been placed successfully.",
        });
        options.onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          toast({
            title: "Payment Cancelled",
            description: "Payment was cancelled by user.",
            variant: "destructive"
          });
          options.onError({ code: 'PAYMENT_CANCELLED' });
        }
      }
    };

    const razorpay = new window.Razorpay(rzpOptions);
    razorpay.open();
  }, [toast, loadRazorpayScript]);

  return { initiatePayment };
};