//https://stackoverflow.com/questions/42558149/delay-batch-get-requests-to-server-javascript
const axios = require('axios')

asyncFunc = async function(url) {
  return axios.get(url)
}

module.exports = function(args) {
  let {
    delayMs
  } = args
  let queuedCalls = []
  let executing = false

  let queueCall = function(url) {
    return new Promise((resolve, reject) => {

      queuedCalls.push({
        url,
        resolve,
        reject
      })

      if (executing === false) {
        executing = true
        nextCall()
      }
    })
  }

  let execute = async function(call) {
    try {
      const res = await asyncFunc(call.url)
      call.resolve(res)
    } catch(e) {
      call.reject(e)
    }

    setTimeout(nextCall, delayMs)
  }

  let nextCall = function() {
    if (queuedCalls.length > 0)
      execute(queuedCalls.shift())
    else
      executing = false
  }

  return Object.freeze({
    queueCall
  })
}