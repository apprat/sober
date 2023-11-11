const fab = document.createElement('s-floating-action-button')
fab.size = 'small'
const icon = document.createElement('s-icon')
icon.type = 'done'
fab.appendChild(icon)
const root = document.body.firstElementChild
root && root.firstElementChild ? root.insertBefore(fab, root.firstElementChild) : document.body.appendChild(fab)

const darkStyle = document.createElement('style')
darkStyle.textContent = `@import url('../theme/dark.css')`
fab.addEventListener('click', () => document.head[!darkStyle.isConnected ? 'appendChild' : 'removeChild'](darkStyle))