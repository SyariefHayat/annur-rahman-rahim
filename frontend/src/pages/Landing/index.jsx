import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import Navbar from './Navbar'
import HeroSection from '@/components/Modules/Landing/HeroSection'
import CampaignSection from '@/components/Modules/Landing/CampaignSection'
import ArticleSection from '@/components/Modules/Landing/ArticleSection'
import WelcomeSection from '@/components/Modules/Landing/WelcomeSection'
import Footer from '@/components/Modules/Landing/Footer'

const Landing = () => {
    return (
        <DefaultLayout>
            <Navbar />
            <HeroSection />
            <WelcomeSection />
            <CampaignSection />
            <ArticleSection />
            {/* <Footer /> */}
        </DefaultLayout>
    )
}

export default Landing