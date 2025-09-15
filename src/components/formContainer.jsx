import React from "react"
import styled from "styled-components";


const Container = styled.main`

  height: calc(100svh - 10rem);
  // overflow: scroll;
  background-color: rgb(242, 241, 246);
  display: flex;
  position:relative;
  flex-direction: row;
  justify-content:center;
  flex-grow:1;
`
const FormContainer = ({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
};

export default FormContainer;
