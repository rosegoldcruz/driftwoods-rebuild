'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight, Utensils, Wine, Clock, Sun } from 'lucide-react'
import Image from 'next/image'

// Picture Menu Data - All 8 images organized into 4 sections
const pictureMenus = [
  {
    id: 'food',
    name: 'Food Menu',
    icon: Utensils,
    images: [
      '/menus/beach-themed-restaurant-sports-grill-menu-layout.jpg',
      '/menus/coastal-restaurant-menu-salads-entrees-pastas-desserts.jpg'
    ]
  },
  {
    id: 'drinks',
    name: 'Drinks Menu',
    icon: Wine,
    images: [
      '/menus/seaside-sports-grill-drinks-menu-beer-wine-prices.jpg',
      '/menus/coastal-cocktail-menu-driftwoods-restaurant-sports-grill.jpg'
    ]
  },
  {
    id: 'happyhour',
    name: 'Happy Hour & Daily Specials',
    icon: Clock,
    images: [
      '/menus/happy-hour-restaurant-menu-sports-grill-specials.jpg',
      '/menus/daily-seaside-specials-menu-happy-hour-coastal-restaurant.jpg'
    ]
  },
  {
    id: 'brunch',
    name: 'Brunch Menu',
    icon: Sun,
    images: [
      '/menus/driftwoods-coastal-cravings-brunch-menu-breakfast-items.jpg',
      '/menus/coastal-brunch-menu-with-appetizers-and-cocktails.jpg'
    ]
  }
]

