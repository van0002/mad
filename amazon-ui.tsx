"use client"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  ShoppingCart,
  MapPin,
  Menu,
  Star,
  Heart,
  ChevronDown,
  X,
  SlidersHorizontal,
  Clock,
  TrendingUp,
  ExternalLink,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AmazonUI() {
  const [cartCount, setCartCount] = useState(3)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Sample Item",
      price: 29.99,
      quantity: 2,
      image: "/amazon-echo-dot-5th-generation-smart-speaker.jpg",
      platform: "amazon",
    },
  ])
  const [showCart, setShowCart] = useState(false)
  const [currentView, setCurrentView] = useState("home") // 'home', 'category', 'search', 'product'
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Advanced search states
  const [searchInput, setSearchInput] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState(["wireless headphones", "laptop", "coffee maker", "yoga mat"])
  const [trendingSearches] = useState([
    "iPhone 15",
    "Nintendo Switch",
    "Air Fryer",
    "MacBook Air",
    "AirPods Pro",
    "Smart Watch",
    "Robot Vacuum",
    "Gaming Chair",
  ])
  const searchInputRef = useRef(null)

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000 },
    rating: 0,
    brands: [],
    platforms: [], // New filter for platforms
    sortBy: "relevance", // relevance, price-low, price-high, rating, newest
    category: "All",
    inStock: false,
    freeShipping: false,
    primeEligible: false,
  })

  const categories = ["Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Toys", "Beauty", "Automotive"]

  // Platform configurations
  const platforms = {
    amazon: {
      name: "Amazon",
      color: "bg-orange-500",
      textColor: "text-orange-600",
      logo: "🛒",
      features: ["Prime Delivery", "Easy Returns", "Customer Service"],
    },
    flipkart: {
      name: "Flipkart",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      logo: "🛍️",
      features: ["Plus Membership", "No Cost EMI", "Flipkart Assured"],
    },
    myntra: {
      name: "Myntra",
      color: "bg-pink-500",
      textColor: "text-pink-600",
      logo: "👗",
      features: ["Fashion Forward", "Easy Exchange", "Insider Benefits"],
    },
  }

  // Extract unique brands from products
  const getAllBrands = () => {
    const brands = new Set()
    allProducts.forEach((product) => {
      if (product.brand) brands.add(product.brand)
    })
    return Array.from(brands).sort()
  }

  // Get unique platforms
  const getAllPlatforms = () => {
    return Object.keys(platforms)
  }

  // Generate search suggestions based on input
  const generateSuggestions = (input) => {
    if (!input.trim()) return []

    const inputLower = input.toLowerCase()
    const productSuggestions = []
    const brandSuggestions = []
    const categorySuggestions = []

    // Product title suggestions
    allProducts.forEach((product) => {
      if (product.title.toLowerCase().includes(inputLower)) {
        productSuggestions.push({
          type: "product",
          text: product.title,
          category: product.category,
          image: product.image,
          platform: product.platform,
        })
      }
    })

    // Brand suggestions
    getAllBrands().forEach((brand) => {
      if (brand.toLowerCase().includes(inputLower)) {
        brandSuggestions.push({
          type: "brand",
          text: brand,
          category: "Brand",
        })
      }
    })

    // Category suggestions
    categories.forEach((category) => {
      if (category.toLowerCase().includes(inputLower)) {
        categorySuggestions.push({
          type: "category",
          text: category,
          category: "Category",
        })
      }
    })

    // Feature/keyword suggestions
    const featureSuggestions = []
    const keywords = ["wireless", "bluetooth", "smart", "portable", "professional", "premium", "gaming", "fitness"]
    keywords.forEach((keyword) => {
      if (keyword.includes(inputLower) || inputLower.includes(keyword)) {
        featureSuggestions.push({
          type: "keyword",
          text: `${keyword} products`,
          category: "Suggestion",
        })
      }
    })

    // Combine and limit suggestions
    return [
      ...productSuggestions.slice(0, 4),
      ...brandSuggestions.slice(0, 2),
      ...categorySuggestions.slice(0, 2),
      ...featureSuggestions.slice(0, 2),
    ].slice(0, 8)
  }

  // Handle search input changes
  const handleSearchInputChange = (value) => {
    setSearchInput(value)
    if (value.trim()) {
      const newSuggestions = generateSuggestions(value)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setSearchInput(suggestion.text)
    setShowSuggestions(false)
    handleSearch(suggestion.text)
  }

  // Handle recent search selection
  const handleRecentSearchSelect = (search) => {
    setSearchInput(search)
    setShowSuggestions(false)
    handleSearch(search)
  }

  // Add to recent searches
  const addToRecentSearches = (query) => {
    if (query.trim()) {
      setRecentSearches((prev) => {
        const filtered = prev.filter((search) => search !== query)
        return [query, ...filtered].slice(0, 5)
      })
    }
  }

  // Click outside handler for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Massive product catalog with multi-platform products
  const allProducts = [
    // Amazon Products
    {
      id: 1,
      title: "Echo Dot (5th Gen) - Smart Speaker with Alexa",
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.5,
      reviews: 12847,
      image: "/amazon-echo-dot-5th-generation-smart-speaker.jpg",
      badge: "Best Seller",
      category: "Electronics",
      brand: "Amazon",
      platform: "amazon",
      platformUrl: "https://amazon.com/dp/B09B8V1LZ3",
      description:
        "Smart speaker with Alexa - Charcoal. Bigger vibrant sound - Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room.",
      features: ["Voice control with Alexa", "Improved audio", "Smart home hub", "Compact design"],
      inStock: true,
      stockCount: 50,
      freeShipping: true,
      primeEligible: true,
      keywords: ["smart", "speaker", "alexa", "voice", "wireless"],
      seller: "Amazon.com",
      warranty: "1 Year Limited Warranty",
    },
    {
      id: 2,
      title: "Fire TV Stick 4K Max - Streaming Device",
      price: 34.99,
      originalPrice: 54.99,
      rating: 4.4,
      reviews: 8932,
      image: "/amazon-fire-tv-stick-4k-max-streaming-device.jpg",
      badge: "Limited Deal",
      category: "Electronics",
      brand: "Amazon",
      platform: "amazon",
      platformUrl: "https://amazon.com/dp/B08QTXZN5N",
      description:
        "Our most powerful streaming stick - 40% more powerful than Fire TV Stick 4K, with faster app starts and more fluid navigation.",
      features: ["4K Ultra HD", "Dolby Vision", "HDR10+", "Alexa Voice Remote"],
      inStock: true,
      stockCount: 25,
      freeShipping: true,
      primeEligible: true,
      keywords: ["streaming", "4k", "tv", "stick", "entertainment"],
      seller: "Amazon.com",
      warranty: "1 Year Limited Warranty",
    },

    // Flipkart Products
    {
      id: 101,
      title: "Samsung Galaxy S24 Ultra 5G (Titanium Black, 256GB)",
      price: 1099.99,
      originalPrice: 1199.99,
      rating: 4.7,
      reviews: 34567,
      image: "/samsung-galaxy-s24-ultra-smartphone.jpg",
      badge: "Flipkart Assured",
      category: "Electronics",
      brand: "Samsung",
      platform: "flipkart",
      platformUrl: "https://flipkart.com/samsung-galaxy-s24-ultra",
      description:
        "Galaxy S24 Ultra with S Pen, 200MP camera, and AI-powered features. Experience the future of mobile technology.",
      features: ["S Pen included", "200MP camera", "AI features", "5000mAh battery", "5G Ready"],
      inStock: true,
      stockCount: 45,
      freeShipping: true,
      primeEligible: false,
      keywords: ["smartphone", "android", "galaxy", "phone", "camera", "5g"],
      seller: "Samsung India",
      warranty: "1 Year Manufacturer Warranty",
      flipkartPlus: true,
      emi: "No Cost EMI available",
    },
    {
      id: 102,
      title: "Apple MacBook Air M3 Chip (13-inch, 8GB RAM, 256GB SSD)",
      price: 1099.99,
      originalPrice: 1199.99,
      rating: 4.9,
      reviews: 12345,
      image: "/apple-macbook-air-m3-laptop.jpg",
      badge: "Best Seller",
      category: "Electronics",
      brand: "Apple",
      platform: "flipkart",
      platformUrl: "https://flipkart.com/apple-macbook-air-m3",
      description:
        "MacBook Air with M3 chip delivers incredible performance and all-day battery life. Perfect for professionals and students.",
      features: ["M3 chip", "18-hour battery", "Liquid Retina display", "MagSafe charging", "Touch ID"],
      inStock: true,
      stockCount: 20,
      freeShipping: true,
      primeEligible: false,
      keywords: ["laptop", "macbook", "computer", "portable", "professional", "apple"],
      seller: "Apple India",
      warranty: "1 Year International Warranty",
      flipkartPlus: true,
      emi: "No Cost EMI from ₹9,167/month",
    },
    {
      id: 103,
      title: "OnePlus 12R 5G (Cool Blue, 128GB Storage, 8GB RAM)",
      price: 599.99,
      originalPrice: 699.99,
      rating: 4.6,
      reviews: 28934,
      image: "/placeholder-b5qq1.png",
      badge: "Flipkart Choice",
      category: "Electronics",
      brand: "OnePlus",
      platform: "flipkart",
      platformUrl: "https://flipkart.com/oneplus-12r-5g",
      description: "OnePlus 12R 5G with flagship performance, stunning display, and ultra-fast charging capabilities.",
      features: ["Snapdragon 8 Gen 2", "120Hz AMOLED", "100W SuperVOOC", "50MP Triple Camera", "5G Ready"],
      inStock: true,
      stockCount: 67,
      freeShipping: true,
      primeEligible: false,
      keywords: ["oneplus", "smartphone", "5g", "android", "fast", "charging"],
      seller: "OnePlus India",
      warranty: "1 Year Manufacturer Warranty",
      flipkartPlus: true,
      emi: "No Cost EMI from ₹5,000/month",
    },

    // Myntra Fashion Products
    {
      id: 201,
      title: "Roadster Men's Slim Fit Casual Shirt - Blue Checkered",
      price: 24.99,
      originalPrice: 49.99,
      rating: 4.3,
      reviews: 5432,
      image: "/mens-casual-button-down-shirt.jpg",
      badge: "Myntra Insider",
      category: "Fashion",
      brand: "Roadster",
      platform: "myntra",
      platformUrl: "https://myntra.com/roadster-casual-shirt",
      description:
        "Comfortable cotton casual shirt perfect for everyday wear. Features a modern slim fit and classic checkered pattern.",
      features: ["100% Cotton", "Slim fit", "Checkered pattern", "Machine washable", "Casual wear"],
      inStock: true,
      stockCount: 120,
      freeShipping: true,
      primeEligible: false,
      keywords: ["shirt", "casual", "men", "cotton", "checkered", "slim"],
      seller: "Roadster",
      warranty: "30 Days Easy Exchange",
      myntraInsider: true,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 202,
      title: "Nike Women's Air Max 270 Running Shoes - White/Pink",
      price: 89.99,
      originalPrice: 120.0,
      rating: 4.5,
      reviews: 8765,
      image: "/womens-athletic-running-shoes.jpg",
      badge: "Best Seller",
      category: "Fashion",
      brand: "Nike",
      platform: "myntra",
      platformUrl: "https://myntra.com/nike-air-max-270",
      description:
        "Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for running and casual wear.",
      features: ["Air Max cushioning", "Breathable mesh", "Lightweight design", "Durable outsole", "Iconic style"],
      inStock: true,
      stockCount: 150,
      freeShipping: true,
      primeEligible: false,
      keywords: ["shoes", "running", "athletic", "fitness", "sneakers", "nike"],
      seller: "Nike India",
      warranty: "6 Months Warranty",
      myntraInsider: true,
      sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
    },
    {
      id: 203,
      title: "H&M Women's Floral Print Summer Dress - Multicolor",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.4,
      reviews: 4567,
      image: "/womens-summer-dress-casual.jpg",
      badge: "Trending",
      category: "Fashion",
      brand: "H&M",
      platform: "myntra",
      platformUrl: "https://myntra.com/hm-floral-dress",
      description:
        "Flowy summer dress made from lightweight fabric with beautiful floral print. Perfect for warm weather and casual outings.",
      features: ["Lightweight fabric", "Floral print", "Sleeveless", "Knee-length", "Comfortable fit"],
      inStock: true,
      stockCount: 90,
      freeShipping: true,
      primeEligible: false,
      keywords: ["dress", "summer", "floral", "women", "casual", "lightweight"],
      seller: "H&M India",
      warranty: "30 Days Easy Exchange",
      myntraInsider: true,
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 204,
      title: "Levi's 511 Slim Fit Jeans - Dark Blue Wash",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 12345,
      image: "/mens-classic-fit-denim-jeans.jpg",
      badge: "Classic",
      category: "Fashion",
      brand: "Levi's",
      platform: "myntra",
      platformUrl: "https://myntra.com/levis-511-slim-jeans",
      description:
        "Classic Levi's 511 slim fit jeans in dark blue wash. Made from premium denim with the perfect balance of comfort and style.",
      features: ["Premium denim", "Slim fit", "Dark wash", "5-pocket design", "Iconic styling"],
      inStock: true,
      stockCount: 200,
      freeShipping: true,
      primeEligible: false,
      keywords: ["jeans", "denim", "men", "slim", "levis", "classic"],
      seller: "Levi's India",
      warranty: "Lifetime Warranty on Hardware",
      myntraInsider: true,
      sizes: ["28", "30", "32", "34", "36", "38"],
    },

    // Cross-platform products (same product available on multiple platforms)
    {
      id: 301,
      title: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviews: 23456,
      image: "/apple-airpods-pro-2nd-generation-wireless-earbuds.jpg",
      badge: "Deal",
      category: "Electronics",
      brand: "Apple",
      platform: "amazon",
      platformUrl: "https://amazon.com/dp/B0BDHWDR12",
      description:
        "AirPods Pro (2nd generation) with MagSafe Case (USB-C) deliver up to 2x more Active Noise Cancellation than the previous generation.",
      features: ["Active Noise Cancellation", "Transparency mode", "Spatial Audio", "MagSafe charging"],
      inStock: true,
      stockCount: 75,
      freeShipping: true,
      primeEligible: true,
      keywords: ["wireless", "earbuds", "bluetooth", "noise", "cancelling", "apple"],
      seller: "Apple",
      warranty: "1 Year Limited Warranty",
      availableOn: ["amazon", "flipkart"], // Available on multiple platforms
    },
    {
      id: 302,
      title: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
      price: 189.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviews: 18934,
      image: "/apple-airpods-pro-2nd-generation-wireless-earbuds.jpg",
      badge: "Flipkart Assured",
      category: "Electronics",
      brand: "Apple",
      platform: "flipkart",
      platformUrl: "https://flipkart.com/apple-airpods-pro-2nd-gen",
      description:
        "AirPods Pro (2nd generation) with MagSafe Case (USB-C) deliver up to 2x more Active Noise Cancellation than the previous generation.",
      features: ["Active Noise Cancellation", "Transparency mode", "Spatial Audio", "MagSafe charging"],
      inStock: true,
      stockCount: 45,
      freeShipping: true,
      primeEligible: false,
      keywords: ["wireless", "earbuds", "bluetooth", "noise", "cancelling", "apple"],
      seller: "Apple India",
      warranty: "1 Year International Warranty",
      flipkartPlus: true,
      emi: "No Cost EMI from ₹1,583/month",
      availableOn: ["amazon", "flipkart"],
    },

    // More diverse products across platforms
    {
      id: 401,
      title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviews: 3421,
      image: "/programmable-coffee-maker-12-cup.jpg",
      badge: "Deal",
      category: "Home & Garden",
      brand: "Instant Pot",
      platform: "amazon",
      platformUrl: "https://amazon.com/dp/B00FLYWNYQ",
      description:
        "7-in-1 multi-functional pressure cooker - pressure cook, slow cook, rice cooker, steamer, sauté, yogurt maker, and warmer.",
      features: ["7-in-1 functionality", "6-quart capacity", "Smart programming", "Stainless steel", "Safety features"],
      inStock: true,
      stockCount: 80,
      freeShipping: true,
      primeEligible: true,
      keywords: ["pressure", "cooker", "instant", "pot", "kitchen", "appliance"],
      seller: "Instant Brands",
      warranty: "1 Year Limited Warranty",
    },
    {
      id: 402,
      title: "Xiaomi Mi 11X Pro 5G (Cosmic Black, 128GB)",
      price: 449.99,
      originalPrice: 499.99,
      rating: 4.5,
      reviews: 15678,
      image: "/xiaomi-mi-11x-pro-black-smartphone.jpg",
      badge: "Flipkart Choice",
      category: "Electronics",
      brand: "Xiaomi",
      platform: "flipkart",
      platformUrl: "https://flipkart.com/xiaomi-mi-11x-pro",
      description:
        "Xiaomi Mi 11X Pro with Snapdragon 888, 108MP camera, and 120Hz AMOLED display for flagship performance.",
      features: ["Snapdragon 888", "108MP Triple Camera", "120Hz AMOLED", "33W Fast Charging", "5G Ready"],
      inStock: true,
      stockCount: 89,
      freeShipping: true,
      primeEligible: false,
      keywords: ["xiaomi", "smartphone", "5g", "android", "camera", "gaming"],
      seller: "Xiaomi India",
      warranty: "1 Year Manufacturer Warranty",
      flipkartPlus: true,
      emi: "No Cost EMI from ₹3,750/month",
    },
    {
      id: 403,
      title: "Zara Women's Blazer - Navy Blue Formal",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.2,
      reviews: 2345,
      image: "/navy-blue-women-blazer-formal.jpg",
      badge: "New Arrival",
      category: "Fashion",
      brand: "Zara",
      platform: "myntra",
      platformUrl: "https://myntra.com/zara-navy-blazer",
      description:
        "Professional navy blue blazer perfect for office wear and formal occasions. Tailored fit with premium fabric.",
      features: ["Premium fabric", "Tailored fit", "Professional look", "Versatile styling", "Quality construction"],
      inStock: true,
      stockCount: 45,
      freeShipping: true,
      primeEligible: false,
      keywords: ["blazer", "formal", "women", "office", "professional", "navy"],
      seller: "Zara India",
      warranty: "30 Days Easy Exchange",
      myntraInsider: true,
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ]

  const todaysDeals = [
    {
      id: 1001,
      title: "Sony WH-CH720N Wireless Noise Canceling Headphones",
      price: 39.99,
      originalPrice: 79.99,
      discount: 50,
      image: "/wireless-bluetooth-headphones-over-ear.jpg",
      category: "Electronics",
      brand: "Sony",
      platform: "amazon",
      platformUrl: "https://amazon.com/dp/B0BS1XQPQZ",
      rating: 4.2,
      reviews: 1234,
      freeShipping: true,
      primeEligible: true,
      keywords: ["headphones", "wireless", "bluetooth", "audio", "music", "noise", "canceling"],
      seller: "Sony Electronics",
    },
    {
      id: 1002,
      title: "Fitbit Charge 5 Advanced Fitness & Health Tracker",
      price: 89.99,
      originalPrice: 149.99,
      discount: 40,
      image: "/smartwatch-fitness-tracker-with-heart-rate-monitor.jpg",
      category: "Electronics",
      brand: "Fitbit",
      platform: "flipkart",
      platformUrl: "https://flipkart.com/fitbit-charge-5",
      rating: 4.3,
      reviews: 2345,
      freeShipping: true,
      primeEligible: false,
      keywords: ["smartwatch", "fitness", "tracker", "health", "wearable"],
      seller: "Fitbit India",
      flipkartPlus: true,
    },
    {
      id: 1003,
      title: "Anker PowerCore 10000 Portable Charger",
      price: 24.99,
      originalPrice: 39.99,
      discount: 38,
      image: "/portable-power-bank-phone-charger.jpg",
      category: "Electronics",
      brand: "Anker",
      platform: "amazon",
      platformUrl: "https://amazon.com/dp/B019GJLER8",
      rating: 4.1,
      reviews: 987,
      freeShipping: true,
      primeEligible: true,
      keywords: ["charger", "portable", "power", "bank", "battery"],
      seller: "AnkerDirect",
    },
    {
      id: 1004,
      title: "Puma Men's Running T-Shirt - Black",
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      image: "/black-puma-running-tshirt-men.jpg",
      category: "Fashion",
      brand: "Puma",
      platform: "myntra",
      platformUrl: "https://myntra.com/puma-running-tshirt",
      rating: 4.4,
      reviews: 654,
      freeShipping: true,
      primeEligible: false,
      keywords: ["tshirt", "running", "sports", "men", "athletic"],
      seller: "Puma India",
      myntraInsider: true,
    },
  ]

  // Enhanced search with platform filtering
  const performAdvancedSearch = (query, searchFilters = {}) => {
    if (!query.trim()) return []

    const queryLower = query.toLowerCase()
    const allItems = [...allProducts, ...todaysDeals]

    const results = allItems.filter((product) => {
      // Text matching
      const titleMatch = product.title.toLowerCase().includes(queryLower)
      const brandMatch = product.brand && product.brand.toLowerCase().includes(queryLower)
      const categoryMatch = product.category.toLowerCase().includes(queryLower)
      const descriptionMatch = product.description && product.description.toLowerCase().includes(queryLower)
      const featureMatch =
        product.features && product.features.some((feature) => feature.toLowerCase().includes(queryLower))
      const keywordMatch =
        product.keywords &&
        product.keywords.some(
          (keyword) => keyword.toLowerCase().includes(queryLower) || queryLower.includes(keyword.toLowerCase()),
        )

      const textMatch = titleMatch || brandMatch || categoryMatch || descriptionMatch || featureMatch || keywordMatch

      if (!textMatch) return false

      // Apply search-specific filters
      if (searchFilters.category && searchFilters.category !== "All" && product.category !== searchFilters.category) {
        return false
      }

      if (
        searchFilters.platforms &&
        searchFilters.platforms.length > 0 &&
        !searchFilters.platforms.includes(product.platform)
      ) {
        return false
      }

      if (searchFilters.inStock && !product.inStock) {
        return false
      }

      if (searchFilters.freeShipping && !product.freeShipping) {
        return false
      }

      if (searchFilters.primeEligible && !product.primeEligible) {
        return false
      }

      return true
    })

    // Sort by relevance (title matches first, then brand, then other matches)
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(queryLower)
      const bTitle = b.title.toLowerCase().includes(queryLower)
      const aBrand = a.brand && a.brand.toLowerCase().includes(queryLower)
      const bBrand = b.brand && b.brand.toLowerCase().includes(queryLower)

      if (aTitle && !bTitle) return -1
      if (!aTitle && bTitle) return 1
      if (aBrand && !bBrand) return -1
      if (!aBrand && bBrand) return 1

      return b.rating - a.rating // Secondary sort by rating
    })

    return results
  }

  // Filter and sort products
  const applyFilters = (products) => {
    const filtered = products.filter((product) => {
      // Price range filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false
      }

      // Platform filter
      if (filters.platforms.length > 0 && !filters.platforms.includes(product.platform)) {
        return false
      }

      // Category filter
      if (filters.category !== "All" && product.category !== filters.category) {
        return false
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      // Free shipping filter
      if (filters.freeShipping && !product.freeShipping) {
        return false
      }

      // Prime eligible filter
      if (filters.primeEligible && !product.primeEligible) {
        return false
      }

      return true
    })

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default: // relevance
        break
    }

    return filtered
  }

  const handleSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setCurrentView("home")
      return
    }

    const results = performAdvancedSearch(query, {
      category: filters.category,
      platforms: filters.platforms,
      inStock: filters.inStock,
      freeShipping: filters.freeShipping,
      primeEligible: filters.primeEligible,
    })

    setSearchResults(results)
    setCurrentView("search")
    setSearchQuery(query)
    addToRecentSearches(query)
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setCurrentView("category")
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setCurrentView("product")
  }

  const getProductsByCategory = (category) => {
    const products = [...allProducts, ...todaysDeals].filter((product) => product.category === category)
    return applyFilters(products)
  }

  const getFilteredSearchResults = () => {
    return applyFilters(searchResults)
  }

  const updatePriceRange = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }))
  }

  const updateRatingFilter = (rating) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating,
    }))
  }

  const toggleBrandFilter = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand) ? prev.brands.filter((b) => b !== brand) : [...prev.brands, brand],
    }))
  }

  const togglePlatformFilter = (platform) => {
    setFilters((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  const updateSortBy = (sortBy) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
    }))
  }

  const updateCategoryFilter = (category) => {
    setFilters((prev) => ({
      ...prev,
      category,
    }))
  }

  const toggleFilter = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 2000 },
      rating: 0,
      brands: [],
      platforms: [],
      sortBy: "relevance",
      category: "All",
      inStock: false,
      freeShipping: false,
      primeEligible: false,
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.priceRange.min > 0 || filters.priceRange.max < 2000) count++
    if (filters.rating > 0) count++
    if (filters.brands.length > 0) count++
    if (filters.platforms.length > 0) count++
    if (filters.category !== "All") count++
    if (filters.inStock) count++
    if (filters.freeShipping) count++
    if (filters.primeEligible) count++
    return count
  }

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
    setCartCount((prevCount) => prevCount + 1)
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId)
      if (item) {
        setCartCount((prevCount) => prevCount - item.quantity)
      }
      return prevItems.filter((item) => item.id !== productId)
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => {
      const oldItem = prevItems.find((item) => item.id === productId)
      const quantityDiff = newQuantity - (oldItem?.quantity || 0)
      setCartCount((prevCount) => prevCount + quantityDiff)

      return prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    })
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  const ProductCard = ({ product, showAddToCart = true }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="relative mb-4" onClick={() => handleProductClick(product)}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-48 object-cover rounded"
          />
          <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          {product.badge && <Badge className="absolute top-2 left-2 bg-orange-400 text-black">{product.badge}</Badge>}

          {/* Platform Badge */}
          <Badge className={`absolute top-2 right-12 ${platforms[product.platform].color} text-white text-xs`}>
            {platforms[product.platform].logo} {platforms[product.platform].name}
          </Badge>

          {product.freeShipping && (
            <Badge className="absolute bottom-2 left-2 bg-green-500 text-white text-xs">Free Shipping</Badge>
          )}
          {(product.primeEligible || product.flipkartPlus || product.myntraInsider) && (
            <Badge className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs">
              {product.primeEligible && "Prime"}
              {product.flipkartPlus && "Plus"}
              {product.myntraInsider && "Insider"}
            </Badge>
          )}
        </div>
        <div onClick={() => handleProductClick(product)}>
          <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
          {product.brand && <p className="text-sm text-gray-600 mb-2">{product.brand}</p>}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviews?.toLocaleString() || 0})</span>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="text-xs text-gray-500 mb-2">Sold by: {product.seller}</div>
        </div>
        {showAddToCart && (
          <div className="space-y-2">
            <Button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
              onClick={(e) => {
                e.stopPropagation()
                addToCart(product)
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                window.open(product.platformUrl, "_blank")
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on {platforms[product.platform].name}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const FilterSidebar = () => (
    <div className="w-64 bg-white p-4 rounded-lg shadow-sm h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        {getActiveFilterCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600">
            Clear all
          </Button>
        )}
      </div>

      {/* Platform Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Platform</h4>
        <div className="space-y-1">
          {getAllPlatforms().map((platform) => (
            <Button
              key={platform}
              variant="ghost"
              size="sm"
              onClick={() => togglePlatformFilter(platform)}
              className={`w-full justify-start h-8 ${filters.platforms.includes(platform) ? "bg-blue-50 text-blue-600" : ""}`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 border rounded mr-2 ${filters.platforms.includes(platform) ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
                >
                  {filters.platforms.includes(platform) && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                  )}
                </div>
                <span className="mr-2">{platforms[platform].logo}</span>
                {platforms[platform].name}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Category</h4>
        <select
          value={filters.category}
          onChange={(e) => updateCategoryFilter(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceRange.min}
              onChange={(e) => updatePriceRange(Number(e.target.value), filters.priceRange.max)}
              className="w-20 h-8 text-sm"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceRange.max}
              onChange={(e) => updatePriceRange(filters.priceRange.min, Number(e.target.value))}
              className="w-20 h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updatePriceRange(0, 50)}
              className={`w-full justify-start h-8 ${filters.priceRange.min === 0 && filters.priceRange.max === 50 ? "bg-blue-50 text-blue-600" : ""}`}
            >
              Under $50
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updatePriceRange(50, 100)}
              className={`w-full justify-start h-8 ${filters.priceRange.min === 50 && filters.priceRange.max === 100 ? "bg-blue-50 text-blue-600" : ""}`}
            >
              $50 - $100
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updatePriceRange(100, 500)}
              className={`w-full justify-start h-8 ${filters.priceRange.min === 100 && filters.priceRange.max === 500 ? "bg-blue-50 text-blue-600" : ""}`}
            >
              $100 - $500
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updatePriceRange(500, 2000)}
              className={`w-full justify-start h-8 ${filters.priceRange.min === 500 && filters.priceRange.max === 2000 ? "bg-blue-50 text-blue-600" : ""}`}
            >
              $500+
            </Button>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Customer Rating</h4>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant="ghost"
              size="sm"
              onClick={() => updateRatingFilter(rating)}
              className={`w-full justify-start h-8 ${filters.rating === rating ? "bg-blue-50 text-blue-600" : ""}`}
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2">& Up</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Brand</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {getAllBrands().map((brand) => (
            <Button
              key={brand}
              variant="ghost"
              size="sm"
              onClick={() => toggleBrandFilter(brand)}
              className={`w-full justify-start h-8 ${filters.brands.includes(brand) ? "bg-blue-50 text-blue-600" : ""}`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 border rounded mr-2 ${filters.brands.includes(brand) ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
                >
                  {filters.brands.includes(brand) && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                  )}
                </div>
                {brand}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Additional Options</h4>
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFilter("inStock")}
            className={`w-full justify-start h-8 ${filters.inStock ? "bg-blue-50 text-blue-600" : ""}`}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 border rounded mr-2 ${filters.inStock ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
              >
                {filters.inStock && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
              In Stock Only
            </div>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFilter("freeShipping")}
            className={`w-full justify-start h-8 ${filters.freeShipping ? "bg-blue-50 text-blue-600" : ""}`}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 border rounded mr-2 ${filters.freeShipping ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
              >
                {filters.freeShipping && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
              Free Shipping
            </div>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFilter("primeEligible")}
            className={`w-full justify-start h-8 ${filters.primeEligible ? "bg-blue-50 text-blue-600" : ""}`}
          >
            <div className="flex items-center">
              <div
                className={`w-4 h-4 border rounded mr-2 ${filters.primeEligible ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
              >
                {filters.primeEligible && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
              Prime/Plus/Insider
            </div>
          </Button>
        </div>
      </div>
    </div>
  )

  const SearchSuggestions = () => (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-50 max-h-96 overflow-y-auto">
      {/* Recent Searches */}
      {searchInput === "" && recentSearches.length > 0 && (
        <div className="p-3 border-b">
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Recent Searches</span>
          </div>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleRecentSearchSelect(search)}
              className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              {search}
            </button>
          ))}
        </div>
      )}

      {/* Trending Searches */}
      {searchInput === "" && (
        <div className="p-3 border-b">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Trending</span>
          </div>
          {trendingSearches.slice(0, 6).map((search, index) => (
            <button
              key={index}
              onClick={() => handleRecentSearchSelect(search)}
              className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              {search}
            </button>
          ))}
        </div>
      )}

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionSelect(suggestion)}
              className="flex items-center w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
            >
              {suggestion.type === "product" && suggestion.image && (
                <img
                  src={suggestion.image || "/placeholder.svg"}
                  alt=""
                  className="w-8 h-8 object-cover rounded mr-3"
                />
              )}
              <div className="flex-1">
                <div className="text-sm text-gray-900">{suggestion.text}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  {suggestion.category}
                  {suggestion.platform && (
                    <span className="ml-2 flex items-center">
                      <span className="mr-1">{platforms[suggestion.platform].logo}</span>
                      {platforms[suggestion.platform].name}
                    </span>
                  )}
                </div>
              </div>
              <Search className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        {/* Top Header */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div
                className="text-2xl font-bold cursor-pointer hover:text-orange-400 transition-colors"
                onClick={() => setCurrentView("home")}
                title="Go to Zoodo Home"
              >
                zoodo
              </div>
              <div className="hidden md:flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <div>
                  <div className="text-xs text-gray-300">Deliver to</div>
                  <div className="font-semibold">New York 10001</div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 relative" ref={searchInputRef}>
              <div className="flex">
                <select
                  className="bg-gray-200 text-gray-900 px-3 py-2 rounded-l-md border-r border-gray-300 text-sm"
                  value={filters.category}
                  onChange={(e) => updateCategoryFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder="Search across Amazon, Flipkart & Myntra"
                  value={searchInput}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      setShowSuggestions(false)
                      handleSearch(searchInput)
                    }
                  }}
                  className="flex-1 rounded-none border-0 focus:ring-0"
                />
                <Button
                  className="bg-orange-400 hover:bg-orange-500 rounded-r-md rounded-l-none px-4"
                  onClick={() => {
                    setShowSuggestions(false)
                    handleSearch(searchInput)
                  }}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && <SearchSuggestions />}
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
              <div className="flex items-center relative cursor-pointer" onClick={() => setShowCart(true)}>
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
            <Button
              variant="ghost"
              className="text-white hover:bg-gray-700 text-sm"
              onClick={() => setCurrentView("home")}
            >
              Home
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className="text-white hover:bg-gray-700 text-sm hidden lg:block"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}

            {/* Platform Quick Access */}
            <div className="hidden xl:flex items-center space-x-2 ml-auto">
              <span className="text-xs text-gray-300">Shop from:</span>
              {Object.entries(platforms).map(([key, platform]) => (
                <Button
                  key={key}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-700 text-xs px-2 py-1"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, platforms: [key] }))
                    setCurrentView("search")
                    setSearchQuery("all products")
                    setSearchResults(allProducts.filter((p) => p.platform === key))
                  }}
                >
                  {platform.logo} {platform.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Platform Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-8 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">🛍️ Shop from Multiple Platforms in One Place</h3>
              <p className="text-sm text-gray-600">
                Compare prices and products from Amazon, Flipkart, and Myntra. Find the best deals across all platforms!
              </p>
            </div>
            <div className="flex space-x-2">
              {Object.entries(platforms).map(([key, platform]) => (
                <div key={key} className={`${platform.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  {platform.logo} {platform.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        {currentView !== "home" && (
          <div className="flex items-center space-x-2 mb-6 text-sm bg-white p-3 rounded-lg shadow-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("home")}
              className="p-1 h-auto text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium"
            >
              🏠 Home
            </Button>
            {currentView === "category" && (
              <>
                <span className="text-gray-400">›</span>
                <span className="font-medium text-gray-700">{selectedCategory}</span>
                <span className="text-sm text-gray-500">({getProductsByCategory(selectedCategory).length} items)</span>
              </>
            )}
            {currentView === "search" && (
              <>
                <span className="text-gray-400">›</span>
                <span className="font-medium text-gray-700">Search results for "{searchQuery}"</span>
                <span className="text-sm text-gray-500">({getFilteredSearchResults().length} items)</span>
              </>
            )}
            {currentView === "product" && selectedProduct && (
              <>
                <span className="text-gray-400">›</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCategoryClick(selectedProduct.category)}
                  className="p-1 h-auto text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  {selectedProduct.category}
                </Button>
                <span className="text-gray-400">›</span>
                <span className="font-medium text-gray-700">{selectedProduct.title}</span>
              </>
            )}
          </div>
        )}

        {/* Home View */}
        {currentView === "home" && (
          <>
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mb-8">
              <div className="px-8 py-12">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold mb-4">Multi-Platform Shopping</h1>
                    <p className="text-xl mb-6">Compare prices across Amazon, Flipkart & Myntra</p>
                    <Button className="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-8 py-3">
                      Start Shopping
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="/holiday-shopping-deals-banner-with-gift-boxes.jpg"
                      alt="Multi-platform shopping"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Showcase */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Shop from Top Platforms</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(platforms).map(([key, platform]) => (
                  <Card
                    key={key}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, platforms: [key] }))
                      setCurrentView("search")
                      setSearchQuery("all products")
                      setSearchResults(allProducts.filter((p) => p.platform === key))
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`${platform.color} text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4`}
                      >
                        {platform.logo}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {platform.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <Badge className={`${platform.color} text-white`}>
                          {allProducts.filter((p) => p.platform === key).length} Products
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Today's Deals */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Today's Best Deals</h2>
                <Button variant="outline">See all deals</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {todaysDeals.slice(0, 8).map((deal) => (
                  <Card key={deal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative mb-3" onClick={() => handleProductClick(deal)}>
                        <img
                          src={deal.image || "/placeholder.svg"}
                          alt={deal.title}
                          className="w-full h-32 object-cover rounded"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-500">{deal.discount}% off</Badge>
                        <Badge
                          className={`absolute top-2 right-2 ${platforms[deal.platform].color} text-white text-xs`}
                        >
                          {platforms[deal.platform].logo}
                        </Badge>
                      </div>
                      <div onClick={() => handleProductClick(deal)}>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{deal.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-red-600">${deal.price}</span>
                          <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs py-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(deal)
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Featured Products by Platform */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Categories Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(0, 8).map((category) => {
                  const categoryCount = getProductsByCategory(category).length
                  return (
                    <Card
                      key={category}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <CardContent className="p-6 text-center">
                        <img
                          src={`/abstract-geometric-shapes.png?height=100&width=100&query=${category.toLowerCase()} category icon`}
                          alt={category}
                          className="w-16 h-16 mx-auto mb-3 rounded-full"
                        />
                        <h3 className="font-semibold">{category}</h3>
                        <p className="text-sm text-gray-500 mt-1">{categoryCount} items</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          </>
        )}

        {/* Category View with Filters */}
        {currentView === "category" && (
          <div className="flex gap-6">
            <FilterSidebar />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{selectedCategory}</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{getProductsByCategory(selectedCategory).length} results</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateSortBy(e.target.value)}
                    className="border rounded-md px-3 py-1 text-sm"
                  >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              {getActiveFilterCount() > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filters.rating > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.rating}+ Stars
                      <X className="w-3 h-3 cursor-pointer" onClick={() => updateRatingFilter(0)} />
                    </Badge>
                  )}
                  {(filters.priceRange.min > 0 || filters.priceRange.max < 2000) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      ${filters.priceRange.min} - ${filters.priceRange.max}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => updatePriceRange(0, 2000)} />
                    </Badge>
                  )}
                  {filters.brands.map((brand) => (
                    <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                      {brand}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleBrandFilter(brand)} />
                    </Badge>
                  ))}
                  {filters.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                      {platforms[platform].logo} {platforms[platform].name}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => togglePlatformFilter(platform)} />
                    </Badge>
                  ))}
                  {filters.category !== "All" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.category}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => updateCategoryFilter("All")} />
                    </Badge>
                  )}
                  {filters.inStock && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      In Stock
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter("inStock")} />
                    </Badge>
                  )}
                  {filters.freeShipping && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Free Shipping
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter("freeShipping")} />
                    </Badge>
                  )}
                  {filters.primeEligible && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Prime/Plus/Insider
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter("primeEligible")} />
                    </Badge>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getProductsByCategory(selectedCategory).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results View with Filters */}
        {currentView === "search" && (
          <div className="flex gap-6">
            <FilterSidebar />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">
                  Search results for "{searchQuery}" ({getFilteredSearchResults().length} results)
                </h1>
                <div className="flex items-center space-x-4">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateSortBy(e.target.value)}
                    className="border rounded-md px-3 py-1 text-sm"
                  >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                  <Button variant="outline" onClick={() => setCurrentView("home")}>
                    Back to Home
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              {getActiveFilterCount() > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filters.rating > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.rating}+ Stars
                      <X className="w-3 h-3 cursor-pointer" onClick={() => updateRatingFilter(0)} />
                    </Badge>
                  )}
                  {(filters.priceRange.min > 0 || filters.priceRange.max < 2000) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      ${filters.priceRange.min} - ${filters.priceRange.max}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => updatePriceRange(0, 2000)} />
                    </Badge>
                  )}
                  {filters.brands.map((brand) => (
                    <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                      {brand}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleBrandFilter(brand)} />
                    </Badge>
                  ))}
                  {filters.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                      {platforms[platform].logo} {platforms[platform].name}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => togglePlatformFilter(platform)} />
                    </Badge>
                  ))}
                  {filters.category !== "All" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {filters.category}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => updateCategoryFilter("All")} />
                    </Badge>
                  )}
                  {filters.inStock && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      In Stock
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter("inStock")} />
                    </Badge>
                  )}
                  {filters.freeShipping && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Free Shipping
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter("freeShipping")} />
                    </Badge>
                  )}
                  {filters.primeEligible && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Prime/Plus/Insider
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter("primeEligible")} />
                    </Badge>
                  )}
                </div>
              )}

              {getFilteredSearchResults().length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl mb-2">No results found for "{searchQuery}"</p>
                    <p className="text-gray-600 mb-6">Try different keywords or adjust your filters</p>
                    <Button
                      onClick={() => setCurrentView("home")}
                      className="bg-orange-400 hover:bg-orange-500 text-black font-semibold"
                    >
                      Return to Home Page
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredSearchResults().map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product Detail View */}
        {currentView === "product" && selectedProduct && (
          <div>
            <div className="mb-6">
              <Button variant="outline" onClick={() => setCurrentView("home")} className="mb-4">
                ← Back to Home
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.title}
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${platforms[selectedProduct.platform].color} text-white`}>
                    {platforms[selectedProduct.platform].logo} {platforms[selectedProduct.platform].name}
                  </Badge>
                  {selectedProduct.badge && <Badge variant="secondary">{selectedProduct.badge}</Badge>}
                </div>

                <h1 className="text-3xl font-bold mb-4">{selectedProduct.title}</h1>
                {selectedProduct.brand && <p className="text-lg text-gray-600 mb-4">by {selectedProduct.brand}</p>}

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    ({selectedProduct.reviews?.toLocaleString() || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-red-600">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                  )}
                </div>

                {selectedProduct.description && <p className="text-gray-700 mb-6">{selectedProduct.description}</p>}

                {selectedProduct.features && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="text-gray-700">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">Product Details:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Sold by:</span>
                      <span className="ml-2 font-medium">{selectedProduct.seller}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Warranty:</span>
                      <span className="ml-2 font-medium">{selectedProduct.warranty}</span>
                    </div>
                    {selectedProduct.emi && (
                      <div className="col-span-2">
                        <span className="text-gray-600">EMI:</span>
                        <span className="ml-2 font-medium text-green-600">{selectedProduct.emi}</span>
                      </div>
                    )}
                    {selectedProduct.sizes && (
                      <div className="col-span-2">
                        <span className="text-gray-600">Available Sizes:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedProduct.sizes.map((size, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className={`text-sm ${selectedProduct.inStock ? "text-green-600" : "text-red-600"}`}>
                    {selectedProduct.inStock ? `In Stock (${selectedProduct.stockCount} available)` : "Out of Stock"}
                  </span>
                  {selectedProduct.freeShipping && <Badge className="bg-green-500 text-white">Free Shipping</Badge>}
                  {(selectedProduct.primeEligible || selectedProduct.flipkartPlus || selectedProduct.myntraInsider) && (
                    <Badge className="bg-blue-500 text-white">
                      {selectedProduct.primeEligible && "Prime Eligible"}
                      {selectedProduct.flipkartPlus && "Flipkart Plus"}
                      {selectedProduct.myntraInsider && "Myntra Insider"}
                    </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
                    onClick={() => addToCart(selectedProduct)}
                    disabled={!selectedProduct.inStock}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => window.open(selectedProduct.platformUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buy on {platforms[selectedProduct.platform].name}
                  </Button>
                </div>

                {/* Similar Products from Other Platforms */}
                {selectedProduct.availableOn && selectedProduct.availableOn.length > 1 && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800">
                      <Shield className="w-4 h-4 inline mr-2" />
                      Also Available On:
                    </h3>
                    <div className="space-y-2">
                      {selectedProduct.availableOn
                        .filter((platform) => platform !== selectedProduct.platform)
                        .map((platform) => {
                          const similarProduct = allProducts.find(
                            (p) =>
                              p.platform === platform &&
                              p.title.includes(selectedProduct.brand) &&
                              p.id !== selectedProduct.id,
                          )
                          if (similarProduct) {
                            return (
                              <div key={platform} className="flex items-center justify-between p-2 bg-white rounded">
                                <div className="flex items-center">
                                  <span className="mr-2">{platforms[platform].logo}</span>
                                  <span className="font-medium">{platforms[platform].name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-green-600">${similarProduct.price}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleProductClick(similarProduct)}
                                  >
                                    Compare
                                  </Button>
                                </div>
                              </div>
                            )
                          }
                          return null
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Shopping Cart ({cartCount})</h2>
                  <Button variant="ghost" onClick={() => setShowCart(false)}>
                    ✕
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 border-b pb-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                            {item.platform && (
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-gray-500 mr-1">from</span>
                                <Badge className={`${platforms[item.platform].color} text-white text-xs`}>
                                  {platforms[item.platform].logo} {platforms[item.platform].name}
                                </Badge>
                              </div>
                            )}
                            <p className="text-lg font-bold">${item.price}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 p-0"
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 p-0"
                              >
                                +
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 ml-2"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t p-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total: ${getTotalPrice()}</span>
                    </div>
                    <Button className="w-full bg-orange-400 hover:bg-orange-500 text-black font-semibold">
                      Proceed to Checkout
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowCart(false)}>
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
                    About Zoodo
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
              <h3 className="font-semibold mb-4">Platform Partners</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    🛒 Amazon Integration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    🛍️ Flipkart Partnership
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    👗 Myntra Fashion
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    More Platforms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Zoodo Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Price Comparison
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Multi-Platform Search
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Deal Alerts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Unified Shopping Cart
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    How Zoodo Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Your Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Platform Policies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <div className="text-2xl font-bold mb-4">zoodo</div>
            <p className="text-sm text-gray-400 mb-2">Your Multi-Platform Shopping Destination</p>
            <p className="text-sm text-gray-400">© 2024, Zoodo.com, Inc. or its affiliates</p>
            <div className="flex justify-center space-x-4 mt-4">
              {Object.entries(platforms).map(([key, platform]) => (
                <span key={key} className="text-sm text-gray-400">
                  Powered by {platform.logo} {platform.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
