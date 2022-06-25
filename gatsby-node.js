/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};

function convertStringToSlug(s) {
  return s.replace(" ", "-").toLowerCase();
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              title
              intro
              tags
              date
            }
            body
            tableOfContents
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const pagesBlog = result.data.allMdx.edges;

  const perPage = 10;

  const numPages = Math.ceil(pagesBlog.length / perPage);

  const tags = {};

  pagesBlog.forEach(({ node }, index) => {
    node.frontmatter.tags.forEach((t) => {
      const slug = convertStringToSlug(t);
      if (tags[slug]) {
        tags[slug].count = tags[slug].count + 1;
        tags[slug].posts = [...tags[slug].posts, node];
      } else {
        tags[slug] = {
          count: 1,
          posts: [node],
          tag: t,
          tagSlug: t,
        };
      }
    });

    createPage({
      path: `/blog/post${node.fields.slug}`,
      component: path.resolve(`./src/layouts/BlogDetail.tsx`),
      context: {
        id: node.id,
        frontmatter: node.frontmatter,
        mdxBody: node.body,
        tableOfContents: node.tableOfContents,
      },
    });
  });

  Object.keys(tags).forEach((t) => {
    const tagPages = Math.ceil(tags[t].count / perPage);
    const tag = tags[t];
    Array.from({ length: tagPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog/tag/${t}` : `/blog/tag/${t}/${i + 1}`,
        component: path.resolve("./src/layouts/Blog.tsx"),
        context: {
          type: "tag",
          tag: tag.tag,
          tagSlug: tag.tagSlug,
          limit: perPage,
          skip: i * perPage,
          numPages: Math.ceil(tags[t].count / perPage),
          currentPage: i + 1,
        },
      });
    });
  });

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/layouts/Blog.tsx"),
      context: {
        limit: perPage,
        skip: i * perPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
