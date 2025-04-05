import React from 'react'

import Navbar from './Navbar'
import Footer from '@/components/Modules/Landing/Footer'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import HeroSection from '@/components/Modules/Landing/SectionContents/HeroSection'
import FeatureSection from '@/components/Modules/Landing/SectionContents/FeatureSection'
import CampaignSection from '@/components/Modules/Landing/SectionContents/CampaignSection'
import ImpactSection from '@/components/Modules/Landing/SectionContents/ImpactSection'
import ArticleSection from '@/components/Modules/Landing/SectionContents/ArticleSection'
import FaqSection from '@/components/Modules/Landing/SectionContents/FaqSection'

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