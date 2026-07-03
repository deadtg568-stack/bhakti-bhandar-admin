import type { Product, Category } from '@/types'

export const categories: Category[] = [
  { id: 'c1', name: 'Puja Thalis', icon: '🪔', banner: '/placeholder-banner.jpg', subCategories: ['Silver Thali', 'Brass Thali', 'Wedding Thali'], productCount: 24 },
  { id: 'c2', name: 'Hawan Samagri', icon: '🔥', banner: '/placeholder-banner.jpg', subCategories: ['Havan Kund', 'Samidha', 'Ghee & Oils'], productCount: 38 },
  { id: 'c3', name: 'Idols & Murtis', icon: '🕉️', banner: '/placeholder-banner.jpg', subCategories: ['Marble', 'Brass', 'Panchdhatu'], productCount: 51 },
  { id: 'c4', name: 'Incense & Dhoop', icon: '🪵', banner: '/placeholder-banner.jpg', subCategories: ['Agarbatti', 'Dhoop Sticks', 'Cones'], productCount: 62 },
  { id: 'c5', name: 'Books & Scriptures', icon: '📖', banner: '/placeholder-banner.jpg', subCategories: ['Chalisa', 'Gita', 'Ramayan'], productCount: 19 },
  { id: 'c6', name: 'Rudraksha & Malas', icon: '📿', banner: '/placeholder-banner.jpg', subCategories: ['5 Mukhi', 'Rudraksha Mala', 'Tulsi Mala'], productCount: 33 },
]

const names = [
  'Silver Plated Puja Thali Set', 'Panchmukhi Hawan Kund (10 inch)', 'Brass Ganesh Murti',
  'Pure Cow Ghee Diya Set (24pc)', 'Sandalwood Agarbatti Pack', 'Rudraksha Mala (5 Mukhi, 108 beads)',
  'Shrimad Bhagavad Gita (Hindi)', 'Kumkum & Haldi Combo', 'Marble Laxmi-Ganesh Idol',
  'Camphor Cubes (100g)', 'Copper Kalash with Lid', 'Tulsi Mala 108 Beads',
  'Havan Samagri Kit (1kg)', 'Panchdhatu Hanuman Murti', 'Dhoop Cone Box (Sandalwood)',
  'Silver Coin - Lakshmi Ganesh (10g)', 'Cotton Wicks (Batti) Pack', 'Brass Bell (Ghanti) Medium',
  'Navgraha Samidha Set', 'Red Chunri with Border', 'Ashtagandha Powder 50g',
  'Sri Yantra Copper Plate', 'Panchamrit Bowl Set', 'Wooden Chowki (Bajot) 12 inch',
]

const brands = ['Divine Crafts', 'ShubhLabh', 'Ved Poojan', 'Nityanand', 'Sanatan Store']

function seedRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

const rand = seedRandom(42)

export const products: Product[] = Array.from({ length: 48 }).map((_, i) => {
  const mrp = Math.round(150 + rand() * 2500)
  const discountPct = Math.round(rand() * 35)
  const price = Math.round(mrp * (1 - discountPct / 100))
  const stock = Math.round(rand() * 120)
  const cat = categories[i % categories.length]
  const status: Product['status'] = stock === 0 ? 'out_of_stock' : rand() > 0.85 ? 'draft' : 'active'
  return {
    id: `p${i + 1}`,
    name: names[i % names.length] + (i >= names.length ? ` — Style ${Math.floor(i / names.length) + 1}` : ''),
    sku: `BB-${(1000 + i).toString()}`,
    barcode: `8901234${(56000 + i).toString()}`,
    category: cat.name,
    subCategory: cat.subCategories[i % cat.subCategories.length],
    brand: brands[i % brands.length],
    images: ['/placeholder-product.jpg'],
    mrp,
    price,
    discountPct,
    gstPct: [0, 5, 12, 18][i % 4],
    stock,
    status,
    variants:
      i % 5 === 0
        ? [
            { id: `${i}-v1`, name: 'Small', sku: `BB-${1000 + i}-S`, stock: Math.round(rand() * 40), mrp, price },
            { id: `${i}-v2`, name: 'Large', sku: `BB-${1000 + i}-L`, stock: Math.round(rand() * 40), mrp: mrp + 200, price: price + 180 },
          ]
        : [],
    createdAt: new Date(2026, (i % 6) + 1, (i % 27) + 1).toISOString(),
  }
})
