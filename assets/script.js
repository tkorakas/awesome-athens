const options = {
  valueNames: ['card-title', 'type']
}

const hackerList = new List('cards', options)

const resetButton = document.querySelector('#reset')
const radios = document.querySelectorAll('input[name="radio"]')

radios.forEach(function(el) {
  el.addEventListener('change', function(event) {
    hackerList.filter(item => item.values().type === event.target.value)
  })
})

resetButton.addEventListener('click', function (e) {
  e.preventDefault();
  hackerList.filter(item => true)
  radios.forEach(el => el.checked = false);
})
