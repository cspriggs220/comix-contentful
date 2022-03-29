import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { motion } from "framer-motion"

const POST_ARCHIVE_QUERY = graphql`
  query BlogPostArchive {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            slug
            date(formatString: "MMM, DD YYYY")
            title
          }
        }
      }
    }
  }
`

const ContentArchive = styled.aside`
  padding: 1rem 0;
`

const ArchiveList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  a {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 0.8rem;
    text-decoration: underline;
    color: #524763;
  }
`

const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({ allMarkdownRemark }) => (
      <>
        <ContentArchive>
          <h3>Archive</h3>
          <ArchiveList>
            {allMarkdownRemark.edges.map(edge => (
              <motion.li
                key={edge.node.frontmatter.slug}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
              >
                <Link to={`/posts${edge.node.frontmatter.slug}`}>
                  {edge.node.frontmatter.title}
                </Link>
              </motion.li>
            ))}
          </ArchiveList>
        </ContentArchive>
      </>
    )}
  />
)

export default Archive
