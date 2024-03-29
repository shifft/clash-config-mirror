import { getBrowser } from './src/browser'
import { downloadLatestClashConfig as downloadClashConfigFromClashnode } from './src/clashnode'
import { downloadLatestClashConfig as downloadClashConfigFromFreenode } from './src/freenode'
import { downloadLatestClashConfig as downloadClashConfigFromNodefree } from './src/nodefree'

async function main() {
  const browser = await getBrowser()

  await downloadClashConfigFromClashnode(browser)
  await downloadClashConfigFromNodefree(browser)
  await downloadClashConfigFromFreenode(browser)
}

main()
  .then(() => {
    console.log('done')
  })
  .catch((err) => {
    console.warn(`fail: ${err}`)
  })
  .finally(() => {
    process.exit()
  })
