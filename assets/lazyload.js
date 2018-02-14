const slowLoad = window.setTimeout(() => {
  const images = document.querySelectorAll('.card-image > img')
  images.forEach(image => image.dataset.src = 'assets/placeholder.png')
  new LazyLoad()
}, 1500)

window.addEventListener('load', () => {
  window.clearTimeout(slowLoad)
  new LazyLoad()
}, false)
