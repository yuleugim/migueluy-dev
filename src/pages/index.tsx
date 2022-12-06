import { graphql, PageProps } from 'gatsby'
import * as React from 'react'
import { useQueryParamString } from 'react-use-query-param-string'

import Layout from '../components/layout'
import Seo from '../components/seo'

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  const [PDFParam] = useQueryParamString('pdf', '')

  return (
    <Layout>
      <Seo title="Home" />

      <aside className="col-span-1 p-4 max-w-none prose prose-a:break-words prose-headings:text-nord-9 dark:prose-invert">
        {!PDFParam && <a className="block mb-8" href="/api/resume">Resume</a>}

        <div
          className="col-span-1 max-w-none prose prose-a:break-words prose-headings:text-nord-9 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.aside?.html || '' }}
        />
      </aside>

      <main className="md:col-start-2 md:col-end-5 p-4 max-w-none prose prose-headings:text-nord-9 dark:prose-invert">
        <h2>Experience</h2>

        {data.experiences.edges.map((edge, i) => (
          <section key={i}>
            <h3 className="font-display">{edge.node.frontmatter?.title}</h3>
            <p className="font-display">
              <strong>{edge.node.frontmatter?.company}</strong>{' '}
              <em>
                {edge.node.frontmatter?.dateFrom} -{' '}
                {edge.node.frontmatter?.current
                  ? 'Current'
                  : edge.node.frontmatter?.dateTo}
              </em>
            </p>
            <div dangerouslySetInnerHTML={{ __html: edge.node.html || '' }} />
          </section>
        ))}
      </main>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPage {
    aside: markdownRemark(frontmatter: { type: { eq: "aside" } }) {
      html
    }
    experiences: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "experience" } } }
      sort: { fields: frontmatter___dateFrom, order: DESC }
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
