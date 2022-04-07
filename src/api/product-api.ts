import axios from 'axios';

export const initialAPI = axios.create({
    baseURL: 'https://artisant.io/api'
})
export const productApi = {
    getProducts() {
        return initialAPI.get<ProductsAPIType>('/products')
    }
}

export type ProductType = {
    isFavorite: boolean
    buyingCount: number
    created_by: {
        display_name: string
        user_id: number
    }
    description: string
    initial_price: number
    json_nft_data: {
        external_url: string
        attributes: [
            { value: string, trait_type: string }
        ]
    }
    latest_price: string
    name: string
    on_main_page: boolean
    product_id: number
    quantity: number
    quantity_available: number
    type: string
    updated_at: Date
}
type ProductsAPIType = {
        data:{
            products: Array<ProductType>
        }
}
