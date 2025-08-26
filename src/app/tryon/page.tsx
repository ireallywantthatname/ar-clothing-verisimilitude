"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useARCamera } from "@/hooks/useARCamera"
import { getProductById, getRecommendations } from "@/data/products"
import { Product } from "@/types"
import {
    Camera,
    CameraOff,
    Download,
    Share2,
    Hand,
    Mic,
    MicOff,
    ShoppingBag,
    ArrowLeft,
    ArrowRight
} from "lucide-react"
import { ThumbnailSkeleton } from "@/components/ui/thumbnail-skeleton"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { formatPrice } from "@/lib/utils"

export default function TryOnPage() {
    const searchParams = useSearchParams()
    const productId = searchParams.get('product')

    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const [recommendations, setRecommendations] = useState<Product[]>([])
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
    const [isGestureEnabled, setIsGestureEnabled] = useState(true)
    const [currentInstruction, setCurrentInstruction] = useState("Wave your hand to start")
    const [isInstructionsVisible, setIsInstructionsVisible] = useState(true)

    const {
        videoRef,
        canvasRef,
        isInitialized,
        isStreaming,
        permissions,
        error,
        faceDetection,
        gestureDetection,
        requestPermissions,
        stopStream,
        captureScreenshot,
        startARSession
    } = useARCamera()

    // Load initial product if provided
    useEffect(() => {
        const loadInitialProduct = async () => {
            if (productId) {
                const product = await getProductById(productId)
                if (product) {
                    setSelectedProducts([product])
                }
            }

            // Load recommendations
            const recs = await getRecommendations()
            setRecommendations(recs)
        }

        loadInitialProduct()
    }, [productId])

    const handleAddProduct = (product: Product) => {
        if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
            setSelectedProducts([...selectedProducts, product])
        }
    }

    const handleRemoveProduct = (productId: string) => {
        setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
    }

    const handleNextProduct = () => {
        if (recommendations.length > 0) {
            const currentIndex = recommendations.findIndex(p => selectedProducts.some(sp => sp.id === p.id))
            const nextIndex = (currentIndex + 1) % recommendations.length
            const nextProduct = recommendations[nextIndex]

            if (selectedProducts.length === 1) {
                setSelectedProducts([nextProduct])
            } else if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === nextProduct.id)) {
                setSelectedProducts([...selectedProducts, nextProduct])
            }
        }
    }

    const handlePreviousProduct = () => {
        if (recommendations.length > 0) {
            const currentIndex = recommendations.findIndex(p => selectedProducts.some(sp => sp.id === p.id))
            const prevIndex = currentIndex === 0 ? recommendations.length - 1 : currentIndex - 1
            const prevProduct = recommendations[prevIndex]

            if (selectedProducts.length === 1) {
                setSelectedProducts([prevProduct])
            } else if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === prevProduct.id)) {
                setSelectedProducts([...selectedProducts, prevProduct])
            }
        }
    }

    // Handle gesture commands
    useEffect(() => {
        if (gestureDetection) {
            switch (gestureDetection.type) {
                case 'wave':
                    setCurrentInstruction("Great! Now try swiping to change items")
                    break
                case 'swipe':
                    if (gestureDetection.direction === 'left') {
                        handleNextProduct()
                    } else if (gestureDetection.direction === 'right') {
                        handlePreviousProduct()
                    }
                    break
                case 'pinch':
                    setCurrentInstruction("Pinch to adjust fit")
                    break
            }
        }
    }, [gestureDetection, recommendations, selectedProducts])

    const handleStartAR = async () => {
        if (!isStreaming) {
            const cleanup = await startARSession()
            setIsInstructionsVisible(false)

            // Set up instruction rotation
            const instructions = [
                "Wave your hand to activate controls",
                "Swipe left/right to change items",
                "Use voice commands like 'next item'",
                "Pinch to zoom and adjust fit",
                "Say 'capture' to take a photo"
            ]

            let index = 0
            const intervalId = setInterval(() => {
                setCurrentInstruction(instructions[index % instructions.length])
                index++
            }, 5000)

            // Store cleanup function and interval for later cleanup
            if (typeof cleanup === 'function') {
                return () => {
                    cleanup()
                    clearInterval(intervalId)
                }
            } else {
                return () => {
                    clearInterval(intervalId)
                }
            }
        } else {
            stopStream()
            setIsInstructionsVisible(true)
        }
    }

    const handleCapture = () => {
        const imageData = captureScreenshot()
        if (imageData) {
            // Create download link
            const link = document.createElement('a')
            link.download = 'tryon-screenshot.png'
            link.href = imageData
            link.click()
        }
    }

    const handleShare = async () => {
        const imageData = captureScreenshot()
        if (imageData && navigator.share) {
            try {
                // Convert base64 to blob
                const response = await fetch(imageData)
                const blob = await response.blob()
                const file = new File([blob], 'tryon.png', { type: 'image/png' })

                await navigator.share({
                    title: 'My Virtual Try-On',
                    text: 'Check out how this looks on me!',
                    files: [file]
                })
            } catch (error) {
                console.error('Error sharing:', error)
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <Navigation />

            <div className="container mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
                    {/* Main AR View */}
                    <div className="lg:col-span-3 relative bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                        {/* Video Stream */}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                            style={{ transform: 'scaleX(-1)' }} // Mirror the video
                        />

                        {/* Hidden canvas for capture */}
                        <canvas ref={canvasRef} className="hidden" />

                        {/* AR Overlay */}
                        <div className="ar-overlay">
                            {/* Face detection indicators */}
                            {faceDetection && (
                                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Face Detected ({Math.round(faceDetection.confidence * 100)}%)
                                </div>
                            )}

                            {/* Gesture indicator */}
                            {gestureDetection && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="gesture-indicator"
                                >
                                    {gestureDetection.type} {gestureDetection.direction}
                                    ({Math.round(gestureDetection.confidence * 100)}%)
                                </motion.div>
                            )}

                            {/* Instructions */}
                            <AnimatePresence>
                                {isInstructionsVisible && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-lg border border-white/30 shadow-2xl text-foreground px-8 py-6 rounded-2xl text-center max-w-md"
                                    >
                                        <div className="mb-4">
                                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Camera className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ready to Try On?</h3>
                                            <p className="text-muted-foreground">Grant camera access to start your virtual try-on experience</p>
                                        </div>
                                        <Button onClick={handleStartAR} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3">
                                            <Camera className="h-4 w-4 mr-2" />
                                            Start AR Session
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Current instruction */}
                            {isStreaming && !isInstructionsVisible && (
                                <motion.div
                                    key={currentInstruction}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-lg border border-white/30 text-foreground px-4 py-2 rounded-xl text-sm shadow-lg"
                                >
                                    {currentInstruction}
                                </motion.div>
                            )}
                        </div>

                        {/* AR Controls */}
                        <div className="ar-controls">
                            <Button
                                onClick={handleStartAR}
                                size="icon"
                                variant={isStreaming ? "destructive" : "default"}
                                className="rounded-full w-12 h-12 shadow-lg"
                            >
                                {isStreaming ? <CameraOff className="h-6 w-6" /> : <Camera className="h-6 w-6" />}
                            </Button>

                            {isStreaming && (
                                <>
                                    <Button onClick={handleCapture} size="icon" className="rounded-full w-12 h-12 shadow-lg">
                                        <Download className="h-6 w-6" />
                                    </Button>

                                    <Button onClick={handleShare} size="icon" className="rounded-full w-12 h-12 shadow-lg">
                                        <Share2 className="h-6 w-6" />
                                    </Button>

                                    <Button
                                        onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                                        size="icon"
                                        variant={isVoiceEnabled ? "default" : "outline"}
                                        className="rounded-full w-12 h-12 shadow-lg"
                                    >
                                        {isVoiceEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                                    </Button>

                                    <Button
                                        onClick={() => setIsGestureEnabled(!isGestureEnabled)}
                                        size="icon"
                                        variant={isGestureEnabled ? "default" : "outline"}
                                        className="rounded-full w-12 h-12 shadow-lg"
                                    >
                                        <Hand className="h-6 w-6" />
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500/90 backdrop-blur text-white px-4 py-2 rounded-lg shadow-lg">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-4 overflow-y-auto">
                        {/* Selected Products */}
                        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between text-lg">
                                    Current Outfit
                                    <span className="text-sm font-normal text-muted-foreground bg-purple-100 px-2 py-1 rounded-full">
                                        {selectedProducts.length}/3
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {selectedProducts.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-4">
                                        Select items to try on
                                    </p>
                                ) : (
                                    selectedProducts.map((product) => (
                                        <div key={product.id} className="flex items-center gap-3 p-3 bg-white/50 border border-white/30 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <ThumbnailSkeleton size="md" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{product.name}</p>
                                                <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                                            </div>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleRemoveProduct(product.id)}
                                                className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    ))
                                )}

                                {selectedProducts.length > 0 && (
                                    <div className="pt-3 border-t border-white/30">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium">Total</span>
                                            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                {formatPrice(selectedProducts.reduce((sum, p) => sum + p.price, 0))}
                                            </span>
                                        </div>
                                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                            <ShoppingBag className="h-4 w-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Controls */}
                        {isStreaming && (
                            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-base">Quick Controls</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={handlePreviousProduct}
                                            className="flex items-center gap-1 bg-white/50 border-white/30 hover:bg-white/80"
                                        >
                                            <ArrowLeft className="h-3 w-3" />
                                            Previous
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={handleNextProduct}
                                            className="flex items-center gap-1 bg-white/50 border-white/30 hover:bg-white/80"
                                        >
                                            Next
                                            <ArrowRight className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <div className="text-xs text-muted-foreground space-y-1 bg-purple-50/50 p-3 rounded-lg">
                                        <p>• Wave: Activate controls</p>
                                        <p>• Swipe left/right: Change items</p>
                                        <p>• Pinch: Adjust fit</p>
                                        <p>• Voice: "next item", "capture"</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Recommendations */}
                        <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-base">Recommended for You</CardTitle>
                                <CardDescription>AI-powered style suggestions</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recommendations.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center gap-3 p-3 bg-white/50 border border-white/30 rounded-xl hover:bg-white/80 cursor-pointer transition-all hover:shadow-md"
                                        onClick={() => handleAddProduct(product)}
                                    >
                                        <ThumbnailSkeleton size="md" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                                        </div>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-purple-100">
                                            +
                                        </Button>
                                    </div>
                                ))}

                                <Button asChild variant="outline" className="w-full bg-white/50 border-white/30 hover:bg-white/80">
                                    <Link href="/discover">
                                        View All Products
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
