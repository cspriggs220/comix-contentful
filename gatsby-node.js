const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) {
        console.log("Error with contenful data", result.errors)
      }

      const blogPostTemplate = path.resolve("./src/templates/post.js")

      result.data.allContentfulBlogPost.edges.forEach(post => {
        createPage({
          path: `/posts/${post.node.slug}/`,
          component: path.resolve(blogPostTemplate),
          context: {
            slug: post.node.slug,
          },
        })
      })
    })
    .catch(error => console.log("Error with contentful data", error))
}
