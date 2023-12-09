const fab = document.createElement('s-floating-action-button')
const icon = document.createElement('s-icon')
icon.type = 'dark_mode'
fab.appendChild(icon)
fab.setAttribute('style', `position: fixed;right: 0;bottom: 0;`)
const page = document.body.firstElementChild
if (page && page.tagName === 'S-PAGE') {
  page.appendChild(fab)
  fab.addEventListener('click', () => {
    page.theme = page.theme === 'dark' ? 'light' : 'dark'
    icon.type = page.theme === 'dark' ? 'light_mode' : 'dark_mode'
  })
}