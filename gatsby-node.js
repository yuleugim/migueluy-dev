const { join } = require('path')
const { readFile, unlink } = require('fs/promises')

exports.onPostBuild = async ({ reporter }) => {
  // process.env.PUBLIC_DIR is not exposed by Gatsby at this step, however per
  // https://github.com/gatsbyjs/gatsby/issues/14703 it does not look like it
  // will change anytime soon from `/public`
  const pdfPath = `${join(__dirname, 'public')}/resume.pdf`

  try {
    await readFile(pdfPath)
    reporter.info(`Clearing ${pdfPath} from cache`)
    await unlink(pdfPath)
  } catch (err) {
    // No file found, no action needed
  }
}
