import axios from 'axios'
import { writeFileSync } from 'fs'
import { Browser } from 'playwright'

export async function downloadLatestClashConfig(browser: Browser) {
  console.log('start download clash config from freenode.me')

  const page = await browser.newPage()

  await page.goto('https://freenode.me/f/freenode', {
    waitUntil: 'domcontentloaded',
  })

  const locator = await page.locator('.post-list >> li >> nth=0 >> h2 >> a')
  const detailUrl = await locator.getAttribute('href')

  if (!detailUrl) {
    console.log('get latest post failed')
    return
  }

  await page.goto(detailUrl, {
    waitUntil: 'domcontentloaded',
  })

  const postContent = await page
    .locator('.post-content-content >> nth=0')
    .innerText()

  const matchResult = postContent.match(
    /(https\:\/\/freenode\.me\/[a-zA-Z-\/0-9]+.yaml)/,
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

  writeFileSync('./public/freenodeme.yaml', response.data)
}
