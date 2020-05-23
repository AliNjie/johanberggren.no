/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require("path")

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    "gatsby-plugin-typescript",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `album-covers`,
        path: path.join(__dirname, `src`, `components`, "music", "img"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `gallery-images`,
        path: path.join(__dirname, `src`, `assets`, "img", "gallery"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `general-images`,
        path: path.join(__dirname, `src`, `assets`, "img"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about-images`,
        path: path.join(__dirname, `src`, `assets`, "img", "about"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `event-content`,
        path: path.join(__dirname, "content", "events"),
      },
    },
  ],
}
