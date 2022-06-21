import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  children: React.ReactNode;
  pageContext: any;
  path: string;
};

export default function Blog(props: Props) {
  const { pageContext } = props;

  const title = pageContext.frontmatter?.title;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} | Giang Nguyen's Blog</title>
      </Helmet>

      <MDXProvider>
        <MDXRenderer>{pageContext.mdxBody}</MDXRenderer>
      </MDXProvider>
    </>
  );
}
