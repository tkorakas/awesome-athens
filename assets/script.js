const options = {
  valueNames: ['card-title', 'type']
}

const hackerList = new List('cards-container', options)

const radios = document.querySelectorAll('input[name="types"]')
let radiosState = {}
radios.forEach(function(el) {
  radiosState[el.id] = false
  el.addEventListener('click', function(event) {
    if (!radiosState[el.id]) {
      Object.keys(radiosState).forEach(key => radiosState[key] = false)
      radiosState[el.id] = true
      hackerList.filter(item => item.values().type === event.target.id)
    } else {
      Object.keys(radiosState).forEach(key => radiosState[key] = false)
      el.checked = false
      hackerList.filter(item => true)
    }
  })
})
