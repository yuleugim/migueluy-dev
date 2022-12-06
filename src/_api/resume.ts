import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import { readFile } from 'node:fs/promises'

const urlToPDF = async (url: string, pdfPath: string) => {
  // launch and create a new page
  const puppeteer = await import(/* webpackIgnore: true */ 'puppeteer')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({
    width: 1152, // 72 rem max width + 1 rem left margin + 1 rem right margin,
    height: 1,  // Passing 1 since height is a required value, but the true
                // height however is reliant on the body's bounding box
  })

  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  const el = await page.$('body')
  const boundingBox = await el!.boundingBox()

  await page.pdf({
    path: pdfPath,
    width: boundingBox!.width,
    height: boundingBox!.height,
    printBackground: true
  })

  await browser.close()
}

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  if (req.method !== 'GET') res.redirect('/')

  // On non-development environments, use cached resume.pdf if it exists. This
  // can be cleared out using `gatsby build`, `gatsby clean`, or by deleting the
  // public folder
  if (process.env.NODE_ENV !== 'development') {
    try {
      await readFile(`${process.env.PUBLIC_DIR}/resume.pdf`)
      res.redirect(
        process.env.COMMIT_REF
          ? `/resume.pdf?ver=${process.env.COMMIT_REF}`
          : '/resume.pdf'
      )
    } catch (err) {
      // readFile error due to no file found, continuing to generate file
    }
  }

  await urlToPDF(
    `${process.env.DOMAIN || 'http://localhost:8000'}/?pdf=true`,
    `${process.env.PUBLIC_DIR}/resume.pdf`
  )

  res.redirect(
    process.env.COMMIT_REF
      ? `/resume.pdf?ver=${process.env.COMMIT_REF}`
      : '/resume.pdf'
  )
}
