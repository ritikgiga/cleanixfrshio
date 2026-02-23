/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Trash2, 
  Plus, 
  Minus,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'products' | 'about' | 'contact' | 'cart' | 'checkout';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  color: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Data ---
const PRODUCTS: Product[] = [
  { id: 1, name: "Toilet Cleaner", price: 129, description: "Powerful stain removal and 99.9% germ kill.", image: "", category: "Cleaning", color: "#0066cc" },
  { id: 2, name: "Floor Cleaner", price: 199, description: "Sparkling shine with a long-lasting citrus fragrance.", image: "", category: "Cleaning", color: "#28a745" },
  { id: 3, name: "Bathroom Cleaner", price: 149, description: "Removes tough soap scum and limescale easily.", image: "", category: "Cleaning", color: "#00b4d8" },
  { id: 4, name: "Room Freshener", price: 249, description: "Instant freshness that lasts for hours.", image: "", category: "Fragrance", color: "#9c27b0" },
  { id: 5, name: "Glass Cleaner", price: 99, description: "Streak-free shine for windows and mirrors.", image: "", category: "Cleaning", color: "#03a9f4" },
  { id: 6, name: "Detergent Liquid", price: 399, description: "Tough on stains, gentle on fabrics.", image: "", category: "Laundry", color: "#3f51b5" },
  { id: 7, name: "Hand Wash", price: 119, description: "Moisturizing formula with anti-bacterial protection.", image: "", category: "Personal Care", color: "#e91e63" },
  { id: 8, name: "Dish Wash", price: 159, description: "Cuts through grease and removes odors effectively.", image: "", category: "Cleaning", color: "#ff9800" },
  { id: 9, name: "Car Wash Shampoo", price: 299, description: "High-foam formula for a showroom-like finish.", image: "", category: "Automotive", color: "#607d8b" },
];

// --- Components ---

const CleaningBottleSVG = ({ color, label }: { color: string, label: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-white p-8">
    <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
      {/* Bottle Cap */}
      <rect x="80" y="10" width="40" height="20" rx="4" fill="#334155" />
      {/* Bottle Neck */}
      <rect x="85" y="30" width="30" height="40" fill="#94a3b8" />
      {/* Bottle Body */}
      <path d="M60 70 C40 70 40 90 40 110 L40 260 C40 280 60 290 80 290 L120 290 C140 290 160 280 160 260 L160 110 C160 90 160 70 140 70 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      {/* Liquid/Label Area */}
      <rect x="45" y="120" width="110" height="120" rx="10" fill={color} opacity="0.9" />
      {/* Label Text */}
      <text x="100" y="185" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" className="uppercase tracking-tighter">
        {label.split(' ').map((word, i) => (
          <tspan x="100" dy={i === 0 ? 0 : 16} key={i}>{word}</tspan>
        ))}
      </text>
      {/* Reflections */}
      <rect x="55" y="85" width="10" height="160" rx="5" fill="white" opacity="0.3" />
    </svg>
  </div>
);

const Navbar = ({ navigate, currentPage, cartCount, isMenuOpen, setIsMenuOpen }: { 
  navigate: (page: Page) => void, 
  currentPage: Page, 
  cartCount: number, 
  isMenuOpen: boolean, 
  setIsMenuOpen: (open: boolean) => void 
}) => (
  <nav className="glass-nav">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('home')}>
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/logo.png" alt="Cleanix Freshio Logo" className="w-full h-full object-contain" onError={(e) => {
              // Fallback if logo.png is missing
              (e.target as HTMLImageElement).src = "https://placehold.co/100x100/0066cc/white?text=CF";
            }} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">Cleanix Freshio</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <span onClick={() => navigate('home')} className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}>Home</span>
          <span onClick={() => navigate('products')} className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}>Products</span>
          <span onClick={() => navigate('about')} className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}>About Us</span>
          <span onClick={() => navigate('contact')} className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}>Contact</span>
          <div onClick={() => navigate('cart')} className="relative cursor-pointer p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ShoppingBag className="w-6 h-6 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <div onClick={() => navigate('cart')} className="relative cursor-pointer p-2">
            <ShoppingBag className="w-6 h-6 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Nav Menu */}
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            <div onClick={() => navigate('home')} className="block px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Home</div>
            <div onClick={() => navigate('products')} className="block px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Products</div>
            <div onClick={() => navigate('about')} className="block px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">About Us</div>
            <div onClick={() => navigate('contact')} className="block px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Contact</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
);

