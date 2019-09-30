module.exports = {
  siteMetadata: {
    title: `Gatsby Netlify Catalog`,
    description: `Simple catalog implementation with React and Gatsby. Styled with Semantic UI, hosted by Netlify and maintained by Netlify CMS. Think eCommerce without the credit card integration. Great for local businesses.`,
    author: `@arsantiagolopez`,
    // Environment variables created in Netlify CMS
    personalInfo: {
      phone:
        process.env.PHONE_NUMBER == null
          ? 1234567890
          : process.env.PHONE_NUMBER,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify-cms`,
    // Needed to transform Netlify CMS image paths
    {
      resolve: `gatsby-plugin-netlify-cms-paths`,
      options: {
        // Path to your Netlify CMS config file
        cmsConfig: `/static/admin/config.yml`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-plugin-netlify-cms-paths`,
            options: {
              // Path to your Netlify CMS config file
              cmsConfig: `/static/admin/config.yml`,
            },
          },
        ],
      },
    },
    // Plugin to display a loading wheel if page
    // takes long to load.
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `yellow`,
        showSpinner: false,
      },
    },
    // Allow files to be discoverable by graphql
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/static/products`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `categories`,
        path: `${__dirname}/static/categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
  ],
}
