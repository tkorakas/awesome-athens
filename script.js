const options = {
  valueNames: ['card-title', 'type']
}

// Refactor without jQuery.
const hackerList = new List('cards', options)

const resetButton = document.querySelector('#reset')
const radios = document.querySelectorAll('input[name="inlineRadioOptions"]')

radios.forEach(el => {
  el.addEventListener('change', (event) => {
    hackerList.filter(item => item.values().type === event.target.value)
  })
})
resetButton.addEventListener('click', function (e) {
  e.preventDefault();
  hackerList.filter(item => true)
  radios.forEach(el => el.checked = false);
});
