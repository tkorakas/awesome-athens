const yaml = require('js-yaml')
const fs = require('fs')
const nunjucks = require('nunjucks')

const delayFactory = require('./delayCalls')

const API = 'https://api.meetup.com'
const key = process.env.MEETUP_KEY

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const groups = yaml.safeLoad(fs.readFileSync('groups.yml', 'utf8')).sort((a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  return 0
})

let myFactory = delayFactory({
  delayMs: 500
})
let events = groups.filter(group => group.url.includes('meetup.com'))
events.forEach((event) => {
  myFactory.queueCall(`${API}/${event.url.split('/')[3]}/events?page=20&key=${key}`)
    .then(res => console.log(res.data))
    .catch(console.log)
})

let pages = fs.readdirSync(`pages/`)

pages = pages.filter(page => page.includes('.njk'))

pageNames = pages.map(page => page.split('.')[0])

const pageTitles = {
  'index': 'Awesome Athens',
  'about': 'About',
  'contact': 'Contact'
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public')
}

pages.forEach((page) => {
  const currentPage = page.split('.')[0]

  const renderedPage = nunjucks.render(`pages/${page}`, {groups, title: pageTitles[currentPage]})

  fs.closeSync(fs.openSync(`${__dirname}/public/${currentPage}.html`, 'a'))
  fs.writeFileSync(`${__dirname}/public/${currentPage}.html`, renderedPage)
})

console.log('Build completed!')
return 0
