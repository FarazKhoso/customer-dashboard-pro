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
import { Invoice, customers } from '@/data/mockData';

interface InvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => void;
}

export function InvoiceModal({ open, onOpenChange, onSave }: InvoiceModalProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>>({
    defaultValues: {
      status: 'Pending',
      customerId: '',
      customerName: '',
      amount: 0,
      dueDate: '',
    }
  });
  const status = watch('status');
  const customerId = watch('customerId');

  const onSubmit = (data: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => {
    const customer = customers.find(c => c.id === data.customerId);
    onSave({
      ...data,
      customerName: customer?.name || data.customerName,
    });
    onOpenChange(false);
    reset();
  };

  const handleCustomerChange = (value: string) => {
    setValue('customerId', value);
    const customer = customers.find(c => c.id === value);
    if (customer) {
      setValue('customerName', customer.name);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Customer</Label>
            <Select value={customerId} onValueChange={handleCustomerChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} - {customer.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input 
              id="amount" 
              type="number" 
              {...register('amount', { required: true, valueAsNumber: true })} 
              placeholder="0.00" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input 
              id="dueDate" 
              type="date" 
              {...register('dueDate', { required: true })} 
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value: Invoice['status']) => setValue('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
