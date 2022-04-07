import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ProductType} from '../api/product-api';
import styled from 'styled-components';
import prod from '../image/prod.png'
import favorite from './../image/favorite.svg'
import favoriteRed from './../image/favoriteRed.svg'
import shoppingCart from './../image/shoppingСart.svg'

import {useDispatch, useSelector} from 'react-redux';
import {
    deleteUserFavoriteProduct, getSavedBasketProduct,
    getSavedFavoriteProduct, saveBasketProduct,
    saveFavoriteProduct, setUserBuying,
    setUserFavoriteProduct
} from '../reducers/products-reducer';
import {RootStateType} from '../store/store';

const WrapperProduct = styled('div')`
  position: relative;
  box-shadow: 0 10px 14px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  margin: 16px;
`
const Author = styled('div')`
  position: absolute;
  top: 26px;
  left: 8%;
  font-weight: 400;
  font-size: 12px;
  color: #F3F3F3;

  span {
    display: block;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
  }
`
const Favorite = styled('div')`
  position: absolute;
  top: 68%;
  right: 8%;
  width: 30px;
  height: 30px;
  transition: 200ms;

  img {
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.2);
  }
`
const DescriptionProduct = styled('div')`
  position: absolute;
  top: 68%;
  left: 8%;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #F3F3F3;

  span {
    display: block;
  }
`
const GetMore = styled('div')`
  position: absolute;
  top: 26px;
  right: 8%;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
`
const InfoBlock = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: inherit;
  height: 78px;
  padding: 16px;
`
const Available = styled('div')`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #808080;
  text-align: left;

  span {
    display: block;
    font-weight: 700;
    font-size: 14px;
    color: black;
  }
`
const Price = styled('div')`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #808080;
  text-align: right;

  span {
    display: block;
    font-weight: 700;
    font-size: 14px;
    color: rgba(17, 154, 255, 0.98)
  }
`
const WrapperBasket = styled('div')`
  width: 35px;
  height: 35px;
  text-align: center;
  cursor: pointer;
  position: relative
`
const BuyingCount = styled('span')`
  color: white;
  display: flex;
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid red;
  border-radius: 100%;
  background-color: red;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 14px;
  top: -10%;
  right: -15%
`
const Product = ({product}: ProductPropsType) => {
    const favoriteProduct = useSelector<RootStateType, Array<ProductType>>(state => state.product.favoriteProducts)
    const basket = useSelector<RootStateType, Array<ProductType>>(state => state.product.basket)
    const productArray = product.name.split(' ')
    const productFirst = productArray.slice(0, Math.ceil((productArray.length - 1) / 2)).join(' ')
    const productSecond = productArray.slice(Math.ceil((productArray.length - 1) / 2)).join(' ')
    const dispatch = useDispatch()
    const img = product.isFavorite ? favoriteRed : favorite

    const addFavoriteProduct = () => {
        if (!product.isFavorite) {
            dispatch(setUserFavoriteProduct(product))
            saveFavoriteProduct([...favoriteProduct, product])
        } else {
            dispatch(deleteUserFavoriteProduct(product.product_id))
            saveFavoriteProduct(favoriteProduct.filter(el => el.product_id !== product.product_id))
        }
    }

    const AddToShoppingCart = () => {
        if (product.quantity_available > product.buyingCount) {
            dispatch(setUserBuying(product))
        }
    }

    useEffect(() => {
            saveBasketProduct(basket)
    }, [basket])

    useLayoutEffect(() => {
        dispatch(getSavedFavoriteProduct(product.product_id))
        dispatch(getSavedBasketProduct(product.product_id))
    }, [])

    return (
        <WrapperProduct>
            <img src={prod} alt=""/>
            <Author>
                created by
                <span>{product.created_by.display_name}</span>
            </Author>
            <Favorite onClick={addFavoriteProduct}>
                <img src={img} alt=" add to favorite product"/>
            </Favorite>
            <DescriptionProduct>
                <span>{productFirst}</span>
                <span>{productSecond}</span>
            </DescriptionProduct>
            <GetMore>
                <a href={product.json_nft_data.external_url} target={'_blank'}>get more</a>
            </GetMore>
            <InfoBlock>
                <Available>
                    available
                    <span>{`${product.quantity_available} of 50`}</span>
                </Available>
                <WrapperBasket onClick={AddToShoppingCart}>
                    <img src={shoppingCart} alt=""/>
                    {product.buyingCount
                        ? <BuyingCount>{product.buyingCount}</BuyingCount>
                        : ''
                    }
                </WrapperBasket>
                <Price>
                    price
                    <span>{`${product.initial_price} ETH`}</span>
                </Price>
            </InfoBlock>
        </WrapperProduct>
    );
};

export default Product;

type ProductPropsType = {
    product: ProductType
}
