"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts, mockProducts } from "@/data/products"
import { Product } from "@/types"
import { Heart, ShoppingBag, Star, Filter, Search, Camera } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductListSkeleton } from "@/components/ui/product-skeleton"
import Link from "next/link"
import { motion } from "framer-motion"
import { formatPrice } from "@/lib/utils"

export default function DiscoverPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true)
            try {
                const filters: any = {}

                if (selectedCategory !== "all") {
                    filters.category = selectedCategory
                }

                if (searchTerm) {
                    filters.search = searchTerm
                }

                filters.priceRange = priceRange

                const data = await getProducts(filters)
                setProducts(data)
            } catch (error) {
                console.error("Failed to load products:", error)
                setProducts(mockProducts)
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [searchTerm, selectedCategory, priceRange])

    const categories = [
        { id: "all", name: "All Items" },
        { id: "clothing", name: "Clothing" },
        { id: "tops", name: "Tops" },
        { id: "bottoms", name: "Bottoms" },
        { id: "dresses", name: "Dresses" },
        { id: "outerwear", name: "Outerwear" },
        { id: "accessories", name: "Accessories" }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            {/* Header */}
            <section className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Discover Fashion</h1>
                            <p className="text-muted-foreground">
                                Explore our curated collection and try everything on virtually
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <Button variant="outline" className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 space-y-6">
                        {/* Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                                            ? "bg-purple-100 text-purple-700"
                                            : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Price Range */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Price Range</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">$0</span>
                                        <span className="text-sm">$500+</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="25"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full"
                                    />
                                    <div className="text-center text-sm text-muted-foreground">
                                        Up to ${priceRange[1]}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-muted-foreground">
                                {loading ? "Loading..." : `${products.length} products found`}
                            </p>

                            <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                                <option value="popular">Most Popular</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        {loading ? (
                            <ProductListSkeleton count={6} />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                                            <div className="relative aspect-[3/4] overflow-hidden">
                                                <Skeleton className="w-full h-full" />

                                                {/* Overlay Actions */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                                                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm">
                                                            <Heart className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {product.isAvailableForTryOn && (
                                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <Button asChild className="w-full" size="sm">
                                                                <Link href={`/tryon?product=${product.id}`} className="flex items-center gap-2">
                                                                    <Camera className="h-4 w-4" />
                                                                    Try On
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Badge */}
                                                {product.isAvailableForTryOn && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                            AR Ready
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <CardContent className="p-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-start justify-between">
                                                        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                                                            {product.name}
                                                        </h3>
                                                    </div>

                                                    <p className="text-sm text-muted-foreground">
                                                        {product.brand}
                                                    </p>

                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm font-medium ml-1">
                                                                {product.rating}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-muted-foreground">
                                                            ({product.reviewCount})
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-2">
                                                        <span className="text-xl font-bold">
                                                            {formatPrice(product.price)}
                                                        </span>

                                                        <Button size="icon" variant="outline">
                                                            <ShoppingBag className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {!loading && products.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Try adjusting your search or filter criteria
                                </p>
                                <Button onClick={() => {
                                    setSearchTerm("")
                                    setSelectedCategory("all")
                                    setPriceRange([0, 500])
                                }}>
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
