import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product } from '@/data/mockData';

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Omit<Product, 'id'>) => void;
}

export function ProductModal({ open, onOpenChange, product, onSave }: ProductModalProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Omit<Product, 'id'>>();
  const status = watch('status');
  const category = watch('category');

  useEffect(() => {
    if (product) {
      reset(product);
    } else {
      reset({
        name: '',
        category: 'Electronics',
        price: 0,
        stock: 0,
        status: 'In Stock',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
        sku: '',
      });
    }
  }, [product, reset]);

  const onSubmit = (data: Omit<Product, 'id'>) => {
    onSave(data);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register('name', { required: true })} placeholder="Enter product name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" {...register('sku', { required: true })} placeholder="e.g., PRD-001" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input 
                id="price" 
                type="number" 
                {...register('price', { required: true, valueAsNumber: true })} 
                placeholder="0.00" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input 
                id="stock" 
                type="number" 
                {...register('stock', { required: true, valueAsNumber: true })} 
                placeholder="0" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(value) => setValue('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value: Product['status']) => setValue('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" {...register('image')} placeholder="https://..." />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{product ? 'Update' : 'Add'} Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
