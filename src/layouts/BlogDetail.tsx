import { MDXProvider } from "@mdx-js/react";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Helmet } from "react-helmet";
import { BlogCode } from "../components/BlogCode";
import { useSiteMetadata } from "../hooks/useSiteData";
import PageLayout from "./PageLayout";

import "../styles/blog-detail.page.css";

type Props = {
  children: React.ReactNode;
  pageContext: any;
  path: string;
};

export default function BlogDetail(props: Props) {
  const { pageContext } = props;

  const title = pageContext.frontmatter?.title;
  const intro = pageContext.frontmatter?.intro;
  const date = new Date(pageContext.frontmatter.date);
  const edit = pageContext.frontmatter.edit
    ? new Date(pageContext.frontmatter.edit)
    : undefined;
  const tags = pageContext.frontmatter.tags;

  console.log(pageContext.frontmatter);

  const { pathname } = useLocation();

  const site = useSiteMetadata();

  const url = `${site.siteUrl}${pathname}`;

  const structuredJSON = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    editor: "Giang Nguyen",
    keywords: "react front-end react-query",
    url: { url },
    datePublished: pageContext.frontmatter.date,
    dateCreated: pageContext.frontmatter.date,
    dateModified:
      pageContext.frontmatter.dateModified || pageContext.frontmatter.date,
    description: { intro },
    author: {
      "@type": "Person",
      name: "Giang",
    },
  };

  return (
    <PageLayout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={intro} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={intro} />
        <script type="application/ld+json">
          {JSON.stringify(structuredJSON)}
        </script>
      </Helmet>
      <article>
        <h1 className="font-title color-primary">{title}</h1>
        <p>
          Published on{" "}
          <time dateTime={pageContext.frontmatter.date}>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} -{" "}
            {date.getHours()}:{date.getMinutes()}
          </time>{" "}
          -{" "}
          {tags?.map((t: string) => {
            return (
              <Link
                className="post-tag"
                to={`/blog/tag/${String(t).toLowerCase()}`}
                key={t}
              >
                #{String(t).toUpperCase()}
              </Link>
            );
          })}
        </p>
        {edit && (
          <time className="blog-edited">
            Edited on: {edit.getDate()}/{edit.getMonth() + 1}/
            {edit.getFullYear()} - {edit.getHours()}:{edit.getMinutes()}
          </time>
        )}
        <div className="blog-body">
          <MDXProvider
            components={{
              pre: (props: any) => {
                return <BlogCode {...props.children.props} />;
              },
            }}
          >
            <MDXRenderer>{pageContext.mdxBody}</MDXRenderer>
          </MDXProvider>
        </div>
      </article>
    </PageLayout>
  );
}
