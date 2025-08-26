"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Users, Camera, Play } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { motion } from "framer-motion"

interface CommunityPost {
    id: string
    user: {
        name: string
        avatar: string
        followers: number
        isVerified: boolean
    }
    outfit: {
        items: Array<{
            name: string
            brand: string
            price: number
        }>
        totalPrice: number
    }
    image: string
    caption: string
    likes: number
    comments: number
    shares: number
    isLiked: boolean
    isBookmarked: boolean
    createdAt: string
    tags: string[]
}

const mockPosts: CommunityPost[] = [
    {
        id: "1",
        user: {
            name: "Emma Style",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face",
            followers: 12400,
            isVerified: true
        },
        outfit: {
            items: [
                { name: "Classic White Shirt", brand: "StyleCo", price: 89.99 },
                { name: "High-Waisted Jeans", brand: "EcoFashion", price: 129.99 }
            ],
            totalPrice: 219.98
        },
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
        caption: "Perfect casual Friday look! The fit is amazing and so comfortable. #CasualFriday #StyleTry #OOTD",
        likes: 1245,
        comments: 89,
        shares: 34,
        isLiked: false,
        isBookmarked: true,
        createdAt: "2h ago",
        tags: ["casual", "workwear", "comfort"]
    },
    {
        id: "2",
        user: {
            name: "Fashion Forward",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            followers: 8900,
            isVerified: false
        },
        outfit: {
            items: [
                { name: "Flowing Maxi Dress", brand: "FlowStyle", price: 159.99 }
            ],
            totalPrice: 159.99
        },
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
        caption: "Summer vibes in this gorgeous maxi dress! The AR try-on made shopping so easy ✨",
        likes: 892,
        comments: 56,
        shares: 23,
        isLiked: true,
        isBookmarked: false,
        createdAt: "4h ago",
        tags: ["summer", "dress", "vacation"]
    },
    {
        id: "3",
        user: {
            name: "Style Maven",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            followers: 15600,
            isVerified: true
        },
        outfit: {
            items: [
                { name: "Wool Blend Coat", brand: "LuxWear", price: 299.99 },
                { name: "Classic Trousers", brand: "StyleCo", price: 149.99 }
            ],
            totalPrice: 449.98
        },
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
        caption: "Investing in quality pieces that last. This coat is perfect for the season! #Investment #Quality",
        likes: 2156,
        comments: 134,
        shares: 67,
        isLiked: false,
        isBookmarked: false,
        createdAt: "1d ago",
        tags: ["investment", "winter", "luxury"]
    }
]

