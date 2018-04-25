const base64Img = require('base64-img')
const fs = require('fs')

var data = base64Img.base64Sync('svg/message-square.svg')

let css = `
.icon-message-square {
  background-image: ${data}
}
`
console.log(css)
