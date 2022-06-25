import { useStaticQuery, graphql } from "gatsby";

export const useSiteMetadata: () => { title: string; siteUrl: string } = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
      }
    `
  );
  return site.siteMetadata;
};
