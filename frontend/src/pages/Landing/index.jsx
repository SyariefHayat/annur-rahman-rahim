import React from 'react'

import Navbar from './Navbar'
import Footer from '@/components/Modules/Landing/Footer'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import FaqSection from '@/components/Modules/Landing/FaqSection'
import HeroSection from '@/components/Modules/Landing/HeroSection'
import ImpactSection from '@/components/Modules/Landing/ImpactSection'
import FeatureSection from '@/components/Modules/Landing/FeatureSection'
import ArticleSection from '@/components/Modules/Landing/ArticleSection'
import CampaignSection from '@/components/Modules/Landing/CampaignSection'

const Landing = () => {
    return (
        <DefaultLayout>
            <Navbar />
            <HeroSection />
            <FeatureSection />
            <CampaignSection />
            <ImpactSection />
            <ArticleSection />
            <FaqSection />
            <Footer />
        </DefaultLayout>
    )
}

export default Landing