import { gql } from '@apollo/client';

export const HOME_PAGE_QUERY = gql`
  query HomePage {
    page(id: "home", idType: URI) {
	    homepageFields {
        heroTagline
        heroHeading
        aboutHeading
        aboutBody
        servicesHeading
        servicesBody
        linkedinHeading
        linkedinSubtext
        linkedinUrl
        newsletterHeading
        newsletterSubtext
      }
    }
    spaceflightNews(first: 6) {
      title
	    url
      newsSite
      publishedAt
      imageUrl
    }
  }
`;
