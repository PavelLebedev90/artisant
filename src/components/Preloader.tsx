import React from 'react';
import styled from 'styled-components';

const Container = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: 5px;
    background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
    animation: bounce 1.5s 0.5s linear infinite;
  }

  @keyframes bounce {
    0%, 50%, 100% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(1.4);
    }
  }
  @media(max-width: 500px){
    div{
      width: 25px;
      height: 25px;
    }
  }
`
const Yellow = styled('div')`
  background-color: yellow;
`
const Red = styled('div')`
  background-color: red;
  animation-delay: 0.1s;
`
const Blue = styled('div')`
  background-color: blue;
  animation-delay: 0.2s;
`
const Violet = styled('div')`
  background-color: violet;
  animation-delay: 0.3s;
`
const Preloader = () => {
    return (
        <Container>
            <Yellow></Yellow>
            <Red></Red>
            <Blue></Blue>
            <Violet></Violet>
        </Container>
    );
};

export default Preloader;
