import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Header from "./header"
import Archive from "./archive"
import "../css/reset.css"

const LayoutMain = styled.main`
  max-width: 90%;
  margin: 1rem auto;
  display: grid;
  grid-gap: 40px;

  @media screen and (min-width: 480px) {
    grid-template-columns: 3fr 1fr;
  }
`

const ContentBody = styled.div`
  max-width: 900px;
`

const LayoutFooter = styled.footer`
  padding: 1rem;
  text-align: center;
`

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <LayoutMain>
          <ContentBody>{children}</ContentBody>
          <Archive />
        </LayoutMain>
        <LayoutFooter>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </LayoutFooter>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  location: {},
}

export default Layout