// REAL Driftwoods Menu Data
const menuCategories = [
  {
    id: 'starters',
    name: 'Shoreline Starters',
    description: 'Start your coastal journey',
    items: [
      { name: 'Surfside Ceviche', description: 'Fresh fish marinated in citrus, jalapeño, cilantro, red onion, served with tortilla chips', price: '$16' },
      { name: 'Steak Bites', description: 'Seasoned beef tips, sautéed peppers & onions, chimichurri', price: '$18' },
      { name: 'Coastal Calamari', description: 'Lightly breaded, fried golden, served with marinara & chipotle aioli', price: '$15' },
      { name: 'Beach Nachos', description: 'Tortilla chips, queso, jalapeños, pico de gallo, sour cream, guacamole. Add chicken $5, Add steak $7', price: '$14' },
      { name: 'Riptide Ribs', description: 'Slow-smoked baby back ribs, house BBQ glaze', price: '$16' },
      { name: 'Pier Pretzels', description: 'Warm soft pretzels, beer cheese, honey mustard', price: '$12' },
      { name: 'Tsunami Tots', description: 'Crispy tots loaded with cheese, bacon, green onion, ranch', price: '$11' },
      { name: 'Mahi Mahi Bites', description: 'Beer-battered mahi mahi, served with tartar sauce', price: '$15' },
      { name: 'Coconut Shrimp', description: 'Crispy coconut-crusted shrimp, sweet chili sauce', price: '$14' },
      { name: 'Driftwood Wings', description: 'Crispy chicken wings, choice of buffalo, BBQ, garlic parm, or mango habanero', price: '$15' },
      { name: 'Spinach & Artichoke Dip', description: 'Creamy blend of spinach, artichoke, parmesan, served with tortilla chips', price: '$13' }
    ]
  },
  {
    id: 'handhelds',
    name: 'High Tide Handhelds',
    description: 'Served with seaside fries',
    items: [
      { name: 'Driftwood Burger', description: 'Half-pound Angus beef, lettuce, tomato, onion, pickle, brioche bun. Add cheese $1, Add bacon $2', price: '$16' },
      { name: 'Fish Tacos', description: 'Grilled or blackened mahi, cabbage slaw, chipotle crema, flour tortillas (3)', price: '$17' },
      { name: 'Shrimp Po\'Boy', description: 'Crispy fried shrimp, lettuce, tomato, remoulade, hoagie roll', price: '$16' },
      { name: 'Mahi Mahi Sandwich', description: 'Grilled or blackened, lettuce, tomato, tartar, brioche bun', price: '$18' },
      { name: 'Chicken Sandwich', description: 'Grilled or crispy, lettuce, tomato, pickle, brioche bun', price: '$15' },
      { name: 'Philly Cheesesteak', description: 'Shaved ribeye, peppers, onions, provolone, hoagie roll', price: '$17' },
      { name: 'Club Wrap', description: 'Turkey, ham, bacon, lettuce, tomato, mayo, flour tortilla', price: '$15' },
      { name: 'BBQ Pulled Pork', description: 'Slow-smoked pulled pork, house BBQ, coleslaw, brioche bun', price: '$15' }
    ]
  },
  {
    id: 'salads',
    name: 'Surf Side Salads',
    description: 'Fresh & light',
    items: [
      { name: 'Coastal Cobb', description: 'Mixed greens, grilled chicken, bacon, egg, avocado, tomato, blue cheese crumbles, ranch', price: '$16' },
      { name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, caesar dressing. Add chicken $5, Add shrimp $7', price: '$12' },
      { name: 'Ahi Tuna Salad', description: 'Seared ahi tuna, mixed greens, mango, avocado, wonton strips, sesame ginger dressing', price: '$19' },
      { name: 'House Salad', description: 'Mixed greens, tomato, cucumber, red onion, croutons, choice of dressing', price: '$9' }
    ]
  },
  {
    id: 'entrees',
    name: 'Entrees',
    description: 'Coastal favorites',
    items: [
      { name: 'Grilled Salmon', description: 'Atlantic salmon, lemon dill butter, seasonal vegetables, rice pilaf', price: '$26' },
      { name: 'Fish & Chips', description: 'Beer-battered cod, seaside fries, coleslaw, tartar sauce', price: '$18' },
      { name: 'Coconut Mahi Mahi', description: 'Pan-seared mahi, coconut curry sauce, jasmine rice, vegetables', price: '$24' },
      { name: 'NY Strip Steak', description: '12oz NY strip, garlic herb butter, mashed potatoes, seasonal vegetables', price: '$32' },
      { name: 'Surf & Turf', description: '8oz filet mignon, grilled shrimp skewer, mashed potatoes, vegetables', price: '$38' }
    ]
  },
  {
    id: 'pastas',
    name: 'Pastas',
    description: 'House favorites',
    items: [
      { name: 'Shrimp Scampi', description: 'Sautéed shrimp, garlic butter, white wine, lemon, linguine', price: '$22' },
      { name: 'Chicken Alfredo', description: 'Grilled chicken, creamy parmesan sauce, fettuccine', price: '$18' },
      { name: 'Seafood Pasta', description: 'Shrimp, mussels, calamari, marinara sauce, linguine', price: '$24' },
      { name: 'Penne Vodka', description: 'Penne pasta, creamy tomato vodka sauce, parmesan. Add chicken $5', price: '$16' }
    ]
  },
  {
    id: 'sides',
    name: 'Sun Kissed Sides',
    description: 'Perfect additions',
    items: [
      { name: 'Seaside Fries', description: 'Crispy golden fries', price: '$5' },
      { name: 'Sweet Potato Fries', description: 'Crispy sweet potato fries', price: '$6' },
      { name: 'Onion Rings', description: 'Beer-battered onion rings', price: '$7' },
      { name: 'Coleslaw', description: 'Creamy house coleslaw', price: '$4' },
      { name: 'Rice Pilaf', description: 'Seasoned rice pilaf', price: '$5' },
      { name: 'Seasonal Vegetables', description: 'Chef\'s seasonal selection', price: '$6' },
      { name: 'Mac & Cheese', description: 'Creamy four-cheese blend', price: '$7' },
      { name: '🌊 LOAD EM UP!', description: 'Load up your fries! Add Pulled Pork, Cheese Fondue, Pico, & Guac to your side of Fries!', price: 'Ask Server' }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet endings',
    items: [
      { name: 'Key Lime Pie', description: 'Classic key lime pie, whipped cream, graham cracker crust', price: '$9' },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake, molten center, vanilla ice cream', price: '$10' }
    ]
  },
  {
    id: 'drinks',
    name: 'Seaside Sips',
    description: 'Refreshing beverages',
    items: [
      { name: 'Draft Beers', description: 'Rotating selection of local and domestic drafts', price: '$6-$9' },
      { name: 'Domestic Bottles', description: 'Bud Light, Budweiser, Coors Light, Miller Lite', price: '$5' },
      { name: 'Import/Craft Bottles', description: 'Corona, Modelo, Heineken, Blue Moon, and more', price: '$6-$8' },
      { name: 'House Wine', description: 'Chardonnay, Pinot Grigio, Cabernet, Merlot', price: '$8' },
      { name: 'Premium Wine', description: 'Ask your server for our premium selection', price: '$10-$14' },
      { name: 'Soft Drinks', description: 'Coke, Diet Coke, Sprite, Lemonade, Iced Tea', price: '$3' }
    ]
  },
  {
    id: 'cocktails',
    name: 'Coastal Cocktails',
    description: 'Handcrafted drinks',
    items: [
      { name: 'Driftwood Margarita', description: 'Tequila, triple sec, fresh lime, salt rim', price: '$12' },
      { name: 'Pier Punch', description: 'Rum, coconut, pineapple, orange juice, grenadine', price: '$13' },
      { name: 'Beach Cruiser', description: 'Vodka, peach schnapps, cranberry, orange juice', price: '$11' },
      { name: 'Mango Tango', description: 'Mango rum, lime, mango puree, tajin rim', price: '$12' },
      { name: 'Sunset Sangria', description: 'Red or white wine, brandy, fresh fruit', price: '$10' },
      { name: 'Mojito', description: 'White rum, fresh mint, lime, soda', price: '$11' },
      { name: 'Paloma', description: 'Tequila, grapefruit, lime, salt rim', price: '$11' },
      { name: 'Long Island', description: 'Vodka, gin, rum, tequila, triple sec, sour, cola', price: '$14' },
      { name: 'Miami Vice', description: 'Half piña colada, half strawberry daiquiri', price: '$13' },
      { name: 'Piña Colada', description: 'Rum, coconut cream, pineapple juice', price: '$12' },
      { name: 'Strawberry Daiquiri', description: 'Rum, strawberry, lime, blended', price: '$11' },
      { name: 'Blue Hawaiian', description: 'Rum, blue curaçao, coconut, pineapple', price: '$12' },
      { name: 'Tequila Sunrise', description: 'Tequila, orange juice, grenadine', price: '$10' },
      { name: 'Bay Breeze', description: 'Vodka, cranberry, pineapple juice', price: '$10' }
    ]
  },
  {
    id: 'happyhour',
    name: 'Happy Hour',
    description: 'Mon-Fri 3pm-6pm',
    items: [
      { name: 'Draft Beer', description: 'All domestic drafts', price: '$4' },
      { name: 'House Wine', description: 'Glass of house red or white', price: '$5' },
      { name: 'Well Drinks', description: 'All well cocktails', price: '$5' },
      { name: 'House Margarita', description: 'Classic lime margarita', price: '$6' },
      { name: 'Driftwood Wings', description: 'Half-dozen wings, choice of sauce', price: '$8' },
      { name: 'Pier Pretzels', description: 'Warm pretzels, beer cheese', price: '$7' },
      { name: 'Tsunami Tots', description: 'Loaded tater tots', price: '$7' }
    ]
  },
  {
    id: 'specials',
    name: 'Daily Seaside Specials',
    description: 'Something special every day',
    items: [
      { name: 'Monday - Taco Night', description: '$3 tacos, $5 margaritas', price: '' },
      { name: 'Tuesday - Wing Night', description: '75¢ wings, $4 domestic drafts', price: '' },
      { name: 'Wednesday - Burger Day', description: 'Half-price burgers, $5 craft beers', price: '' },
      { name: 'Thursday - Steak Night', description: '$22 NY strip dinner, $6 wine', price: '' },
      { name: 'Friday - Fish Fry', description: '$14 fish & chips, $5 well drinks', price: '' },
      { name: 'Weekend - Brunch', description: 'Sat & Sun 10am-2pm, $6 mimosas & bloody marys', price: '' }
    ]
  },
  {
    id: 'brunch',
    name: 'Coastal Cravings Brunch',
    description: 'Sat & Sun 10am-2pm',
    items: [
      { name: 'Huevo Mexicana', description: 'Scrambled eggs, chorizo, peppers, onions, cheese, served with rice & beans, flour tortillas', price: '$14' },
      { name: 'Beach Benny', description: 'Poached eggs, Canadian bacon, hollandaise, English muffin, home fries', price: '$15' },
      { name: 'Crab Cake Benedict', description: 'Poached eggs, house crab cakes, hollandaise, English muffin, home fries', price: '$18' },
      { name: 'Coastal Omelet', description: 'Three eggs, choice of fillings: cheese, ham, bacon, peppers, onions, mushrooms, tomato', price: '$13' },
      { name: 'Steak & Eggs', description: '8oz sirloin, two eggs any style, home fries, toast', price: '$19' },
      { name: 'Chicken & Waffles', description: 'Crispy fried chicken, Belgian waffle, maple syrup, honey butter', price: '$16' },
      { name: 'Shrimp & Grits', description: 'Sautéed shrimp, creamy cheddar grits, andouille sausage, cajun cream', price: '$17' },
      { name: 'Breakfast Burrito', description: 'Scrambled eggs, bacon, cheese, potatoes, pico, wrapped in flour tortilla', price: '$13' },
      { name: 'Avocado Toast', description: 'Smashed avocado, poached eggs, everything seasoning, sourdough', price: '$12' },
      { name: 'Breakfast Tacos', description: 'Three tacos, scrambled eggs, bacon, cheese, pico de gallo', price: '$12' },
      { name: 'Belgian Waffle', description: 'Fresh Belgian waffle, whipped cream, fresh berries, maple syrup', price: '$11' },
      { name: 'Pancake Stack', description: 'Three fluffy buttermilk pancakes, butter, maple syrup', price: '$10' },
      { name: 'French Toast', description: 'Thick-cut brioche, cinnamon, vanilla, powdered sugar, maple syrup', price: '$12' },
      { name: 'Biscuits & Gravy', description: 'Buttermilk biscuits, house sausage gravy, two eggs any style', price: '$12' },
      { name: 'Breakfast Quesadilla', description: 'Scrambled eggs, bacon, cheese, peppers, onions, salsa, sour cream', price: '$13' },
      { name: 'Sunrise Salad', description: 'Mixed greens, grilled chicken, bacon, avocado, egg, honey mustard', price: '$14' }
    ]
  },
  {
    id: 'brunch-sides',
    name: 'A La Carte',
    description: 'Brunch additions',
    items: [
      { name: 'Two Eggs Any Style', description: '', price: '$4' },
      { name: 'Bacon or Sausage', description: '', price: '$5' },
      { name: 'Home Fries', description: '', price: '$4' },
      { name: 'Toast or English Muffin', description: '', price: '$3' },
      { name: 'Fresh Fruit', description: '', price: '$5' },
      { name: 'Side of Grits', description: '', price: '$4' },
      { name: 'Mimosa', description: 'Champagne, fresh OJ', price: '$6' },
      { name: 'Bloody Mary', description: 'House vodka, bloody mix, celery, olives', price: '$6' }
    ]
  }
]

// Picture Menu Viewer Component with Zoom
function PictureMenuViewer({ 
  menu, 
  isOpen, 
  onClose 
}: { 
  menu: typeof pictureMenus[0] | null
  isOpen: boolean
  onClose: () => void 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      setIsZoomed(false)
    }
  }, [isOpen, menu])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrentImageIndex(prev => Math.max(0, prev - 1))
      if (e.key === 'ArrowRight' && menu) {
        setCurrentImageIndex(prev => Math.min(menu.images.length - 1, prev + 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, menu, onClose])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return
    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  if (!menu) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={onClose}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-white text-xl font-semibold flex items-center gap-2">
              <menu.icon className="w-5 h-5 text-amber-500" />
              {menu.name}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm hidden md:block">
                Click image to zoom • Arrow keys to navigate • ESC to close
              </span>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div 
            className="flex-1 flex items-center justify-center p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Navigation Arrows */}
              {menu.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentImageIndex === 0}
                    className="absolute left-2 md:left-8 z-10 p-2 md:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.min(menu.images.length - 1, prev + 1))}
                    disabled={currentImageIndex === menu.images.length - 1}
                    className="absolute right-2 md:right-8 z-10 p-2 md:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <div
                ref={imageContainerRef}
                className={`relative max-w-full max-h-full cursor-${isZoomed ? 'zoom-out' : 'zoom-in'} overflow-hidden`}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
                style={{
                  width: isZoomed ? '100%' : 'auto',
                  height: isZoomed ? '100%' : 'auto'
                }}
              >
                <img
                  src={menu.images[currentImageIndex]}
                  alt={`${menu.name} - Page ${currentImageIndex + 1}`}
                  className={`transition-transform duration-300 ${
                    isZoomed 
                      ? 'w-full h-full object-contain scale-150' 
                      : 'max-w-full max-h-[75vh] object-contain'
                  }`}
                  style={isZoomed ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : undefined}
                />
                {!isZoomed && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <ZoomIn className="w-4 h-4" />
                    <span className="hidden md:inline">Click to zoom</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {menu.images.length > 1 && (
            <div className="p-4 border-t border-white/10">
              <div className="flex justify-center gap-4">
                {menu.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(idx)
                      setIsZoomed(false)
                    }}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex 
                        ? 'border-amber-500 scale-105' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Page ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function MenuPage() {
  const [selectedPictureMenu, setSelectedPictureMenu] = useState<typeof pictureMenus[0] | null>(null)
  const [activeCategory, setActiveCategory] = useState('starters')

  return (
    <main className="min-h-screen bg-[#0a1628]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/food-menu-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a1628]" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Fresh coastal flavors crafted with care
          </motion.p>
        </div>
      </section>

      {/* Picture Menu Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
          >
            View Full Picture Menus
          </motion.h2>
          <p className="text-white/60 text-center mb-10 max-w-2xl mx-auto">
            Click any menu below to view full-size images with zoom functionality
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {pictureMenus.map((menu, idx) => (
              <motion.button
                key={menu.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedPictureMenu(menu)}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:scale-105 text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <menu.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{menu.name}</h3>
                <p className="text-white/50 text-sm">{menu.images.length} pages</p>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5 text-amber-500" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Order Online CTA */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.a
            href="https://order.toasttab.com/online/the-pier-driftwoods"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="block bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-center hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Order Online Now
            </h3>
            <p className="text-white/90">
              Skip the wait — place your order for pickup or delivery
            </p>
          </motion.a>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-16 z-30 bg-[#0a1628]/95 backdrop-blur-md border-y border-white/10 py-4">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {menuCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              id={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-32"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {category.name}
                </h2>
                <p className="text-amber-500">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {category.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-amber-500/30 transition-colors"
                    itemScope
                    itemType="https://schema.org/MenuItem"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 
                          className="text-white font-semibold text-lg"
                          itemProp="name"
                        >
                          {item.name}
                        </h3>
                        <p 
                          className="text-white/60 text-sm mt-1"
                          itemProp="description"
                        >
                          {item.description}
                        </p>
                      </div>
                      {item.price && (
                        <span 
                          className="text-amber-500 font-bold text-lg whitespace-nowrap"
                          itemProp="offers"
                          itemScope
                          itemType="https://schema.org/Offer"
                        >
                          <span itemProp="price">{item.price}</span>
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Order?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join us at the pier or order online for pickup and delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://order.toasttab.com/online/the-pier-driftwoods"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-full hover:scale-105 transition-transform"
            >
              Order Online Now
            </a>
            <a
              href="tel:+14809876543"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              Call to Order
            </a>
          </div>
        </div>
      </section>

      {/* Picture Menu Viewer Modal */}
      <PictureMenuViewer
        menu={selectedPictureMenu}
        isOpen={!!selectedPictureMenu}
        onClose={() => setSelectedPictureMenu(null)}
      />
    </main>
  )
}
