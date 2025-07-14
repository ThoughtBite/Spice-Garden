import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import CardHover from '@/components/ui/card-hover';
import { CartItem as CartItemType } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <CardHover title="" className="p-6">
      <div className="flex items-center space-x-4">
        {/* Item Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl">
            {item.image_url || '🍽️'}
          </div>
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-playfair font-semibold">{item.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-lg font-bold text-primary">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-3 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div className="ml-auto">
              <span className="text-lg font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardHover>
  );
};

export default CartItem;