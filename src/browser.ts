import { chromium } from 'playwright'

export function getBrowser() {
  return chromium.launch()
}
