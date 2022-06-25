import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import { Pagination } from "../components/Pagination";
import PageLayout from "../layouts/PageLayout";
import "../styles/blog.page.css";

const BlogPage = (
  props: PageProps<
    any,
    {
      limit: number;
      numPages: number;
      currentPage: number;
      type?: string;
      tag?: string;
      tagSlug?: string;
    }
  >
) => {
  const { data } = props;

  const allMdxEdges = (data as any).allMdx.edges;

  function createLink(page: number) {
    if (props.pageContext.type === "tag") {
      if (page === 1) {
        return `/blog/tag/${props.pageContext.tagSlug}`;
      }
      return `/blog/tag/${props.pageContext.tagSlug}/${page}`;
    }
    if (page === 1) {
      return `/blog`;
    }
    return `/blog/${page}`;
  }

  const isTag = props.pageContext.type === "tag";

  const title = isTag ? `#${props.pageContext.tag}` : "Blog";

  return (
    <PageLayout title={`${title} | Giang Nguyen's Site`}>
      <h1 className="font-title">
        {isTag ? `Tag #${props.pageContext.tag}` : "Blog"}
      </h1>
      <div className="blog-list">
        {allMdxEdges.map((r: any) => {
          const date = new Date(r.node.frontmatter.date);
          return (
            <article className="post-item" key={r.node.fields.slug}>
              <h2 className="post-item__title">
                <Link
                  className="post-tag"
                  to={`/blog/post${r.node.fields.slug}`}
                >
                  {r.node.frontmatter.title}
                </Link>
              </h2>
              <p>
                <time dateTime={r.node.frontmatter.date}>
                  {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} -{" "}
                  {date.getHours()}:{date.getMinutes()}
                </time>
                {" - "}
                {r.node.frontmatter.tags?.map((t: string) => {
                  return (
                    <Link
                      className="post-tag"
                      to={`/blog/tag/${t.replace(" ", "-").toLowerCase()}`}
                      key={t}
                    >
                      #{String(t).toUpperCase()}
                    </Link>
                  );
                })}
              </p>
              <p>{r.node.frontmatter.intro}</p>
            </article>
          );
        })}
      </div>
      {props.pageContext.numPages > 1 && (
        <div className="blog-pagination">
          <Pagination
            createLink={createLink}
            page={props.pageContext.currentPage}
            pageCount={props.pageContext.numPages}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default BlogPage;

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!, $tag: [String]) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { tags: { in: $tag } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            intro
            tags
            date
          }
        }
      }
    }
  }
`;