const Hero = ({ navigate }: { navigate: (page: Page) => void }) => (
  <section className="relative bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Cleanix Freshio – <span className="text-brand-blue">Safai Jo Dikhe</span>, Mehke aur Chale
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-lg">
          Premium cleaning products for home & business use. Experience the power of professional-grade hygiene.
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => navigate('products')} className="btn-primary flex items-center gap-2">
            Shop Now <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('contact')} className="btn-secondary">
            Contact Us
          </button>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex justify-center"
      >
        <div className="absolute -inset-4 bg-brand-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center p-12">
          <CleaningBottleSVG color="#0066cc" label="Premium Quality" />
        </div>
      </motion.div>
    </div>
  </section>
);

const WhyChooseUs = () => {
  const features = [
    { title: "Affordable Pricing", desc: "Best quality at prices that fit your budget." },
    { title: "Strong Cleaning Formula", desc: "Tough on dirt, stains, and germs." },
    { title: "Bulk Orders Available", desc: "Special rates for offices and businesses." },
    { title: "Fast Delivery", desc: "Quick doorstep delivery across the city." },
    { title: "Safe & Skin Friendly", desc: "Formulated to be safe for you and your family." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-brand-green mx-auto rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, addToCart }: { product: Product, addToCart: (p: Product) => void, key?: React.Key }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="product-card"
  >
    <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
      <CleaningBottleSVG color={product.color} label={product.name} />
      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {product.category}
      </span>
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h3>
    <p className="text-sm text-slate-500 mb-4 flex-grow">{product.description}</p>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-xl font-bold text-brand-blue">₹{product.price}</span>
      <button 
        onClick={() => addToCart(product)}
        className="p-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

const Home = ({ navigate, addToCart }: { navigate: (page: Page) => void, addToCart: (p: Product) => void }) => (
  <main>
    <Hero navigate={navigate} />
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Products</h2>
            <div className="w-12 h-1 bg-brand-blue rounded-full"></div>
          </div>
          <button onClick={() => navigate('products')} className="text-brand-blue font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
        </div>
      </div>
    </section>
    <WhyChooseUs />
  </main>
);

const ProductsPage = ({ addToCart }: { addToCart: (p: Product) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const categories = useMemo(() => ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))], []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <section className="py-12 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Products</h1>
            <p className="text-slate-600 max-w-2xl">Explore our wide range of premium cleaning solutions designed for maximum efficiency and hygiene.</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-blue transition-all cursor-pointer"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-blue transition-all cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProducts.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const AboutPage = () => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">About Cleanix Freshio</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          Cleanix Freshio is a premium cleaning products brand dedicated to providing high-quality, effective, and safe cleaning solutions for both residential and commercial spaces.
        </p>
        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-blue-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-brand-blue mb-4">Our Mission</h3>
            <p className="text-slate-700">To redefine hygiene standards by offering powerful cleaning formulas that are safe for people and the planet.</p>
          </div>
          <div className="bg-green-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-brand-green mb-4">Our Vision</h3>
            <p className="text-slate-700">To become the most trusted name in cleaning supplies, known for innovation, quality, and exceptional value.</p>
          </div>
        </div>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          Founded in 2026, we have quickly grown to become a favorite among homeowners and business owners alike. Our products are formulated using advanced cleaning technology to ensure that "Safai Jo Dikhe" (Cleanliness that is visible) is not just a slogan, but a reality in every space cleaned with Cleanix Freshio.
        </p>
      </div>
    </div>
  </section>
);

const ContactPage = ({ contactSubmitted, setContactSubmitted }: { contactSubmitted: boolean, setContactSubmitted: (s: boolean) => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <section className="py-20 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-slate-600 mb-10">Have questions about our products or want to place a bulk order? We're here to help!</p>
          
          <div className="space-y-6">
            <a href="mailto:cleanixfreshio@gmail.com" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                <Mail />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email us at</p>
                <p className="font-bold text-slate-800">cleanixfreshio@gmail.com</p>
              </div>
            </a>
            
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
                <Phone />
              </div>
              <div>
                <p className="text-sm text-slate-500">Call/WhatsApp</p>
                <p className="font-bold text-slate-800">+91 98765 43210</p>
              </div>
            </div>

            <button 
              onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              className="w-full btn-secondary flex items-center justify-center gap-2 py-4"
            >
              <MessageSquare className="w-5 h-5" /> Order via WhatsApp
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          {contactSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
              <p className="text-slate-600">Thank you for contacting Cleanix Freshio! We will get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all" placeholder="+91 00000 00000" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full btn-primary py-4">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const CartPage = ({ cart, navigate, updateQuantity, removeFromCart, cartTotal }: { 
  cart: CartItem[], 
  navigate: (page: Page) => void, 
  updateQuantity: (id: number, delta: number) => void, 
  removeFromCart: (id: number) => void, 
  cartTotal: number 
}) => {
  const goToCheckout = () => {
    // Save total to localStorage so checkout.html can read it
    localStorage.setItem('cleanix_total', cartTotal.toString());
    // Redirect to standalone checkout page as requested
    window.location.href = "checkout.html";
  };

  return (
    <section className="py-20 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-10">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm text-center border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button onClick={() => navigate('products')} className="btn-primary">Start Shopping</button>
          </div>
        ) : (
          <div className="grid gap-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-6 border-b border-slate-100 last:border-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <CleaningBottleSVG color={item.color} label={item.name} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded transition-colors"><Minus className="w-4 h-4" /></button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded transition-colors"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-bold text-slate-800">₹{item.price * item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-xl font-bold text-slate-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-100">
                <span className="text-slate-600">Delivery</span>
                <span className="text-brand-green font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-3xl font-bold text-brand-blue">₹{cartTotal}</span>
              </div>
              <button onClick={goToCheckout} className="w-full btn-primary py-4 text-lg">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const CheckoutPage = ({ cartTotal, onOrderPlaced, navigate }: { 
  cartTotal: number, 
  onOrderPlaced: () => void,
  navigate: (page: Page) => void 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderId = 'CF' + Math.floor(100000 + Math.random() * 900000);
    alert(`Order placed successfully!\nYour Order ID is: ${orderId}`);
    
    // Clear form
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      paymentMethod: 'cod'
    });

    onOrderPlaced();
    navigate('home');
  };

  return (
    <section className="py-20 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-10">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Shipping Information</h2>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Customer Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all" placeholder="John Doe" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all" placeholder="10-digit number" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Address</label>
              <textarea required rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all resize-none" placeholder="House No, Street, Landmark"></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all" placeholder="City" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all" placeholder="State" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                <input required type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-blue outline-none transition-all" placeholder="6-digit" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="payment" value="cod" checked={formData.paymentMethod === 'cod'} onChange={() => setFormData({...formData, paymentMethod: 'cod'})} className="w-5 h-5 text-brand-blue" />
                  <span className="font-medium text-slate-700">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="payment" value="online" checked={formData.paymentMethod === 'online'} onChange={() => setFormData({...formData, paymentMethod: 'online'})} className="w-5 h-5 text-brand-blue" />
                  <span className="font-medium text-slate-700">Online Payment</span>
                </label>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600">Total Amount</span>
                <span className="text-2xl font-bold text-brand-blue">₹{cartTotal}</span>
              </div>
              <button type="submit" className="w-full btn-primary py-4 text-lg">Place Order</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = ({ navigate }: { navigate: (page: Page) => void }) => (
  <footer className="bg-slate-900 text-white py-16 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/logo.png" alt="Cleanix Freshio Logo" className="w-full h-full object-contain" onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/100x100/0066cc/white?text=CF";
            }} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Cleanix Freshio</span>
        </div>
        <p className="text-slate-400 max-w-sm mb-8">
          Providing premium cleaning solutions for homes and businesses. Safai Jo Dikhe, Mehke aur Chale.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors"><Twitter className="w-5 h-5" /></a>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
        <ul className="space-y-4 text-slate-400">
          <li onClick={() => navigate('home')} className="hover:text-white cursor-pointer transition-colors">Home</li>
          <li onClick={() => navigate('products')} className="hover:text-white cursor-pointer transition-colors">Products</li>
          <li onClick={() => navigate('about')} className="hover:text-white cursor-pointer transition-colors">About Us</li>
          <li onClick={() => navigate('contact')} className="hover:text-white cursor-pointer transition-colors">Contact</li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-6">Contact Info</h4>
        <ul className="space-y-4 text-slate-400">
          <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> cleanixfreshio@gmail.com</li>
          <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +91 98765 43210</li>
          <li className="flex items-center gap-3"><MessageSquare className="w-4 h-4" /> WhatsApp Available</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
      <p>© 2026 Cleanix Freshio. All rights reserved.</p>
    </div>
  </footer>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // --- Cart Logic ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  // --- Navigation ---
  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        navigate={navigate} 
        currentPage={currentPage} 
        cartCount={cartCount} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <Home navigate={navigate} addToCart={addToCart} />}
            {currentPage === 'products' && <ProductsPage addToCart={addToCart} />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage contactSubmitted={contactSubmitted} setContactSubmitted={setContactSubmitted} />}
            {currentPage === 'checkout' && (
              <CheckoutPage 
                cartTotal={cartTotal} 
                onOrderPlaced={clearCart} 
                navigate={navigate} 
              />
            )}
            {currentPage === 'cart' && (
              <CartPage 
                cart={cart} 
                navigate={navigate} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
                cartTotal={cartTotal} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}
