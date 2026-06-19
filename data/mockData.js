export const revenueData = [
  { month: "Jul", val: 62000 },
  { month: "Aug", val: 74000 },
  { month: "Sep", val: 58000 },
  { month: "Oct", val: 89000 },
  { month: "Nov", val: 102000 },
  { month: "Dec", val: 118000 },
  { month: "Jan", val: 95000 },
  { month: "Feb", val: 107000 },
  { month: "Mar", val: 130000 },
  { month: "Apr", val: 142000 }
];

export const ordersData = [
  { id: "#ORD-1041", customer: "Priya S.", vendor: "TechZone", amount: "Rs. 13,499", status: "delivered", date: "08 May 2025", items: 2 },
  { id: "#ORD-1040", customer: "Rahul K.", vendor: "FashionHub", amount: "Rs. 1,250", status: "pending", date: "07 May 2025", items: 1 },
  { id: "#ORD-1039", customer: "Ananya M.", vendor: "FreshFarm", amount: "Rs. 640", status: "delivered", date: "07 May 2025", items: 5 },
  { id: "#ORD-1038", customer: "Vijay T.", vendor: "BookNest", amount: "Rs. 1,890", status: "cancelled", date: "06 May 2025", items: 3 },
  { id: "#ORD-1037", customer: "Sneha P.", vendor: "TechZone", amount: "Rs. 112,499", status: "delivered", date: "05 May 2025", items: 1 },
  { id: "#ORD-1036", customer: "Arjun R.", vendor: "HomeDeco", amount: "Rs. 4,200", status: "pending", date: "04 May 2025", items: 2 },
  { id: "#ORD-1035", customer: "Kavya N.", vendor: "FashionHub", amount: "Rs. 780", status: "delivered", date: "03 May 2025", items: 1 }
];

export const vendorsData = [
  { name: "TechZone", cat: "Electronics", products: 142, revenue: "Rs. 11.8L", rating: "4.7", status: "active", cls: "va-1" },
  { name: "FashionHub", cat: "Fashion", products: 230, revenue: "Rs. 96K", rating: "4.4", status: "active", cls: "va-2" },
  { name: "FreshFarm", cat: "Food", products: 68, revenue: "Rs. 42K", rating: "4.8", status: "active", cls: "va-3" },
  { name: "BookNest", cat: "Books", products: 410, revenue: "Rs. 28K", rating: "4.5", status: "suspended", cls: "va-4" },
  { name: "HomeDeco", cat: "Home & Garden", products: 95, revenue: "Rs. 61K", rating: "4.2", status: "active", cls: "va-5" }
];

export const productsData = [
  { name: "Wireless Earbuds", vendor: "TechZone", price: "Rs. 1,499", quantity: 32, stock: "In Stock", cat: "Electronics", icon: "Audio" },
  { name: "Casual Kurti", vendor: "FashionHub", price: "Rs. 650", quantity: 24, stock: "In Stock", cat: "Fashion", icon: "Wear" },
  { name: "Organic Honey", vendor: "FreshFarm", price: "Rs. 340", quantity: 7, stock: "Low Stock", cat: "Food", icon: "Food" },
  { name: "Laptop Stand", vendor: "TechZone", price: "Rs. 899", quantity: 18, stock: "In Stock", cat: "Electronics", icon: "Desk" },
  { name: "NCERT Set Gr.10", vendor: "BookNest", price: "Rs. 480", quantity: 41, stock: "In Stock", cat: "Books", icon: "Book" },
  { name: "Ceramic Planter", vendor: "HomeDeco", price: "Rs. 290", quantity: 0, stock: "Out of Stock", cat: "Home & Garden", icon: "Home" }
];

export const customersData = [
  { name: "Priya Sharma", email: "priya@gmail.com", orders: 14, spent: "Rs. 18,400", joined: "Jan 2024", status: "active" },
  { name: "Rahul Kumar", email: "rahul@gmail.com", orders: 7, spent: "Rs. 6,200", joined: "Mar 2024", status: "active" },
  { name: "Ananya Mehta", email: "ananya@email.in", orders: 21, spent: "Rs. 31,000", joined: "Nov 2023", status: "active" },
  { name: "Vijay Tiwari", email: "vijay@mail.com", orders: 3, spent: "Rs. 2,100", joined: "Apr 2025", status: "inactive" },
  { name: "Sneha Patel", email: "sneha@gmail.com", orders: 9, spent: "Rs. 14,500", joined: "Feb 2024", status: "active" }
];

export const approvalsData = [
  { name: "NatureCraft", cat: "Handicrafts", submitted: "06 May 2025", docs: "Complete" },
  { name: "SpeedBike", cat: "Sports", submitted: "05 May 2025", docs: "Pending GST" },
  { name: "GlowSkin Co.", cat: "Beauty", submitted: "04 May 2025", docs: "Complete" },
  { name: "QuickEats", cat: "Food", submitted: "03 May 2025", docs: "Complete" }
];
