"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, ImageIcon, PlayCircle, Check, Star, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-white text-dark-700 selection:bg-crimson-100 selection:text-crimson-900 overflow-x-hidden font-IBMPlex">
            {/* Animated Gradient Background - Subtle for Light Mode */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-crimson-100/40 to-orange-100/40 blur-[120px] animate-pulse"
                    style={{
                        left: `${mousePosition.x / 20}px`,
                        top: `${mousePosition.y / 20}px`,
                        transition: 'left 0.5s ease-out, top 0.5s ease-out'
                    }}
                />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-crimson-50/50 to-transparent rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-orange-50/50 to-transparent rounded-full blur-[80px]" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/assets/images/artify-logo.png" alt="Artify" width={150} height={28} />
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-crimson-600 transition-colors">Features</Link>
                        <Link href="#showcase" className="text-sm font-medium text-gray-600 hover:text-crimson-600 transition-colors">Showcase</Link>
                        <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-crimson-600 transition-colors">Pricing</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/sign-in" className="text-sm font-medium text-gray-600 hover:text-crimson-600 transition-colors hidden sm:block">
                            Log in
                        </Link>
                        <Button asChild className="rounded-full bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white px-6 h-10 text-sm font-semibold shadow-lg shadow-crimson-500/20 border-0">
                            <Link href="/sign-up">Get Started Free</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-36 pb-24 lg:pt-48 lg:pb-36 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson-50 border border-crimson-100 mb-8 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-500"></span>
                                </span>
                                <span className="text-sm font-medium text-crimson-700">Powered by Gemini 2.5</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-dark-700">
                                <span className="block">Transform Ideas</span>
                                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-crimson-600 via-orange-500 to-crimson-600 animate-gradient">
                                    Into Masterpieces
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                The next generation AI creative suite. Generate stunning images, upscale to 4K,
                                create videos, and remove backgrounds — all with a single prompt.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Button asChild size="lg" className="h-14 px-8 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-lg font-semibold shadow-xl shadow-crimson-500/25 border-0 group">
                                    <Link href="/sign-up">
                                        Start Creating
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                                <Button asChild variant="ghost" size="lg" className="h-14 px-8 rounded-full border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-lg font-medium text-gray-700 group">
                                    <Link href="#showcase">
                                        <PlayCircle className="mr-2 w-5 h-5 text-gray-500" />
                                        Watch Demo
                                    </Link>
                                </Button>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-xs font-bold text-gray-600 overflow-hidden">
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">Loved by 50,000+ creators</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="flex-1 relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden border border-gray-200 bg-white/50 backdrop-blur-sm p-3 shadow-2xl shadow-crimson-100/50">
                                <Image
                                    src="/assets/images/crimson-banner.png"
                                    width={600}
                                    height={400}
                                    alt="AI Generated Art"
                                    className="rounded-2xl w-full h-auto shadow-sm"
                                />
                                {/* Floating Cards */}
                                <div className="absolute -bottom-6 -left-6 px-5 py-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-crimson-100 to-pink-100 flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-crimson-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">4K Upscale</p>
                                            <p className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full w-fit mt-1">Completed</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-6 -right-6 px-5 py-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-float-delayed">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Generating...</p>
                                            <p className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full w-fit mt-1">2.5 seconds</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 -z-10 blur-3xl opacity-40">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-crimson-200 to-orange-200" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 relative bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <p className="text-crimson-600 font-bold mb-4 tracking-wide uppercase text-sm bg-crimson-50 w-fit mx-auto px-4 py-1.5 rounded-full">Features</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark-700">Everything You Need to Create</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Unlock the full power of AI with our comprehensive suite of creative tools.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Sparkles className="w-6 h-6 text-white" />}
                            gradient="from-crimson-500 to-orange-500"
                            title="AI Image Generation"
                            description="Transform text into stunning visuals with our Gemini 2.5 powered engine. Create art in seconds."
                        />
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-white" />}
                            gradient="from-orange-500 to-yellow-500"
                            title="Smart Upscaling"
                            description="Enhance any image to 4K resolution while adding missing details for crystal-clear quality."
                        />
                        <FeatureCard
                            icon={<PlayCircle className="w-6 h-6 text-white" />}
                            gradient="from-blue-500 to-cyan-500"
                            title="Video Generation"
                            description="Create short videos from text prompts. Perfect for social media and creative projects."
                        />
                        <FeatureCard
                            icon={<ImageIcon className="w-6 h-6 text-white" />}
                            gradient="from-green-500 to-emerald-500"
                            title="Background Removal"
                            description="Remove backgrounds with one click. AI precisely detects subjects for clean cutouts."
                        />
                        <FeatureCard
                            icon={<Star className="w-6 h-6 text-white" />}
                            gradient="from-crimson-500 to-pink-500"
                            title="Object Recolor"
                            description="Change colors of any object in your image. Simply describe what you want to change."
                        />
                        <FeatureCard
                            icon={<Check className="w-6 h-6 text-white" />}
                            gradient="from-pink-500 to-crimson-500"
                            title="Generative Fill"
                            description="Expand your images seamlessly. AI fills in new areas matching your existing content."
                        />
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section id="showcase" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-crimson-600 font-bold mb-4 tracking-wide uppercase text-sm bg-crimson-50 w-fit mx-auto px-4 py-1.5 rounded-full">Showcase</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark-700">Created with Artify</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">See what our community has created using our AI tools.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="aspect-square rounded-2xl bg-gray-100 border border-gray-100 overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 relative">
                                <Image
                                    src={`/assets/images/showcase-${i}.png`}
                                    alt={`Showcase ${i}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-700/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-crimson-500 flex items-center justify-center text-[10px]">
                                            <Sparkles className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-xs font-medium text-white">Remixed</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 relative bg-gray-50/50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-crimson-600 font-bold mb-4 tracking-wide uppercase text-sm bg-crimson-50 w-fit mx-auto px-4 py-1.5 rounded-full">Pricing</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark-700">Simple, Transparent Pricing</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Start free. Upgrade when you need more power.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingCard
                            name="Free"
                            price="$0"
                            description="For hobbyists"
                            features={["20 Credits", "Basic Access", "Community Support"]}
                        />
                        <PricingCard
                            name="Pro"
                            price="$19"
                            description="For professionals"
                            features={["200 Credits", "All Features", "Priority Support", "4K Upscaling"]}
                            highlighted
                        />
                        <PricingCard
                            name="Enterprise"
                            price="$99"
                            description="For teams"
                            features={["Unlimited Credits", "API Access", "Dedicated Support", "Custom Models"]}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-crimson-50 via-orange-50 to-crimson-50 border border-crimson-100 overflow-hidden shadow-2xl shadow-crimson-100/50">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.05),transparent_70%)]" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-dark-700">Ready to Create Magic?</h2>
                            <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">Join thousands of creators who are transforming their ideas into reality with Artify.</p>
                            <Button asChild size="lg" className="h-14 px-10 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-lg font-semibold shadow-xl shadow-crimson-500/25 border-0 group">
                                <Link href="/sign-up">
                                    Get Started Free
                                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <Image src="/assets/images/artify-logo.png" alt="Artify" width={120} height={24} />
                        </div>
                        <p className="text-sm text-gray-500">© 2026 Artify. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-sm text-gray-500 hover:text-crimson-600 transition-colors">Privacy</Link>
                            <Link href="#" className="text-sm text-gray-500 hover:text-crimson-600 transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Global Styles */}
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
        </div>
    );
}

const FeatureCard = ({ icon, gradient, title, description }: { icon: React.ReactNode, gradient: string, title: string, description: string }) => (
    <div className="group p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:border-gray-200 hover:-translate-y-1">
        <div className={`mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-dark-700">{title}</h3>
        <p className="text-gray-500 leading-relaxed font-medium">{description}</p>
    </div>
);

