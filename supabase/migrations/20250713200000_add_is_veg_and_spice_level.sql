-- Add is_veg and spice_level columns to menu_items
ALTER TABLE public.menu_items
ADD COLUMN is_veg boolean NOT NULL DEFAULT false,
ADD COLUMN spice_level text NOT NULL DEFAULT 'mild';
