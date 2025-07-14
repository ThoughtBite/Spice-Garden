import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

// Use the auto-generated Supabase row type for menu_items
export type MenuItem = Tables<'menu_items'>['Row'];

interface MenuContextType {
  menuItems: MenuItem[];
  loading: boolean;
  error: string | null;
  addMenuItem: (item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at' | 'available'>) => Promise<void>;
  updateMenuItem: (id: string | number, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string | number) => Promise<void>;
  toggleAvailability: (id: string | number, available: boolean) => Promise<void>;
  categories: { id: string; name: string }[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Course' },
    { id: 'rice', name: 'Rice & Biryani' },
    { id: 'breads', name: 'Breads' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];

  // Load menu items
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: e } = await supabase
          .from<'menu_items'>('menu_items')
          .select('*')
          .order('id', { ascending: true });
        if (e) throw e;
        if (data) setMenuItems(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        toast({ title: 'Error', description: 'Failed to load menu items.', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const addMenuItem = async (itemData: Omit<MenuItem, 'id' | 'created_at' | 'updated_at' | 'available'>) => {
    setLoading(true);
    try {
      const payload = { ...itemData, available: true };
      const { data, error: e } = await supabase
        .from<'menu_items'>('menu_items')
        .insert([payload])
        .select('*');
      if (e) throw e;
      if (data && data.length) {
        setMenuItems(prev => [...prev, data[0]]);
        toast({ title: 'Item added', description: 'Menu item added successfully.' });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast({ title: 'Error', description: 'Failed to add menu item.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const updateMenuItem = async (id: string | number, itemData: Partial<MenuItem>) => {
    setLoading(true);
    try {
      const { data, error: e } = await supabase
        .from<'menu_items'>('menu_items')
        .update(itemData)
        .eq('id', id)
        .select('*');
      if (e) throw e;
      if (data && data.length) {
        setMenuItems(prev => prev.map(i => (i.id === id ? data[0] : i)));
        toast({ title: 'Item updated', description: 'Menu item updated successfully.' });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast({ title: 'Error', description: 'Failed to update menu item.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const deleteMenuItem = async (id: string | number) => {
    setLoading(true);
    try {
      const { error: e } = await supabase
        .from<'menu_items'>('menu_items')
        .delete()
        .eq('id', id);
      if (e) throw e;
      setMenuItems(prev => prev.filter(i => i.id !== id));
      toast({ title: 'Item deleted', description: 'Menu item removed.' });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast({ title: 'Error', description: 'Failed to delete menu item.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (id: string | number, available: boolean) => {
    setLoading(true);
    try {
      const { data, error: e } = await supabase
        .from<'menu_items'>('menu_items')
        .update({ available })
        .eq('id', id)
        .select('*');
      if (e) throw e;
      if (data && data.length) {
        setMenuItems(prev => prev.map(i => (i.id === id ? data[0] : i)));
        toast({ title: 'Availability updated', description: `Item is now ${available ? 'available' : 'unavailable'}.` });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast({ title: 'Error', description: 'Failed to update availability.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MenuContext.Provider value={{ menuItems, loading, error, addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability, categories }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be inside MenuProvider');
  return ctx;
};
