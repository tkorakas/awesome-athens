const yaml = require('js-yaml')
const fs = require('fs')
const ejs = require('ejs')

const groups = yaml.safeLoad(fs.readFileSync('groups.yml', 'utf8'))

console.log(groups)
let pages = fs.readdirSync(`pages/`)

pages = pages.filter(page => page.includes('.ejs'))

pages.forEach((page) => {
  ejs.renderFile(`pages/${page}`, {groups}, function(err, str) {
    const filename = page.split('.')[0];
    fs.closeSync(fs.openSync(`${filename}.html`, 'a'))
    fs.writeFileSync(`${filename}.html`, str)
  })
})