export default function CommunityPage() {
    const [posts, setPosts] = useState<CommunityPost[]>(mockPosts)
    const [activeTab, setActiveTab] = useState<"trending" | "following" | "recent">("trending")

    const handleLike = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1
                }
                : post
        ))
    }

    const handleBookmark = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isBookmarked: !post.isBookmarked }
                : post
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            {/* Header */}
            <section className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Style Community</h1>
                            <p className="text-muted-foreground">
                                Discover trending outfits and share your style with the world
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button asChild className="flex items-center gap-2">
                                <Link href="/tryon">
                                    <Camera className="h-4 w-4" />
                                    Share Your Look
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-8 mt-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">2.4M+</div>
                            <div className="text-sm text-muted-foreground">Community Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-pink-600">15K+</div>
                            <div className="text-sm text-muted-foreground">Daily Posts</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-600">500K+</div>
                            <div className="text-sm text-muted-foreground">Style Inspirations</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Feed */}
                    <main className="flex-1">
                        {/* Tabs */}
                        <div className="flex items-center gap-4 mb-8 border-b bg-white rounded-lg p-1">
                            {[
                                { id: "trending", label: "Trending", icon: TrendingUp },
                                { id: "following", label: "Following", icon: Users },
                                { id: "recent", label: "Recent", icon: Play }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === tab.id
                                        ? "bg-purple-100 text-purple-700"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Posts Feed */}
                        <div className="space-y-6">
                            {posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden">
                                        {/* Post Header */}
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Skeleton className="w-10 h-10 rounded-full" />
                                                    <div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-semibold">{post.user.name}</span>
                                                            {post.user.isVerified && (
                                                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-xs">✓</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {post.user.followers.toLocaleString()} followers • {post.createdAt}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button variant="outline" size="sm">
                                                    Follow
                                                </Button>
                                            </div>
                                        </CardHeader>

                                        {/* Post Image */}
                                        <div className="relative aspect-[4/5] bg-gray-100">
                                            <Skeleton className="w-full h-full rounded-none" />

                                            {/* AR Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                                    AR Try-On
                                                </span>
                                            </div>

                                            {/* Outfit Details Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                                                    <div className="text-sm font-medium mb-1">Complete the Look</div>
                                                    <div className="text-xs space-y-1">
                                                        {post.outfit.items.map((item, idx) => (
                                                            <div key={idx} className="flex justify-between">
                                                                <span>{item.name} - {item.brand}</span>
                                                                <span>${item.price}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="border-t border-white/20 pt-2 mt-2">
                                                        <div className="flex justify-between font-medium">
                                                            <span>Total</span>
                                                            <span>${post.outfit.totalPrice}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <CardContent className="pt-4">
                                            {/* Actions */}
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => handleLike(post.id)}
                                                        className={`flex items-center gap-1 transition-colors ${post.isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                                                            }`}
                                                    >
                                                        <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`} />
                                                        <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                                                    </button>

                                                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                                                        <MessageCircle className="h-5 w-5" />
                                                        <span className="text-sm font-medium">{post.comments}</span>
                                                    </button>

                                                    <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                                                        <Share2 className="h-5 w-5" />
                                                        <span className="text-sm font-medium">{post.shares}</span>
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleBookmark(post.id)}
                                                    className={`transition-colors ${post.isBookmarked ? "text-purple-600" : "text-muted-foreground hover:text-purple-600"
                                                        }`}
                                                >
                                                    <Bookmark className={`h-5 w-5 ${post.isBookmarked ? "fill-current" : ""}`} />
                                                </button>
                                            </div>

                                            {/* Caption */}
                                            <p className="text-sm mb-3">{post.caption}</p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Try-On CTA */}
                                            <Button asChild className="w-full">
                                                <Link href="/tryon" className="flex items-center gap-2">
                                                    <Camera className="h-4 w-4" />
                                                    Try This Look
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:w-80 space-y-6">
                        {/* Trending Hashtags */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Trending Now</CardTitle>
                                <CardDescription>Popular styles and hashtags</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { tag: "#SummerVibes", posts: "2.4K posts" },
                                    { tag: "#WorkFromHome", posts: "1.8K posts" },
                                    { tag: "#SustainableFashion", posts: "1.2K posts" },
                                    { tag: "#DateNight", posts: "956 posts" },
                                    { tag: "#CasualChic", posts: "743 posts" }
                                ].map((trend) => (
                                    <div key={trend.tag} className="flex justify-between items-center py-2 hover:bg-gray-50 rounded px-2 cursor-pointer">
                                        <span className="font-medium text-purple-600">{trend.tag}</span>
                                        <span className="text-sm text-muted-foreground">{trend.posts}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Style Challenges */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Weekly Challenges</CardTitle>
                                <CardDescription>Join the community challenges</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border rounded-lg p-3">
                                    <h4 className="font-medium mb-1">Monochrome Monday</h4>
                                    <p className="text-sm text-muted-foreground mb-2">Style an outfit using only one color</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">234 participants</span>
                                        <Button size="sm" variant="outline">Join</Button>
                                    </div>
                                </div>

                                <div className="border rounded-lg p-3">
                                    <h4 className="font-medium mb-1">Thrift Find Friday</h4>
                                    <p className="text-sm text-muted-foreground mb-2">Show off your best thrift store finds</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">156 participants</span>
                                        <Button size="sm" variant="outline">Join</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Brands */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Featured Brands</CardTitle>
                                <CardDescription>Discover new brands on StyleTry</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { name: "EcoFashion", followers: "12.4K", verified: true },
                                    { name: "StyleCo", followers: "8.9K", verified: true },
                                    { name: "FlowStyle", followers: "6.2K", verified: false }
                                ].map((brand) => (
                                    <div key={brand.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-medium">{brand.name}</span>
                                                    {brand.verified && (
                                                        <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs">✓</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-xs text-muted-foreground">{brand.followers} followers</span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">Follow</Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    )
}
