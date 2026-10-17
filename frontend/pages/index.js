import { getApolloClient } from '../lib/apollo'
import { HOME_PAGE_QUERY } from '../lib/queries'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import FeaturedCasesSection from '../components/sections/FeaturedCasesSection'
import StatsSection from '../components/sections/StatsSection'
import PartnersSection from '../components/sections/PartnersSection'
import AwardsSection from '../components/sections/AwardsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import LatestNewsSection from '../components/sections/LatestNewsSection'
import LinkedInSection from '../components/sections/LinkedInSection'
import NewsletterSection from '../components/sections/NewsletterSection'

export default function Home({ pageData, spaceflightArticles }) {
	const fields = pageData?.homepageFields || {}

  return (
    <>
      <Navbar />
      <main>
        <HeroSection data={fields} />
        <AboutSection data={fields} />
        <ServicesSection data={fields} />
        <FeaturedCasesSection data={fields} />
        <StatsSection data={fields} />
        <PartnersSection data={fields} />
        <AwardsSection data={fields} />
        <TestimonialsSection data={fields} />
        <LatestNewsSection articles={spaceflightArticles} />
        <LinkedInSection data={fields} />
        <NewsletterSection data={fields} />
      </main>
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  try {
    const client = getApolloClient()
    const { data } = await client.query({ query: HOME_PAGE_QUERY, fetchPolicy: 'network-only' })

    return {
      props: {
        pageData: data?.page || null,
       spaceflightArticles: data?.spaceflightNews || [],
      },
    }
  } catch (err) {
    console.error('Failed to fetch page data:', err.message)
    return {
      props: { pageData: null, spaceflightArticles: [] },
    }
  }
}
