const yaml = require('js-yaml')
const fs = require('fs')
const nunjucks = require('nunjucks')

const groups = yaml.safeLoad(fs.readFileSync('groups.yml', 'utf8'))

let pages = fs.readdirSync(`pages/`)

pages = pages.filter(page => page.includes('.njk'))

pages.forEach((page) => {
  const pageName = page.split('.')[0]

  const renderedPage = nunjucks.render(`pages/${page}`, {groups, page: pageName})

  fs.closeSync(fs.openSync(`${pageName}.html`, 'a'))
  fs.writeFileSync(`${pageName}.html`, renderedPage)
})
