import browserCjs from '@marp-team/marp-core/lib/browser.cjs'
import { webkit } from '@marp-team/marpit-svg-polyfill'

export default function preview() {
  const marpEnabled = document.getElementById('marp-vscode')

  if (marpEnabled) {
    document.body.classList.add('marp-vscode')

    // Remove default styles
    const styles = document.querySelectorAll(
      'style:not(#marp-vscode-style):not(#_defaultStyles)'
    )
    const links = document.querySelectorAll(
      'link[rel="stylesheet"]:not([href*="marp-vscode"])'
    )
    styles.forEach(elm => elm.remove())
    links.forEach(elm => elm.remove())

    // Run Marp observer
    browserCjs()

    // VSCode has the same rendering bug as WebKit.
    const observer = () => {
      webkit()
      window.requestAnimationFrame(observer)
    }
    observer()
  }
}
