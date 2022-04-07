import React, {ChangeEvent, useEffect, useState} from 'react';
import {FilterButton} from '../../App';
import styled from 'styled-components';
import {getUserProduct, setUserQuantity} from '../../reducers/products-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../store/store';
import {ProductType} from '../../api/product-api';


const Checkbox = styled('input')`
  position: absolute;
  z-index: -1;
  opacity: 0;
  margin: 10px 0 0 20px;

  & + label {
    position: relative;
    padding: 0 0 0 60px;
    cursor: pointer;
  }

  & + label:before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 50px;
    height: 26px;
    border-radius: 13px;
    background: #CDD1DA;
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, .2);
    transition: .2s;
  }

  & + label:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    width: 22px;
    height: 22px;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
    transition: .2s;
  }

  &:checked + label:before {
    background: rgba(135, 185, 255, 0.98);
  }

  &:checked + label:after {
    left: 26px;
  }
`
const Modal = styled('div')`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`

const Apply = styled('button')`
  margin: 10px;
  display: inline-block;
  padding: 5px;
  width: 80px;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  background-color: rgba(17, 154, 255, 0.98);
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px #999;
  color: currentColor;

  &:hover {
    background-color: rgba(108, 179, 236, 0.45);
  }

  &:active {
    background-color: rgba(202, 226, 243, 0.45);
    box-shadow: 0 2px #666;
    transform: translateY(3px);
  }
`
const Cancel = styled(Apply)`
  background-color: rgba(202, 226, 243, 0.45);

  &:hover {
    background-color: rgba(108, 179, 236, 0.04);
  }
`
const ModalFiltered = (props: ModalFilteredType) => {
    const userQuantity = useSelector<RootStateType, null | boolean>(state => state.product.quantity)
    const [quantity, setQuantity] = useState(userQuantity)
    const dispatch = useDispatch()
    const rememberMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.currentTarget.checked)
    }
    const saveChanges = () => {
         dispatch(setUserQuantity(quantity))
        props.closing()
    }

    return (
        <Modal>
            <div>
                <Checkbox type="checkbox"
                          id={'input'}
                          checked={!!quantity}
                          onChange={rememberMeHandler}
                />
                <label htmlFor={'input'}>Only in stock</label>
            </div>
            <div>
                <Cancel onClick={() => props.closing()}>Cancel</Cancel>
                <Apply onClick={saveChanges}>Apply</Apply>
            </div>
        </Modal>
    );
};

export default ModalFiltered;
type ModalFilteredType = {
    closing: () => void
}
