import { graphql, PageProps } from 'gatsby'
import * as React from 'react'
import { useQueryParamString } from 'react-use-query-param-string'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import resumePDF from '../../static/resume.pdf'
import Experience from '../components/Experience'

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  const [PDFParam] = useQueryParamString('pdf', '')

  return (
    <Layout>
      <Seo title="Home" />

      <aside className="col-span-1 p-4 max-w-none prose prose-a:break-words prose-headings:text-nord-9 dark:prose-invert">
        {!PDFParam && (
          <a className="block mb-8" href={resumePDF}>
            Resume
          </a>
        )}

        <div
          className="col-span-1 max-w-none prose prose-a:break-words prose-headings:text-nord-9 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.aside?.html || '' }}
        />
      </aside>

      <main className="md:col-start-2 md:col-end-5 p-4 max-w-none prose prose-headings:text-nord-9 dark:prose-invert">
        <h2>Experience</h2>

        {data.experiences.edges.map((edge, i) => (
          <Experience
            title={edge.node.frontmatter?.title}
            company={edge.node.frontmatter?.company}
            current={edge.node.frontmatter?.current}
            dateFrom={edge.node.frontmatter?.dateFrom}
            dateTo={edge.node.frontmatter?.dateTo}
            content={edge.node.html}
            key={i}
          />
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
      sort: { frontmatter: { dateFrom: DESC } }
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
