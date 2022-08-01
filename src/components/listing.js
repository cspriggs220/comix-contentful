import { Link, StaticQuery, graphql } from "gatsby"
import React from 'react';

const LISTING_QUERY = graphql`
  query BlogPostListing {
    allContentfulBlogPost(
      limit: 10
      sort: { order: DESC, fields: date }
    ) {
      edges {
        node {
          body
          title
          date(formatString: "MMM, DD YYYY")
        }
      }
    }
  }
`

// component here
