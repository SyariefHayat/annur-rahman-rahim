import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import Navbar from './Navbar'
import HeroSection from '@/components/Modules/Landing/HeroSection'
import CampaignSection from '@/components/Modules/Landing/CampaignSection'
import ArticleSection from '@/components/Modules/Landing/ArticleSection'
import Footer from '@/components/Modules/Landing/Footer'
import ImpactSection from '@/components/Modules/Landing/ImpactSection'
import FeatureSection from '@/components/Modules/Landing/FeatureSection'

const Landing = () => {
    return (
        <DefaultLayout>
            <Navbar />
            <HeroSection />
            <FeatureSection />
            <CampaignSection />
            <ImpactSection />
            <ArticleSection />
            <Footer />
        </DefaultLayout>
    )
}

export default Landing