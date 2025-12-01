'use client";'

import Navbar from "@/components/layout/navbar";
import Hero from "@/components/features/landing/hero";
import HowItWorks from "@/components/features/landing/how-it-works";
import PowerfulFeatures from "@/components/features/landing/powerful-features";
import EndlessPossibilities from "@/components/features/landing/endless-possibilities";
import UnlockPossibilitiesCTA from "@/components/features/landing/unlock-possibilities-cta";
import StartConversation from "@/components/features/landing/start-conversation";
import Footer from "@/components/features/landing/footer";

export default function Homepage() {
    return (
        <div className="bg-white scroll-smooth overflow-x-hidden">
            <main className="min-h-screen w-screen min-w-lvw bg-white -mt-16 overflow-x-clip">
                <Navbar />
                {/* Hero Section */}
                <Hero />
                {/* How it works */}
                <HowItWorks />
                {/* Powerful Features */}
                <PowerfulFeatures />
                {/* Endless Possibilities */}
                <EndlessPossibilities />
                {/* Unlock Possibilities CTA */}
                <UnlockPossibilitiesCTA />
                {/* start conversation */}
                <StartConversation />
                {/* Footer */}
                <Footer />
            </main>
        </div>
    )
}