import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
    projectId: "e76lgc4a",
    dataset: "production",
    apiVersion: "2022-11-02",
    useCdn: true,
    token: process.env.TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)