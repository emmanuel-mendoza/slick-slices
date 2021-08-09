import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slick Slices`,
    siteUrl: 'htpps://gatsby.pizza',
    description: 'The best pizza place in Hamilton!',
    twitter: '@mytwaccount',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'aaobh8rq',
        dataset: 'production',
        watchMode: false,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
