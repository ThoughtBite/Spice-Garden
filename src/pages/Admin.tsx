import React, { useState } from 'react';
import { useMenu, type MenuItem } from '@/contexts/MenuContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit3, Trash2, Save, X } from 'lucide-react';
import CardHover from '@/components/ui/card-hover';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability } = useMenu();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | number | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: null,
    price: 0,
    category: 'mains',
    is_veg: false,
    spice_level: 'mild',
    image_url: null
  });

  const handleAdd = async () => {
    if (!newItem.name || newItem.price <= 0) {
      toast({ title: 'Missing fields', description: 'Name and price are required.', variant: 'destructive' });
      return;
    }
    await addMenuItem(newItem as Omit<MenuItem, 'id' | 'is_available'>);
    setIsAdding(false);
    setNewItem({ name: '', description: null, price: 0, category: 'mains', is_veg: false, spice_level: 'mild', image_url: null });
  };

  const handleUpdate = async (id: string | number) => {
    const item = menuItems.find(i => i.id === id);
    if (item) {
      await updateMenuItem(id, item);
      setIsEditing(null);
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setIsAdding(true)}><Plus className="mr-1" /> Add Item</Button>
      </div>
      {isAdding && (
        <CardHover className="mb-6">
          <div className="space-y-4">
            <Input placeholder="Name" value={newItem.name || ''} onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))} />
            <Input type="number" placeholder="Price" value={newItem.price || ''} onChange={e => setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))} />
            <Select value={newItem.category} onValueChange={v => setNewItem(prev => ({ ...prev, category: v }))}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch checked={newItem.is_veg || false} onCheckedChange={v => setNewItem(prev => ({ ...prev, is_veg: v }))} />
              <Label>Vegetarian</Label>
            </div>
            <Select value={newItem.spice_level} onValueChange={v => setNewItem(prev => ({ ...prev, spice_level: v as any }))}>
              <SelectTrigger><SelectValue placeholder="Spice Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Image URL or Emoji" value={newItem.image_url || ''} onChange={e => setNewItem(prev => ({ ...prev, image_url: e.target.value }))} />
            <div className="flex space-x-2">
              <Button onClick={handleAdd}><Save className="mr-1" />Save</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}><X className="mr-1" />Cancel</Button>
            </div>
          </div>
        </CardHover>
      )}
      <div className="space-y-4">
        {menuItems.map(item => (
          <CardHover key={item.id}>
            {isEditing === item.id ? (
              <div className="space-y-4">
                {/* Editing fields similar to Add */}
                <Input value={item.name} onChange={e => updateMenuItem(item.id, { name: e.target.value })} />
                <Button onClick={() => handleUpdate(item.id)}><Save className="mr-1" />Update</Button>
                <Button variant="outline" onClick={() => setIsEditing(null)}><X className="mr-1" />Cancel</Button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    {item.is_veg && <Badge>Veg</Badge>}
                    <Badge>{item.spice_level}</Badge>
                    <Badge variant={item.is_available ? 'default' : 'secondary'}>
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => setIsEditing(item.id as any)}><Edit3 /></Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteMenuItem(item.id)}><Trash2 /></Button>
                  <Button size="sm" onClick={() => toggleAvailability(item.id, item.is_available)}>
                    {item.is_available ? 'Mark Unavailable' : 'Mark Available'}
                  </Button>
                </div>
              </div>
            )}
          </CardHover>
        ))}
      </div>
    </div>
  );
};

export default Admin;
