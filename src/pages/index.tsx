import { graphql, PageProps } from 'gatsby'
import * as React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => (
  <Layout>
    <>
      <Seo title="Home" />

      <aside
        className="col-span-1 p-4 max-w-none prose prose-a:break-words dark:prose-invert bg-slate-100 dark:bg-slate-900"
        dangerouslySetInnerHTML={{ __html: data.aside?.html || '' }}
      />

      <main className="md:col-start-2 md:col-end-5 p-4 max-w-none prose dark:prose-invert bg-slate-100 dark:bg-slate-900">
        <h2>Experience</h2>

        {data.experiences.edges.map((edge) => (
          <section>
            <h3 className="font-display">{edge.node.frontmatter?.title}</h3>
            <p className="font-display">
              <strong>{edge.node.frontmatter?.company}</strong>
              {' '}
              <em>{edge.node.frontmatter?.dateFrom} - {edge.node.frontmatter?.current ? 'Current' : edge.node.frontmatter?.dateTo}</em>
            </p>
            <p dangerouslySetInnerHTML={{__html: edge.node.html || ''}} />
          </section>
        ))}
      </main>
    </>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexPage {
    aside: markdownRemark(
      frontmatter: {type: {eq: "aside"}}
    ) {
      html
    }
    experiences: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "experience"}}}
      sort: {fields: frontmatter___dateFrom, order: DESC}
    ) {
      edges {
        node {
          html
          frontmatter {
            slug
            company
            title
            current
            dateFrom(formatString: "MMM YYYY")
            dateTo(formatString: "MMM YYYY")
          }
        }
      }
    }
  }
`
