const yaml = require('js-yaml')
const fs = require('fs')
const nunjucks = require('nunjucks')

const groups = yaml.safeLoad(fs.readFileSync('groups.yml', 'utf8'))

let pages = fs.readdirSync(`pages/`)

pages = pages.filter(page => page.includes('.njk'))

pages.forEach((page) => {
  const renderedPage = nunjucks.render(`pages/${page}`, {groups})

  const filename = page.split('.')[0];
  fs.closeSync(fs.openSync(`${filename}.html`, 'a'))
  fs.writeFileSync(`${filename}.html`, renderedPage)
})
