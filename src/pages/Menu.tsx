import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import CardHover from '@/components/ui/card-hover';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useMenu, type MenuItem } from '@/contexts/MenuContext';

const Menu = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart, updateQuantity, items } = useCart();
  const { menuItems, categories } = useMenu();

  // Convert numeric/string id to string for cart context
  const getCartQuantity = (itemId: number | string) => {
    const match = items.find(i => i.id === String(itemId));
    return match ? match.quantity : 0;
  };

  const filteredItems = menuItems.filter(item =>
    selectedCategory === 'all'
      ? true
      : item.category === selectedCategory
  );

  const handleAddToCart = (item: MenuItem) => {
    if (!item.available) {
      toast({ title: 'Unavailable', description: 'This item is not available.', variant: 'destructive' });
      return;
    }
    addToCart({ id: String(item.id), name: item.name, price: item.price, image_url: item.image_url });
  };

  const spiceBadgeClass = (level: string) => {
    switch (level) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hot': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Indian dishes made with traditional recipes and fine spices.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <CardHover key={item.id} title={item.name} className="overflow-hidden">
              <div className="space-y-4 text-center">
                <div className="text-5xl mb-2">{item.image_url}</div>
                <div className="flex gap-2 justify-center">
                  {item.is_veg && <Badge variant="outline" className="bg-green-100 text-green-800">Veg</Badge>}
                  <Badge className={spiceBadgeClass(item.spice_level)}>{item.spice_level}</Badge>
                  {!item.available && <Badge variant="destructive">Unavailable</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="text-xl font-bold">${item.price.toFixed(2)}</div>
                <div className="flex items-center justify-center gap-3">
                  {getCartQuantity(item.id) > 0 ? (
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const cartItem = items.find(i => i.id === String(item.id));
                          if (cartItem) updateQuantity(cartItem.id, cartItem.quantity - 1);
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium min-w-[2rem]">{getCartQuantity(item.id)}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddToCart(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </CardHover>
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No items in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
