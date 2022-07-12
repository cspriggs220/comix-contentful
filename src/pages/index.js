import * as React from "react"
import Layout from "../components/layout"
// import Listing from "../components/listing"
import styled from "styled-components"

const Hero = styled.div`
  text-align: center;
`

const IndexPage = () => (
  <Layout>
    <h1>
      This is... (drum role please)
      <br />
      Owen's comics!
    </h1>
    <p>You will love this site that has comics with an x!!</p>
  </Layout>
)

export default IndexPage
