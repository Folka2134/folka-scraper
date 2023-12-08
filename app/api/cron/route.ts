import { connectToDB } from "@/lib/mongoose"

import Product from "@/lib/models/product.model"
import { scrapeAmazonProduct } from "@/lib/scraper"
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer"
import { NextResponse } from "next/server"

export async function Get() {
  try {
    connectToDB()

    const products = await Product.find({})

    if(!products) return new Error("No products found")

    const updatedProducts = await Promise.all(products.map( async (currentProduct) => {

      // UPDATE PRODUCT WITH LATEST DETAILS
      const scrapedProduct = await scrapeAmazonProduct(currentProduct.url)

      if(!scrapedProduct) return new Error("No product found")

      const updatedPriceHistory = [
        ...currentProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ]

      const product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        avereagePrice: getAveragePrice(updatedPriceHistory)
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { url: scrapedProduct.url },
        product,
        )

      // CHECK PRODUCT STATUS & SEND EMAIL
      const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct)

      if(emailNotifType && updatedProduct.users.length > 0) {
        const productInfo = {
          title: updatedProduct.title,
          url: updatedProduct.url
        }

        const emailContent = await generateEmailBody(productInfo, emailNotifType)

        const userEmails = updatedProduct.users.map((user: any) => user.email)

        await sendEmail(emailContent, userEmails)
      }

      return updatedProduct
    }))

    return NextResponse.json({
      message: "ok", data: updatedProducts
    })
  } catch (error) {
    throw new Error(`Error in GET: ${error }`)
  }
}