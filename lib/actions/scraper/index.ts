import { extractCurrency, extractPrice } from "@/lib/utils"
import axios from "axios"
import * as cheerio from "cheerio"

export async function scrapeAmazonProduct(url: string) {
  if(!url) return

  // BrightData proxy config
  const username = String(process.env.BRIGHT_DATA_USERNAME)
  const password = String(process.env.BRIGHT_DATA_PASSWORD)
  const port = 22225
  const session_id = (1000000 * Math.random()) | 0
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false
  }

  try {
    const response = await axios.get(url, options)
    const $ = cheerio.load(response.data)
    
    const images = $("#imgBlkFont").attr("data-a-dynamic-image") || $("#landingImage").attr("data-a-dynamic-image") || "{}"
    const imageUrls = Object.keys(JSON.parse(images))

    const title = $("#productTitle").text().trim()

    const currency = extractCurrency($(".a-price-symbol"))

    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      )
    
    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceBlock_dealprice"),
      $(".a-size-base.a-color-price")
    )
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "")
  

    const outOfStock = $("#availability span").text().trim().toLowerCase() === "currently unavailable"

    console.log({imageUrls, title, currency,currentPrice, originalPrice, discountRate,outOfStock});
    
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
    
  }
}

