import { expect, test } from '@playwright/test'
import axios from 'axios'
import * as fs from 'fs'

test('clashnode.com', async ({ page }) => {
  await page.goto('https://clashnode.com/f/freenode', {
    waitUntil: 'domcontentloaded',
    timeout: 0,
  })

  await page.locator('.post-list >> li >> nth=0 >> h2 >> a').click()

  const postContent = await page
    .locator('.post-content-content >> nth=0')
    .innerText()

  const matchResult = postContent.match(
    /(https\:\/\/clashnode\.com\/[a-zA-Z-\/0-9]+.yaml)/,
  )

  if (!matchResult) {
    console.log(postContent)
  }

  await expect(matchResult).not.toBeNull()

  const url = matchResult[1]
  console.log(url)

  const response = await axios.get(url, {
    responseType: 'blob',
  })

  await expect(response.status).toEqual(200)

  fs.writeFileSync('./public/clashnodecom.yaml', response.data)
})
