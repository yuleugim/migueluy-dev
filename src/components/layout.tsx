/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import { graphql, StaticQueryProps, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

type LayoutProps = {
  children: React.ReactNode
}

const darkModeEnabled = (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))

const Layout = ({ children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const [darkMode, setDarkMode] = React.useState(darkModeEnabled)
  React.useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <>
      <div className="flex lg:py-4 min-h-screen bg-slate-100 dark:bg-stone-900">
        <div className="relative mx-auto max-w-6xl grid md:grid-cols-4 md:grid-rows-[auto_minmax(0,_1fr)_auto] shadow-2xl rounded overflow-hidden gap-px bg-slate-200 dark:bg-slate-800">
          <section className="relative flex flex-col md:flex-row md:items-end md:justify-center col-span-full p-4 md:p-6 max-w-none bg-slate-100 dark:bg-slate-900 prose prose-2xl dark:prose-invert">
            <h1 className="font-display m-0">{data.site.siteMetadata.title}</h1>

            <p className="font-display m-0 pt-3 md:pt-0 md:pl-3">{data.site.siteMetadata.description}</p>

            <button
              type="button"
              role="switch"
              className="absolute right-0 bottom-0 md:bottom-auto md:top-0 md:mt-6 my-6 mr-6 w-14 py-1 px-0 inline-flex rounded-full cursor-pointer transition border-2 bg-gray-900 dark:bg-slate-200 border-gray-900"
              onClick={() => setDarkMode(!darkMode)}
            >
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full transition bg-slate-200 translate-x-6 dark:bg-gray-900 dark:translate-x-1"
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={darkMode ? faMoon : faSun} className="h-4" />
              </span>
            </button>
          </section>

          {children}

          <footer className="text-center col-span-full max-w-none bg-slate-100 dark:bg-slate-900 prose dark:prose-invert">
            <p className="p-4">
              © {new Date().getFullYear()} Miguel Uy
              <br />
              Built with <a href="https://github.com/yuleugim/migueluy.dev">React, Gatsby, Typescript, and TailwindCSS</a>
            </p>
          </footer>
        </div>
      </div>

      <Helmet htmlAttributes={{ class: darkMode ? 'dark' : '' }} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
