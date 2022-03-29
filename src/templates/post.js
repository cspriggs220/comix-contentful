import React from "react"
import { graphql } from "gatsby"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import { motion } from "framer-motion"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Italic = ({ children }) => <span className="em">{children}</span>
const Underline = ({ children }) => <span className="u">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>
const H1 = ({ children }) => <h1 className="heading">{children}</h1>
const H2 = ({ children }) => <h2 className="heading">{children}</h2>
const H3 = ({ children }) => <h3 className="heading">{children}</h3>
const H4 = ({ children }) => <h4 className="heading">{children}</h4>
const H5 = ({ children }) => <h5 className="heading">{children}</h5>
const H6 = ({ children }) => <h6 className="heading">{children}</h6>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    [MARKS.ITALIC]: text => <Italic>{text}</Italic>,
    [MARKS.UNDERLINE]: text => <Underline>{text}</Underline>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.HEADING_1]: (node, children) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (node, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (node, children) => <H3>{children}</H3>,
    [BLOCKS.HEADING_4]: (node, children) => <H4>{children}</H4>,
    [BLOCKS.HEADING_5]: (node, children) => <H5>{children}</H5>,
    [BLOCKS.HEADING_6]: (node, children) => <H6>{children}</H6>,
    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
  },
}

const Post = ({ data }) => {
  const image = getImage(data.post.image)
  const location = data.props

  return (
    <Layout location={location}>
      <h1>{data.post.title}</h1>
      <motion.div
        initial={{
          opacity: 0.5
        }}
        animate={{
          opacity: 1,
          rotate: 360
        }}
        transition={{
          duration: 0.5
        }}
      >
        <GatsbyImage loading="lazy" image={image} alt={data.post.image.title} />
      </motion.div>
      <article>{renderRichText(data.post.content, options)}</article>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query ($slug: String!) {
    post: contentfulBlogPost(slug: { eq: $slug }) {
      content {
        raw
      }
      date
      slug
      title
      image {
        title
        file {
          url
        }
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
      }
      contentful_id
    }
  }
`
