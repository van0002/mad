"use client"

import { useState } from "react"
import { Search, ShoppingCart, MapPin, Menu, Star, Heart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AmazonUI() {
  const [cartCount, setCartCount] = useState(3)

  const categories = ["Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Toys", "Beauty", "Automotive"]

  const deals = [
    {
      id: 1,
      title: "Echo Dot (5th Gen)",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.5,
      reviews: 12847,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Best Seller",
    },
    {
      id: 2,
      title: "Fire TV Stick 4K Max",
      price: 34.99,
      originalPrice: 54.99,
      rating: 4.4,
      reviews: 8932,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Limited Deal",
    },
    {
      id: 3,
      title: "Kindle Paperwhite",
      price: 94.99,
      originalPrice: 139.99,
      rating: 4.6,
      reviews: 15623,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Choice",
    },
    {
      id: 4,
      title: "AirPods Pro (2nd Gen)",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviews: 23456,
      image: "/placeholder.svg?height=200&width=200",
      badge: "Deal",
    },
  ]

  const todaysDeals = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      price: 39.99,
      originalPrice: 79.99,
      discount: 50,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 2,
      title: "Smart Watch Fitness Tracker",
      price: 89.99,
      originalPrice: 149.99,
      discount: 40,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 3,
      title: "Portable Phone Charger",
      price: 24.99,
      originalPrice: 39.99,
      discount: 38,
      image: "/placeholder.svg?height=150&width=150",
    },
    {
      id: 4,
      title: "LED Desk Lamp",
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      image: "/placeholder.svg?height=150&width=150",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        {/* Top Header */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">amazon</div>
              <div className="hidden md:flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <div>
                  <div className="text-xs text-gray-300">Deliver to</div>
                  <div className="font-semibold">New York 10001</div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="flex">
                <select className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l-md border-r border-gray-300 text-sm">
                  <option>All</option>
                  <option>Electronics</option>
                  <option>Books</option>
                  <option>Fashion</option>
                </select>
                <Input placeholder="Search Amazon" className="flex-1 rounded-none border-0 focus:ring-0" />
                <Button className="bg-orange-400 hover:bg-orange-500 rounded-r-md rounded-l-none px-4">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:block text-sm">
                <div className="text-xs text-gray-300">Hello, Sign in</div>
                <div className="font-semibold flex items-center">
                  Account & Lists <ChevronDown className="w-3 h-3 ml-1" />
                </div>
              </div>
              <div className="hidden md:block text-sm">
                <div className="text-xs text-gray-300">Returns</div>
                <div className="font-semibold">& Orders</div>
              </div>
              <div className="flex items-center relative">
                <ShoppingCart className="w-8 h-8" />
                <span className="absolute -top-1 -right-1 bg-orange-400 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
                <span className="ml-1 font-semibold hidden sm:block">Cart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-800 px-4 py-2">
          <div className="flex items-center space-x-6 max-w-7xl mx-auto">
            <Button variant="ghost" className="text-white hover:bg-gray-700 p-2">
              <Menu className="w-5 h-5 mr-2" />
              All
            </Button>
            {categories.map((category) => (
              <Button key={category} variant="ghost" className="text-white hover:bg-gray-700 text-sm hidden lg:block">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Holiday Deals</h1>
              <p className="text-xl mb-6">Save up to 70% on top brands</p>
              <Button className="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-8 py-3">Shop Now</Button>
            </div>
            <div className="hidden md:block">
              <img src="/placeholder.svg?height=300&width=400" alt="Holiday deals" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Today's Deals */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Today's Deals</h2>
            <Button variant="outline">See all deals</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {todaysDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      className="w-full h-32 object-cover rounded"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500">{deal.discount}% off</Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{deal.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-red-600">${deal.price}</span>
                    <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded"
                    />
                    <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-orange-400 text-black">{product.badge}</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl font-bold">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <img
                    src={`/placeholder.svg?height=100&width=100`}
                    alt={category}
                    className="w-16 h-16 mx-auto mb-3 rounded-full"
                  />
                  <h3 className="font-semibold">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Amazon
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Investor Relations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Sell products on Amazon
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sell on Amazon Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sell apps on Amazon
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Become an Affiliate
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Amazon Payment Products</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Amazon Business Card
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shop with Points
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Reload Your Balance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Amazon Currency Converter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Amazon and COVID-19
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Your Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Your Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shipping Rates & Policies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <div className="text-2xl font-bold mb-4">amazon</div>
            <p className="text-sm text-gray-400">© 2024, Amazon.com, Inc. or its affiliates</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
