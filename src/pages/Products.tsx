import { useState } from 'react';
import { Plus } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { products, productStats, Product } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { ProductModal } from '@/components/ProductModal';
import { toast } from 'sonner';

const Products = () => {
  const [productList, setProductList] = useState(products);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSave = (product: Omit<Product, 'id'>) => {
    if (editingProduct) {
      setProductList(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p
      ));
      toast.success('Product updated successfully!');
    } else {
      const newProduct = { ...product, id: String(productList.length + 1) };
      setProductList(prev => [...prev, newProduct]);
      toast.success('Product added successfully!');
    }
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      render: (product: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div>
            <span className="font-medium text-foreground">{product.name}</span>
            <p className="text-xs text-muted-foreground">{product.sku}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', label: 'Category', hidden: 'hidden md:table-cell' },
    { 
      key: 'price', 
      label: 'Price',
      render: (product: Product) => (
        <span className="font-medium">${product.price.toLocaleString()}</span>
      ),
    },
    { 
      key: 'stock', 
      label: 'Stock', 
      hidden: 'hidden lg:table-cell',
      render: (product: Product) => (
        <span>{product.stock} units</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (product: Product) => (
        <span className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
          product.status === 'In Stock' && "badge-active",
          product.status === 'Low Stock' && "bg-amber-100 text-amber-700 border border-amber-200",
          product.status === 'Out of Stock' && "badge-inactive"
        )}>
          {product.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (product: Product) => (
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setEditingProduct(product);
              setModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product.id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={productStats.totalProducts.value}
          change={productStats.totalProducts.change}
          trend="up"
          delay={0}
        />
        <StatCard
          title="In Stock"
          value={productStats.inStock.value}
          change={productStats.inStock.change}
          trend="up"
          delay={100}
        />
        <StatCard
          title="Low Stock"
          value={productStats.lowStock.value}
          change={productStats.lowStock.change}
          trend="down"
          delay={200}
        />
        <StatCard
          title="Out of Stock"
          value={productStats.outOfStock.value}
          change={productStats.outOfStock.change}
          trend="down"
          delay={300}
        />
      </div>

      {/* Products Table */}
      <DataTable
        title="All Products"
        subtitle="Product Inventory"
        data={productList}
        columns={columns}
        searchKeys={['name', 'category', 'sku']}
        exportFileName="products"
        actions={
          <Button onClick={() => { setEditingProduct(null); setModalOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        }
      />

      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        product={editingProduct}
        onSave={handleSave}
      />
    </>
  );
};

export default Products;
