import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './store/store';
import {getUserProduct} from './reducers/products-reducer';
import {ProductType} from './api/product-api';
import styled from 'styled-components';
import Product from './components/Product';
import Modal from './components/Modal/Modal';
import ModalFiltered from './components/Modal/ModalFiltered';
import Preloader from './components/Preloader';

const Wrapper = styled('div')<WrapperType>`
  max-width: 1350px;
  filter: ${({isOpen}) => isOpen? 'blur(4px)' : ''};
`
const Head = styled('h1')`
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  color: #000000;
  margin-bottom: 24px;
`
const Header = styled('header')`
  margin: 32px 0 0 32px;
`
const Description = styled('p')`
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0.01em;
  color: #828282;
`
const Products = styled('main')`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
`
export const FilterButton = styled('button')`
  margin: 5px;
  display: inline-block;
  padding: 10px 5px;
  width: 140px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  background-color:rgba(17,154,255,0.98);
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px #999;
  color: currentColor;

  &:hover {
    background-color: rgba(108,179,236,0.45);
  }

  &:active {
    background-color: rgba(202,226,243,0.45);
    box-shadow: 0 2px #666;
    transform: translateY(3px);
  }

  &:disabled {
    background-color: #666;
    transform: translateY(3px);
  }
`

function App() {
    const products = useSelector<RootStateType, Array<ProductType>>(state => state.product.products)
    const userQuantity = useSelector<RootStateType, null | boolean>(state => state.product.quantity)
    const isFetching = useSelector<RootStateType, boolean>(state => state.product.isFetching)
    const dispatch = useDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false)

    const closing = ()=>{
        setIsOpenModal(false)
    }
    const opening = ()=>{
        setIsOpenModal(true)
    }
    useEffect(() => {
        dispatch(getUserProduct())
    }, [userQuantity])


    if(isFetching){
        return <Preloader/>
    }
    return (
        <Wrapper isOpen={isOpenModal}>
            <Header>
                <Head>
                    Explore
                </Head>
                <Description>Buy and sell digital fashion NFT art</Description>
                <FilterButton onClick={opening} disabled={isOpenModal}>
                        show filter
                </FilterButton>
            </Header>
            <Modal closing={closing}
                   modalIsOpen={isOpenModal}
                   setModalIsOpen={setIsOpenModal}
            >
                <ModalFiltered closing={closing}/>
            </Modal>
            <Products>
                {products.map(el => {
                    return <Product key={el.product_id}
                                    product={el}
                    />
                })}
            </Products>
        </Wrapper>
    );
}

export default App;


type WrapperType = {
    isOpen: boolean
}
