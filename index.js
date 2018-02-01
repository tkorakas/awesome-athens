const yaml = require('js-yaml')
const fs = require('fs')
const nunjucks = require('nunjucks')

const groups = yaml.safeLoad(fs.readFileSync('groups.yml', 'utf8'))

let pages = fs.readdirSync(`pages/`)

pages = pages.filter(page => page.includes('.njk'))

pageNames = pages.map(page => page.split('.')[0])

console.log(pageNames)

pages.forEach((page) => {
  const currentPage = page.split('.')[0]

  const renderedPage = nunjucks.render(`pages/${page}`, {groups, currentPage, pages: pageNames})

  fs.closeSync(fs.openSync(`${currentPage}.html`, 'a'))
  fs.writeFileSync(`${currentPage}.html`, renderedPage)
})