const PricingCard = ({ name, price, description, features, highlighted = false }: { name: string, price: string, description: string, features: string[], highlighted?: boolean }) => (
    <div className={`relative p-8 rounded-3xl border ${highlighted ? 'border-crimson-100 bg-white shadow-xl shadow-crimson-100/30' : 'border-gray-200 bg-white shadow-sm'} transition-all hover:shadow-xl hover:-translate-y-1`}>
        {highlighted && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-crimson-600 to-crimson-500 text-white text-sm font-semibold shadow-lg shadow-crimson-500/20">
                Most Popular
            </div>
        )}
        <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2 text-dark-700">{name}</h3>
            <p className="text-gray-500 text-sm mb-4 font-medium">{description}</p>
            <div className="text-4xl font-bold text-dark-700">{price}<span className="text-lg font-normal text-gray-400">/mo</span></div>
        </div>
        <ul className="space-y-4 mb-8">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${highlighted ? 'text-crimson-500' : 'text-gray-400'}`} />
                    <span className="text-gray-600 font-medium">{feature}</span>
                </li>
            ))}
        </ul>
        <Button asChild className={`w-full rounded-full h-12 ${highlighted ? 'bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white border-0 shadow-lg shadow-crimson-500/10' : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-0'}`}>
            <Link href="/sign-up">Get Started</Link>
        </Button>
    </div>
);
