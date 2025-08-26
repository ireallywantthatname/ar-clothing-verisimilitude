"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Sparkles, Users, Zap, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Try Before You{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Buy
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Experience the future of online shopping with AI-powered virtual try-on technology.
                See how clothes look on you before making a purchase.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/tryon" className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Start Trying On
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/discover" className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">500K+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">10M+</div>
                <div className="text-sm text-muted-foreground">Try-Ons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <Skeleton className="rounded-xl w-full h-[400px]" />
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium">
                  👋 Wave to change outfit
                </div>
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium">
                  AR Active
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold">
            Why Choose verisimilitude?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge technology combines AI, AR, and machine learning to deliver
            the most accurate virtual try-on experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Camera,
              title: "Real-Time AR",
              description: "See clothes on your body in real-time using advanced computer vision and AR technology.",
              color: "text-purple-600"
            },
            {
              icon: Sparkles,
              title: "AI-Powered Fit",
              description: "Our AI analyzes your body type and suggests the perfect fit and size for every item.",
              color: "text-pink-600"
            },
            {
              icon: Zap,
              title: "Instant Results",
              description: "Try on multiple outfits in seconds with gesture controls and voice commands.",
              color: "text-indigo-600"
            },
            {
              icon: Users,
              title: "Social Sharing",
              description: "Share your virtual outfits with friends and get feedback before purchasing.",
              color: "text-emerald-600"
            },
            {
              icon: ArrowRight,
              title: "Smart Recommendations",
              description: "Get personalized style suggestions based on your preferences and body type.",
              color: "text-orange-600"
            },
            {
              icon: Play,
              title: "Easy Integration",
              description: "Works seamlessly across all devices - mobile, tablet, and desktop.",
              color: "text-blue-600"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 lg:p-16 text-center text-white"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Shopping?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join millions of users who have revolutionized their shopping experience with verisimilitude.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/tryon" className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Try Now - Free
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-purple-600">
              <Link href="/discover">
                Browse Products
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
