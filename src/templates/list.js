import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { useLocalJsonForm } from "gatsby-tinacms-json"

import {
  Paper,
  Meta,
  MetaSpan,
  MetaActions,
  DraftBadge,
} from "../components/style"
import { Link } from "gatsby"
import { PageLayout } from "../components/pageLayout"

export default function List({ data, pageContext }) {
  const [page] = useLocalJsonForm(data.page, ListForm)

  const { slug, numPages, currentPage } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? slug : slug + "/" + (currentPage - 1).toString()
  const nextPage = slug + "/" + (currentPage + 1).toString()
  page.title = isFirst ? page.title : page.title + " - " + currentPage

  return (
    <PageLayout page={page} wide={true}>
      <>
        {data.posts &&
          data.posts.edges.map((item) => {
            return (
              <Paper article key={item.node.id}>
                {item.node.frontmatter.draft && <DraftBadge>Luonnos</DraftBadge>}
                <FlexContainer>
                  <div>
                    <h2>
                      <Link to={item.node.frontmatter.path}>
                        {item.node.frontmatter.title}
                      </Link>
                    </h2>
                    <p>{item.node.excerpt}</p>
                  </div>
                  <Meta>
                    <MetaSpan>{item.node.frontmatter.date}</MetaSpan>
                    <MetaActions>
                      <Link to={item.node.frontmatter.path}>Lue lisää →</Link>
                    </MetaActions>
                  </Meta>
                </FlexContainer>
              </Paper>
            )
          })}
        <ListNav>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Uudemmat
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Vanhemmat →
            </Link>
          )}
        </ListNav>
      </>
    </PageLayout>
  )
}

export const pageQuery = graphql`
  query($listType: String!, $slug: String!, $skip: Int!, $limit: Int!) {
    page: pagesJson(path: { eq: $slug }) {
      path
      title
      hero {
        headline
        textline
        large
        overlay
        ctas {
          label
          link
          primary
          arrow
        }
        image {
          childImageSharp {
            fluid(quality: 70, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      listType
      rawJson
      fileRelativePath
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { type: { eq: $listType } }
        published: { eq: true }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date(formatString: "D.M.YYYY")
            path
            title
            draft
          }
        }
      }
    }
  }
`

export const ListNav = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
  }
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ListForm = {
  label: "Page",
  fields: [
    {
      label: "Title",
      name: "rawJson.title",
      component: "text",
    },
    {
      label: "Hero",
      name: "rawJson.hero",
      component: "group",
      fields: [
        {
          label: "Headline",
          name: "headline",
          component: "text",
        },
        {
          label: "Textline",
          name: "textline",
          component: "text",
        },
        {
          label: "Image",
          name: "image",
          component: "image",
          parse: (filename) => `../images/${filename}`,
          uploadDir: () => `/content/images/`,
          previewSrc: (formValues) => {
            if (!formValues.jsonNode.hero || !formValues.jsonNode.hero.image)
              return ""
            return formValues.jsonNode.hero.image.childImageSharp.fluid.src
          },
        },
        {
          label: "Actions",
          name: "ctas",
          component: "group-list",
          itemProps: (item) => ({
            key: item.link,
            label: item.label,
          }),
          fields: [
            {
              label: "Label",
              name: "label",
              component: "text",
            },
            {
              label: "Link",
              name: "link",
              component: "text",
            },
            {
              label: "Primary",
              name: "primary",
              component: "toggle",
            },
            {
              label: "Arrow",
              name: "arrow",
              component: "toggle",
            },
          ],
        },
        {
          label: "Large",
          name: "large",
          component: "toggle",
        },
      ],
    },
  ],
}
