import axios from 'axios'
import { writeFileSync } from 'fs'
import { Browser } from 'playwright'

export async function downloadLatestClashConfig(browser: Browser) {
  console.log('start download clash config from nodefree.org')

  const page = await browser.newPage()

  await page.goto('https://nodefree.org/f/freenode', {
    waitUntil: 'domcontentloaded',
  })

  const locator = await page.locator('.post-loop >> li >> nth=0 >> h2 >> a')
  const detailUrl = await locator.getAttribute('href')

  if (!detailUrl) {
    console.log('get latest post failed')
    return
  }

  await page.goto(detailUrl, {
    waitUntil: 'domcontentloaded',
  })

  const postContent = await page.locator('.entry-content >> nth=0').innerText()

  const matchResult = postContent.match(
    /(https\:\/\/nodefree\.org\/[a-zA-Z-\/0-9]+.yaml)/,
  )
  if (!matchResult) {
    console.log('match clash config fail')
    return
  }

  const url = matchResult[1]
  console.log(url)

  const response = await axios.get(url, {
    responseType: 'blob',
  })

  writeFileSync('./public/nodefreeorg.yaml', response.data)
}
