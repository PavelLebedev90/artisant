import {productApi, ProductType} from '../api/product-api';
import {Dispatch} from 'redux';


const initialState: InitialStateType = {
    products: [] as Array<ProductType>,
    quantity: null,
    isFetching: false,
    favoriteProducts: [] as Array<ProductType>,
    basket: [] as Array<ProductType>
}

export const productReducer = (state = initialState, action: ActionProductType): InitialStateType => {
    switch (action.type) {
        case 'PRODUCT/GET-PRODUCT':
            return {
                ...state,
                products: state.quantity ? action.payload.product
                        .map(el => ({...el, isFavorite: false, buyingCount: 0}))
                        .filter(el => el.quantity_available > 0)
                    :
                    [
                        ...action.payload.product.map(el => ({...el, isFavorite: false, buyingCount: 0}))
                    ]
            }
        case 'PRODUCT/SET-USER-QUANTITY':
            return {
                ...state,
                ...action.payload,
            }
        case 'PRODUCT/SET-IS-FETCHING':
            return {
                ...state,
                isFetching: action.payload.fetching
            }
        case 'PRODUCT/SET-USER-FAVORITE-PRODUCT':
            return {
                ...state,
                products: state.products.map(el => el.product_id === action.payload.favoriteProduct.product_id
                    ? {...el, isFavorite: true} : el),
                favoriteProducts: [...state.favoriteProducts, action.payload.favoriteProduct]
            }
        case 'PRODUCT/DELETE-USER-FAVORITE-PRODUCT':
            return {
                ...state,
                products: state.products.map(el => el.product_id === action.payload.productId
                    ? {...el, isFavorite: false} : el),
                favoriteProducts: state.favoriteProducts.filter(el => el.product_id !== action.payload.productId)
            }
        case 'PRODUCT/SET-USER-BUYING':
            let newBasket = [...state.basket]
            for (let i = 0; i < newBasket.length; i++) {
                if (newBasket[i].product_id === action.payload.product.product_id) {
                    newBasket[i] = {...newBasket[i], buyingCount: newBasket[i].buyingCount + 1}
                    break
                } else if (i === newBasket.length - 1) {
                    newBasket = [...newBasket,
                        {...action.payload.product, buyingCount: action.payload.product.buyingCount + 1}]
                    break
                }
            }
            if (!newBasket.length) {
                newBasket = [...newBasket,
                    {...action.payload.product, buyingCount: action.payload.product.buyingCount + 1}]
            }

            return {
                ...state,
                products: state.products.map(el => el.product_id === action.payload.product.product_id
                    ? {...el, buyingCount: el.buyingCount + 1} : el),
                basket: newBasket

            }
        case 'PRODUCT/SET-SAVED-FAVORITE-PRODUCT':
            return {
                ...state,
                products: state.products.map(el => el.product_id === action.payload.productId
                    ? {...el, isFavorite: true} : el),
                favoriteProducts: [...action.payload.SavedFavoriteProduct]
            }
        case 'PRODUCT/SET-SAVED-BASKET-PRODUCT':
            return {
                ...state,
                products: state.products.map(el => el.product_id === action.payload.basketProduct.product_id
                    ? {...el, buyingCount: action.payload.basketProduct.buyingCount} : el),
                basket: [...action.payload.basketProducts]
            }
        default:
            return state
    }
}

export const getProduct = (product: Array<ProductType>) => {
    return {
        type: 'PRODUCT/GET-PRODUCT',
        payload: {
            product
        }
    } as const
}
export const setIsFetching = (fetching: boolean) => {
    return {
        type: 'PRODUCT/SET-IS-FETCHING',
        payload: {
            fetching
        }
    } as const
}
export const setUserQuantity = (quantity: null | boolean) => {
    return {
        type: 'PRODUCT/SET-USER-QUANTITY',
        payload: {
            quantity
        }
    } as const
}
export const setUserBuying = (product: ProductType) => {
    return {
        type: 'PRODUCT/SET-USER-BUYING',
        payload: {
            product,
        }
    } as const
}
export const setUserFavoriteProduct = (favoriteProduct: ProductType) => {
    return {
        type: 'PRODUCT/SET-USER-FAVORITE-PRODUCT',
        payload: {
            favoriteProduct
        }
    } as const
}
export const setSavedFavoriteProduct = (SavedFavoriteProduct: ProductType[], productId: number) => {
    return {
        type: 'PRODUCT/SET-SAVED-FAVORITE-PRODUCT',
        payload: {
            SavedFavoriteProduct,
            productId
        }
    } as const
}
export const setSavedBasketProduct = (basketProducts: ProductType[], basketProduct: ProductType) => {
    return {
        type: 'PRODUCT/SET-SAVED-BASKET-PRODUCT',
        payload: {
            basketProducts,
            basketProduct
        }
    } as const
}
export const deleteUserFavoriteProduct = (productId: number) => {
    return {
        type: 'PRODUCT/DELETE-USER-FAVORITE-PRODUCT',
        payload: {
            productId
        }
    } as const
}

export const getUserProduct = () => async (dispatch: Dispatch<ActionProductType>) => {
    try {
        dispatch(setIsFetching(true))
        const prod = await productApi.getProducts()
        dispatch(getProduct(prod.data.data.products))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setIsFetching(false))
    }
}
export const getSavedFavoriteProduct = (productId: number) => (dispatch: Dispatch<ActionProductType>) => {
    const favoriteProductToString = localStorage.getItem('favoriteProduct')
    if (favoriteProductToString) {
        const favoriteProducts: ProductType[] = JSON.parse(favoriteProductToString)
        const favoriteProduct = favoriteProducts.find(el => el.product_id === productId)
        favoriteProduct
        &&
        dispatch(setSavedFavoriteProduct(favoriteProducts, favoriteProduct.product_id))
    }
}
export const getSavedBasketProduct = (productId: number) => (dispatch: Dispatch<ActionProductType>) => {
    const favoriteBasketProductToString = localStorage.getItem('basketProduct')
    if (favoriteBasketProductToString) {
        const basketProducts: ProductType[] = JSON.parse(favoriteBasketProductToString)
        const basketProduct = basketProducts.find(el => {
            return el.product_id === productId
        })
        basketProduct
        &&
        dispatch(setSavedBasketProduct(basketProducts, basketProduct))
    }
}
export const saveFavoriteProduct = (product: ProductType[]) => {
    localStorage.setItem('favoriteProduct', JSON.stringify(product))
}
export const saveBasketProduct = (product: ProductType[]) => {
    localStorage.setItem('basketProduct', JSON.stringify(product))
}

export type ActionProductType = ReturnType<typeof getProduct>
    | ReturnType<typeof setUserQuantity>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setUserFavoriteProduct>
    | ReturnType<typeof deleteUserFavoriteProduct>
    | ReturnType<typeof setSavedFavoriteProduct>
    | ReturnType<typeof setUserBuying>
    | ReturnType<typeof setSavedBasketProduct>
export type InitialStateType = {
    products: Array<ProductType>
    quantity: null | boolean
    isFetching: boolean
    favoriteProducts: Array<ProductType>
    basket: Array<ProductType>
}
