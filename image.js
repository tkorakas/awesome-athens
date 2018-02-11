const sharp = require('sharp');
const fs = require('fs')

let images = fs.readdirSync(`groups/`)

images.forEach((image) => {
  sharp(`groups/${image}`)
    .background('white')
    .resize(300, 300)
    .toFile(`assets/${image}`, (err, info) => console.log(info, err) );
})
