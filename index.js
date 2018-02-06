const yaml = require('js-yaml')
const fs = require('fs')
const nunjucks = require('nunjucks')

const groups = yaml.safeLoad(fs.readFileSync('groups.yml', 'utf8'))

let pages = fs.readdirSync(`pages/`)

pages = pages.filter(page => page.includes('.njk'))

pageNames = pages.map(page => page.split('.')[0])

const pageTitles = {
  'index': 'Awesome Athens',
  'about': 'About',
  'contact': 'Contact'
}

if (!fs.existsSync('public')){
  fs.mkdirSync('public');
}

pages.forEach((page) => {
  const currentPage = page.split('.')[0]

  const renderedPage = nunjucks.render(`pages/${page}`, {groups, title: pageTitles[currentPage]})

  fs.closeSync(fs.openSync(`${__dirname}/public/${currentPage}.html`, 'a'))
  fs.writeFileSync(`${__dirname}/public/${currentPage}.html`, renderedPage)
})

console.log('Build completed!')
return 0
