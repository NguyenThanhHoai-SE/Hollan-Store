export type Rate = {
    count: number,
    rate: number
}
export type Product = {
    id: number,
    title: string,
    category: string,
    description: string,
    image: string,
    price: number,
    rating: Rate
}