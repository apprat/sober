const tooltip = document.createElement('s-tooltip')
const fab = document.createElement('s-fab')
const icon = document.createElement('s-icon')
icon.name = 'dark_mode'
fab.appendChild(icon)
fab.slot = 'trigger'
tooltip.setAttribute('style', `position: fixed;right: 24px;bottom: 24px;transform: scale(1);`)
tooltip.textContent = '切换暗色或亮色主题'
tooltip.appendChild(fab)

const page = document.body.firstElementChild
if (page && page.tagName === 'S-PAGE') {
  page.appendChild(tooltip)
  fab.addEventListener('click', () => {
    page.toggle(page.theme === 'dark' ? 'light' : 'dark', fab)
    icon.name = page.theme === 'dark' ? 'light_mode' : 'dark_mode'
  })
}

document.addEventListener('gesturestart', (event) => event.preventDefault())