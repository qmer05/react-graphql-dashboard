export interface Campaign {
    id: number
    name: string
    channel: string
    startDate: string
    endDate: string
    cost: number
    revenue: number
    profitMargin: number
    product: {
        name: string
        category: string
        basePrice: number
    }
}