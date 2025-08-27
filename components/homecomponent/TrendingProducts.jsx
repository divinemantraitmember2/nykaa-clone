import ProductCard from "./ProductCardHome";

export default function TrendingProducts() {
  const products = [
    {
      title: "Kratos Gym Pant",
      image: "https://ik.imagekit.io/pondric/catalog/product/mp05/blue/mp05-blue_main.jpg",
      price: 2200,
      originalPrice: 3400,
      discount: 35,
      rating: 4.6,
    },
    {
      title: "Classic Linen Kurta",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800&auto=format&fit=crop",
      price: 1999,
      originalPrice: 2799,
      discount: 28,
      rating: 4.4,
    },
    {
      title: "Nehru Jacket Set",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop",
      price: 4999,
      isNew: true,
      rating: 4.8,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-extrabold">Trending Kurtas for Men</h2>
        <a href="#" className="text-sm font-medium hover:opacity-80">View all →</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            {...product}
            onAddToCart={() => console.log("Add to Cart", product.title)}
            onWishlist={() => console.log("Wishlist", product.title)}
          />
        ))}
      </div>
    </div>
  );
}
