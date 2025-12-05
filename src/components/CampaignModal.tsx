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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Campaign } from '@/data/mockData';

interface CampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (campaign: Omit<Campaign, 'id'>) => void;
}

export function CampaignModal({ open, onOpenChange, onSave }: CampaignModalProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Omit<Campaign, 'id'> & { template: string; tags: string }>({
    defaultValues: {
      name: '',
      type: 'Email',
      sentDate: '',
      recipients: 0,
      opens: 0,
      clicks: 0,
      status: 'Draft',
      template: '',
      tags: '',
    }
  });
  const type = watch('type');
  const status = watch('status');

  const onSubmit = (data: Omit<Campaign, 'id'> & { template: string; tags: string }) => {
    const { template, tags, ...campaignData } = data;
    onSave(campaignData);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input id="name" {...register('name', { required: true })} placeholder="e.g., Summer Sale 2024" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={(value: Campaign['type']) => setValue('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(value: Campaign['status']) => setValue('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Recipient Tags</Label>
            <Input 
              id="tags" 
              {...register('tags')} 
              placeholder="e.g., premium, newsletter-subscribers" 
            />
            <p className="text-xs text-muted-foreground">Comma-separated tags to target specific customer segments</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Email Template</Label>
            <Textarea 
              id="template" 
              {...register('template')} 
              placeholder="Write your email content here...

Use {{name}} for personalization."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipients">Estimated Recipients</Label>
            <Input 
              id="recipients" 
              type="number" 
              {...register('recipients', { valueAsNumber: true })} 
              placeholder="0" 
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Campaign</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
