export const products = [
  {
    "id": 1,
    "name": "Leather Item L1",
    "price": 120,
    "originalPrice": 180,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L1.jpg",
    "gallery": ["/Product/L1.jpg"],
    "description": "Premium handcrafted leather designed for longevity.",
    "specs": { "material": "Full-grain Leather", "origin": "Italy", "care": "Leather Conditioner" },
    "colors": [
      { "name": "Noir", "hex": "#1a1a1a" },
      { "name": "Cognac", "hex": "#8B4513" }
    ],
    "reviews": [
      { "id": 101, "user": "Elena G.", "rating": 5, "comment": "The patina develops beautifully over time.", "date": "Jan 12, 2026" },
      { "id": 102, "user": "Marcus V.", "rating": 4, "comment": "Sturdy and elegant.", "date": "Feb 01, 2026" }
    ]
  },
  {
    "id": 2,
    "name": "Leather Item L2",
    "price": 130,
    "category": "Leather Goods",
    "mainImage": "/Product/L2.jpg",
    "gallery": ["/Product/L2.jpg"],
    "description": "Elegant leather design with reinforced stitching.",
    "specs": { "material": "Top-grain Leather", "origin": "Spain", "care": "Wipe with damp cloth" },
    "colors": [
      { "name": "Tan", "hex": "#D2B48C" },
      { "name": "Coffee", "hex": "#4B3621" }
    ],
    "reviews": [
      { "id": 201, "user": "Sophia R.", "rating": 5, "comment": "Perfect size for my daily essentials.", "date": "Dec 20, 2025" }
    ]
  },
  {
    "id": 6,
    "name": "Baggage B1",
    "price": 200,
    "originalPrice": 250,
    "onSale": true,
    "category": "Bags",
    "mainImage": "/Product/B1.jpg",
    "gallery": ["/Product/B1.jpg"],
    "description": "Spacious travel bag with modular compartments.",
    "specs": { "material": "Ballistic Nylon", "origin": "Vietnam", "care": "Spot clean only" },
    "colors": [
      { "name": "Olive", "hex": "#556B2F" },
      { "name": "Charcoal", "hex": "#36454F" }
    ],
    "reviews": [
      { "id": 601, "user": "Julian P.", "rating": 5, "comment": "Best weekend bag I have ever owned.", "date": "Jan 28, 2026" },
      { "id": 602, "user": "Mia T.", "rating": 3, "comment": "A bit heavier than expected.", "date": "Feb 02, 2026" }
    ]
  },
  {
    "id": 21,
    "name": "Leather Card Holder L6",
    "price": 45,
    "originalPrice": 65,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L6.jpg",
    "gallery": ["/Product/L6.jpg"],
    "description": "Ultra-slim profile handcrafted from Italian calfskin.",
    "specs": { "material": "Calfskin", "origin": "Florence, Italy", "care": "Avoid direct sunlight" },
    "colors": [{ "name": "Espresso", "hex": "#3D2B1F" }],
    "reviews": [
      { "id": 2101, "user": "Nathan D.", "rating": 5, "comment": "Fits 6 cards easily without bulging.", "date": "Nov 15, 2025" }
    ]
  },
  {
    "id": 31,
    "name": "Urban Tote B6",
    "price": 145,
    "onSale": false,
    "category": "Bags",
    "mainImage": "/Product/B6.jpg",
    "gallery": ["/Product/B6.jpg"],
    "description": "A modern take on the classic daily tote with internal laptop sleeve.",
    "specs": { "material": "Organic Cotton Canvas", "origin": "USA", "care": "Hand wash" },
    "colors": [{ "name": "Grey", "hex": "#808080" }],
    "reviews": [
      { "id": 3101, "user": "Clara H.", "rating": 4, "comment": "Simple and clean aesthetic.", "date": "Jan 05, 2026" }
    ]
  },
  {
    "id": 22,
    "name": "Utility Belt L8",
    "price": 80,
    "originalPrice": 110,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L8.jpg",
    "gallery": ["/Product/L8.jpg"],
    "description": "Full-grain leather with a custom brushed-steel buckle.",
    "specs": { "material": "Bridle Leather", "origin": "London, UK", "care": "Buff with soft cloth" },
    "colors": [{ "name": "Black", "hex": "#000000" }],
    "reviews": [
      { "id": 2201, "user": "David W.", "rating": 5, "comment": "The most durable belt I've owned.", "date": "Jan 10, 2026" }
    ]
  },
  {
    "id": 23,
    "name": "Travel Tech Kit L9",
    "price": 95,
    "originalPrice": 130,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L9.jpg",
    "gallery": ["/Product/L9.jpg"],
    "description": "Organize your cables and chargers in premium leather.",
    "specs": { "material": "Nappa Leather", "origin": "Berlin, Germany", "care": "Store in dust bag" },
    "colors": [{ "name": "Cognac", "hex": "#8B4513" }],
    "reviews": [
      { "id": 2301, "user": "Lisa M.", "rating": 4, "comment": "Beautiful way to keep my chargers organized.", "date": "Feb 01, 2026" }
    ]
  },
  {
    "id": 24,
    "name": "Laptop Sleeve L10",
    "price": 110,
    "originalPrice": 160,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L10.jpg",
    "gallery": ["/Product/L10.jpg"],
    "description": "Padded interior with a minimalist magnetic closure.",
    "specs": { "material": "Suede-lined Leather", "origin": "Paris, France", "care": "Professional clean" },
    "colors": [{ "name": "Slate", "hex": "#708090" }],
    "reviews": []
  },
  {
    "id": 25,
    "name": "Suede Loafers L11",
    "price": 180,
    "originalPrice": 250,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L11.jpg",
    "gallery": ["/Product/L11.jpg"],
    "description": "Hand-stitched suede for effortless sophistication.",
    "specs": { "material": "Premium Suede", "origin": "Tuscany, Italy", "care": "Suede brush only" },
    "colors": [{ "name": "Sand", "hex": "#C2B280" }],
    "reviews": [
      { "id": 2501, "user": "Robert F.", "rating": 5, "comment": "Like walking on clouds. Incredible craftsmanship.", "date": "Jan 15, 2026" }
    ]
  },
  {
    "id": 26,
    "name": "Passport Cover L12",
    "price": 35,
    "originalPrice": 55,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L12.jpg",
    "gallery": ["/Product/L12.jpg"],
    "description": "The perfect travel companion for the frequent flyer.",
    "specs": { "material": "Vegetable-tanned Leather", "origin": "Stockholm, Sweden", "care": "Avoid moisture" },
    "colors": [{ "name": "Navy", "hex": "#000080" }],
    "reviews": []
  },
  {
    "id": 27,
    "name": "Weekend Duffle L13",
    "price": 320,
    "originalPrice": 450,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L13.jpg",
    "gallery": ["/Product/L13.jpg"],
    "description": "Spacious enough for a 3-day trip.",
    "specs": { "material": "Reinforced Cowhide", "origin": "Madrid, Spain", "care": "Leather balm" },
    "colors": [{ "name": "Noir", "hex": "#1a1a1a" }],
    "reviews": [
      { "id": 2701, "user": "Karen T.", "rating": 5, "comment": "Expensive, but it will last a lifetime.", "date": "Jan 20, 2026" }
    ]
  },
  {
    "id": 28,
    "name": "Desk Mat L14",
    "price": 60,
    "originalPrice": 90,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L14.jpg",
    "gallery": ["/Product/L14.jpg"],
    "description": "Elevate your workspace with this vegetable-tanned mat.",
    "specs": { "material": "Smooth Leather", "origin": "Tokyo, Japan", "care": "Dust regularly" },
    "colors": [{ "name": "Tan", "hex": "#D2B48C" }],
    "reviews": []
  },
  {
    "id": 29,
    "name": "Key Organizer L15",
    "price": 25,
    "originalPrice": 40,
    "onSale": true,
    "category": "Leather Goods",
    "mainImage": "/Product/L15.jpg",
    "gallery": ["/Product/L15.jpg"],
    "description": "No more jingling keys. Pure silence and style.",
    "specs": { "material": "Alloy & Leather", "origin": "Melbourne, Australia", "care": "No maintenance" },
    "colors": [{ "name": "Black", "hex": "#000000" }],
    "reviews": [
      { "id": 2901, "user": "Sam B.", "rating": 4, "comment": "Simple and effective.", "date": "Feb 02, 2026" }
    ]
  },
  {
    "id": 30,
    "name": "Baggage B5",
    "price": 190,
    "originalPrice": 280,
    "onSale": true,
    "category": "Bags",
    "mainImage": "/Product/B5.jpg",
    "gallery": ["/Product/B5.jpg"],
    "description": "Weather-resistant canvas with leather accents.",
    "specs": { "material": "Waxed Canvas", "origin": "Portland, USA", "care": "Rewax every 2 years" },
    "colors": [{ "name": "Forest", "hex": "#228B22" }],
    "reviews": []
  },
  {
    "id": 32,
    "name": "Commuter Pack B7",
    "price": 215,
    "onSale": false,
    "category": "Bags",
    "mainImage": "/Product/B7.jpg",
    "gallery": ["/Product/B7.jpg"],
    "description": "Ergonomic design for the city professional.",
    "specs": { "material": "Recycled Polyester", "origin": "Seoul, Korea", "care": "Wipe clean" },
    "colors": [{ "name": "Charcoal", "hex": "#36454F" }],
    "reviews": [
      { "id": 3201, "user": "Chris Z.", "rating": 5, "comment": "Fits everything for work perfectly.", "date": "Jan 30, 2026" }
    ]
  },
  {
    "id": 33,
    "name": "Crossbody B8",
    "price": 120,
    "onSale": false,
    "category": "Bags",
    "mainImage": "/Product/B8.jpg",
    "gallery": ["/Product/B8.jpg"],
    "description": "Keep your essentials close and your hands free.",
    "specs": { "material": "Pebbled Leather", "origin": "Milan, Italy", "care": "Leather cleaner" },
    "colors": [{ "name": "Mocha", "hex": "#A38068" }],
    "reviews": []
  },
  {
    "id": 34,
    "name": "Dusk Duffle B9",
    "price": 260,
    "onSale": false,
    "category": "Bags",
    "mainImage": "/Product/B9.jpg",
    "gallery": ["/Product/B9.jpg"],
    "description": "Deep navy finish with heavy-duty brass zippers.",
    "specs": { "material": "Heavyweight Twill", "origin": "London, UK", "care": "Spot clean" },
    "colors": [{ "name": "Navy", "hex": "#000080" }],
    "reviews": [
      { "id": 3401, "user": "Oliver P.", "rating": 5, "comment": "The zippers are very high quality.", "date": "Feb 01, 2026" }
    ]
  },
  {
    "id": 35,
    "name": "Silver Frame A6",
    "price": 110,
    "onSale": false,
    "category": "Accessories",
    "mainImage": "/Product/A6.jpg",
    "gallery": ["/Product/A6.jpg"],
    "description": "Polarized lenses with a premium titanium frame.",
    "specs": { "material": "Titanium", "origin": "Kyoto, Japan", "care": "Microfiber cloth only" },
    "colors": [{ "name": "Silver", "hex": "#C0C0C0" }],
    "reviews": []
  },
  {
    "id": 36,
    "name": "Midnight Watch A7",
    "price": 295,
    "onSale": false,
    "category": "Accessories",
    "mainImage": "/Product/A7.jpg",
    "gallery": ["/Product/A7.jpg"],
    "description": "Minimalist face with a genuine leather strap.",
    "specs": { "material": "Stainless Steel", "origin": "Zurich, Switzerland", "care": "Avoid extreme heat" },
    "colors": [{ "name": "Black", "hex": "#000000" }],
    "reviews": [
      { "id": 3601, "user": "Thomas K.", "rating": 5, "comment": "Truly timeless design.", "date": "Jan 28, 2026" }
    ]
  },
  {
    "id": 37,
    "name": "Silk Scarf A8",
    "price": 75,
    "onSale": false,
    "category": "Accessories",
    "mainImage": "/Product/A8.jpg",
    "gallery": ["/Product/A8.jpg"],
    "description": "100% pure silk with a hand-rolled hem.",
    "specs": { "material": "Mulberry Silk", "origin": "Lyon, France", "care": "Hand wash cold" },
    "colors": [{ "name": "Cream", "hex": "#FFFDD0" }],
    "reviews": []
  },
  {
    "id": 39,
    "name": "Chino Shorts S2",
    "price": 75,
    "onSale": false,
    "category": "Shorts",
    "mainImage": "/Product/S2.jpg",
    "gallery": ["/Product/S2.jpg"],
    "description": "Classic fit with a slight stretch for daily wear.",
    "specs": { "material": "Cotton Twill", "origin": "Lisbon, Portugal", "care": "Machine wash warm" },
    "colors": [{ "name": "Khaki", "hex": "#C3B091" }],
    "reviews": []
  },
  {
    "id": 40,
    "name": "Active Shorts S3",
    "price": 65,
    "onSale": false,
    "category": "Shorts",
    "mainImage": "/Product/S3.jpg",
    "gallery": ["/Product/S3.jpg"],
    "description": "Quick-dry fabric for the lifestyle on the move.",
    "specs": { "material": "Recycled Nylon", "origin": "Taiwan", "care": "Machine wash cold" },
    "colors": [{ "name": "Black", "hex": "#000000" }],
    "reviews": [
      { "id": 4001, "user": "Alex G.", "rating": 4, "comment": "Great for the gym and the beach.", "date": "Feb 01, 2026" }
    ]
  }
  
];