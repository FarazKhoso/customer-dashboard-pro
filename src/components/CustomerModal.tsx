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
import { Customer } from '@/data/mockData';

interface CustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (customer: Omit<Customer, 'id'>) => void;
}

export function CustomerModal({ open, onOpenChange, onSave }: CustomerModalProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Omit<Customer, 'id'>>({
    defaultValues: {
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      joinedDate: new Date().toISOString().split('T')[0],
      totalSpent: 0,
    }
  });
  const status = watch('status');

  const onSubmit = (data: Omit<Customer, 'id'>) => {
    onSave(data);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register('name', { required: true })} placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email', { required: true })} placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register('phone', { required: true })} placeholder="(555) 555-5555" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register('company', { required: true })} placeholder="Company Inc." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...register('country', { required: true })} placeholder="United States" />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value: Customer['status']) => setValue('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Customer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
