import styled, { keyframes, css } from "styled-components";
import { Box } from "@mui/material";


  const SlideContainer = styled.div`
    transition: right 0.3s ease;
    display: flex;
    direction: rtl;
    position: relative;
    width: max-content;
    height: 100%;
  
    @media (orientation: landscape) {
    }
  
    input,
    .custom-select,
    select {
      cursor: pointer;
      background-color: #e6e5eb !important;
      border-radius: 20px;
    }
  
    font-size: 1rem;
  
    ::placeholder {
      color: black;
    }
  
    box-sizing: border-box;
  `;
  
  const Line1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: max-content;
    width: 100%;
    gap: 0.5rem;
  
    div {
      width: 90%;
    }
  `;
  
  const Line2 = styled.div`
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
  
    div {
      width: 90%;
    }
  
    height: max-content;
    width: 100%;
  `;
  
  const DateContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  
    .date-picker-container {
      direction: rtl !important;
      width: 100% !important;
      font-size: 1rem !important;
      flex-grow: 1 !important;
      height: 2.35rem !important;
      border-radius: 20px !important;
      cursor: pointer !important;
      background-color: #e6e5eb !important;
      text-align: right !important;
      padding-right: 1rem !important;
      vertical-align: baseline !important;
    }
  
    .MuiInputBase-root {
      border: none !important;
    }
  
    .date-picker-container > * {
      width: 100%;
      height: 100%;
      color: black;
    }
  
    .MuiFormControl-root {
      -webkit-flex-direction: none;
      width: 100%;
    }
  
    .MuiInputBase-input {
      display: block;
      border: none;
      width: 100%;
      color: black;
    }
  
    @media (orientation: landscape) {
      label {
        right: 16%;
      }
    }
  
    @media (orientation: portrait) {
      label {
        right: 2rem;
      }
    }
  
    input {
      display: block;
      flex-grow: 1;
      text-align: right;
      box-sizing: border-box;
      font-weight: 400;
      font-size: 1rem !important;
      color: black;
    }
  
    .has-value {
      color: black !important;
    }
  
    input[type="date"]:required:invalid::-webkit-datetime-edit {
      color: transparent;
    }
    input[type="date"]:focus::-webkit-datetime-edit {
      color: black !important;
    }
  
    input::-webkit-date-and-time-value {
      text-align: right !important;
    }
  
    @media (orientation: portrait) {
      width: 100%;
    }
  
    @supports (-webkit-touch-callout: none) {
      input {
        width: 100%;
      }
    }
  
    @supports not (-webkit-touch-callout: none) {
      input {
        width: 100%;
      }
    }
  `;
  
  const Hour = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.35rem !important;
  
    label {
      color: black !important;
    }
  
    .custom-select {
      width: 100%;
    }
  
    @media (orientation: landscape) {
      width: 3.925625rem;
    }
  
    @supports (-webkit-touch-callout: none) {
      & {
        width: 7rem;
      }
    }
  
    @supports not (-webkit-touch-callout: none) {
      & {
        width: 6rem;
      }
    }
  `;
  
  const Trainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.35rem;
  
    select,
    option {
      -webkit-appearance: none;
      padding-top: 1rem;
      padding-bottom: 1rem;
      width: 100%;
    }
  
    select {
    }
  
    input[type="date"]:invalid + span:after {
      content: "Birthday";
      position: absolute;
      left: 0;
      top: 0;
    }
  
    input[type="date"]:focus:invalid + span:after {
      display: none;
    }
  
    input:not(:focus):invalid {
      color: transparent;
    }
  
    @supports (-webkit-touch-callout: none) {
      & {
        width: 7rem;
      }
    }
  
    @supports not (-webkit-touch-callout: none) {
      & {
        width: 6rem;
      }
    }
  `;
  
  const Name = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  
    input::placeholder {
      color: grey;
    }
  
    label {
      visibility: hidden;
    }
  
    input {
      flex-grow: 1;
      height: 2.35rem;
    }
  
    @supports (-webkit-touch-callout: none) {
      & {
        width: 7rem;
      }
    }
  
    @supports not (-webkit-touch-callout: none) {
      & {
        width: 6rem;
      }
    }
  `;
  
  const Phone = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  
    input::placeholder {
      color: grey;
    }
  
    label {
      visibility: hidden;
    }
  
    input {
      flex-grow: 1;
      height: 2.35rem;
    }
  
    @supports (-webkit-touch-callout: none) {
      & {
        width: 7rem;
      }
    }
  
    @supports not (-webkit-touch-callout: none) {
      & {
        width: 6rem;
      }
    }
  `;
  
  const Mail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  
    input::placeholder {
      color: grey;
    }
  
    label {
      visibility: hidden;
    }
  
    input {
      flex-grow: 1;
      height: 2.35rem;
    }
  
    @supports (-webkit-touch-callout: none) {
      & {
        width: 7rem;
      }
    }
  
    @supports not (-webkit-touch-callout: none) {
      & {
        width: 6rem;
      }
    }
  `;
  
  export const PrivateForm = styled.form`
    direction: rtl;
    color: black;
  
    @media (orientation: portrait) {
      width: 90%;
    }

       @media (orientation: landscape) and (max-width: 900px) {
      margin-top:9rem;
    }
    @media (orientation: landscape) {
      width: max-content;
    }
  
    display: flex;
    flex-direction: column;
    font-family: "Roboto", sans-serif;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
    justify-content: center;
    height: 100%;
  
    input,
    .date-picker-container {
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      box-sizing: border-box;
      border: none;
      color: black !important;
      cursor: pointer;
      border-radius: 20px;
      font-size: 1rem;
      height: 2.35rem;
  
      &::placeholder {
        color: grey;
        opacity: 1;
      }
    }
  
    input {
      font-size: 3rem;
    }
  
    h1 {
      color: #66fcf1;
    }
  `;
  
    const StyledSelectContainer = styled.div`
    visibility: visible !important;
    color: black !important;
    position: relative;
    width: 100%;
    flex-grow: 1;
    height: 100%;
    background-color: rgb(230, 229, 235) !important;
    border-radius: 20px;
  
    .custom-select {
      font-size: 1rem;
  
      @supports (-webkit-touch-callout: none) {
        label {
          font-size: 1.1rem;
          font-weight: 400;
        }
      }
  
      @supports not (-webkit-touch-callout: none) {
        label {
          font-size: 1rem;
        }
      }
    }
  
    .options-container {
      color: black;
      position: absolute;
      background-color: #ccc !important;
      top: 2.85rem;
      left: 0;
      width: 100%;
      max-height: 200px;
      overflow-y: auto;
      // border: 1px solid black;
      border-radius: 20px;
      z-index: 1000;
      display: none;
      color: black !important;
    }
  
    .options-container.show {
      display: flex;
      flex-direction: column;
      align-items: center;
      display: block;
      overflow: scroll;
      scrollbar-width: none;
      overflow: auto;
    }
  
    .options-container::-webkit-scrollbar {
      overflow: hidden;
    }
  
    .options-container {
      scrollbar-width: none;
    }
  
    .options-container::-ms-scrollbar {
      display: none;
    }
  
    .option {
      background-color: #e6e5eb;
      width: 100%;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-right: 1rem;
      cursor: pointer;
  
      &.disabled {
        color: #fff;
        cursor: not-allowed;
      }
  
      &:hover {
        background-color: #a0a0a0;
      }
    }
  `;
  
  const scaleAnimation = keyframes`
  0% {
    border-color:white;
  }
  50% {
    color:white;
    border-color:white;
  
  }
  100% {
    border-color:white;
  
  }
  `;


   const StyledBox = styled(Box)(({}) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      width: "100%",
      height: "100%",
    },
  
    "& .MuiInputBase-root": {
      paddingRight: "0rem",
      width: "100%",
      position: "relative",
    },
    "& .MuiButtonBase-root": {
      position: "absolute",
      left: "0%",
      top: "50%",
      transform: "translate(0, -50%)",
      margin: "0",
      backgroundColor: "#E6E5EB !important",
      paddingLeft: "1rem",
    },
    "& .MuiInputAdornment-root": {
      position: "relative !important",
    },
    "& .MuiSvgIcon-root": {
      position: "absolute",
      left: "0%",
      marginLeft: "1rem",
      color: "grey",
    },
    "& .MuiInputBase-input": {
      color: "black !important",
    },
  }));

  const ArrowLeft = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  font-weight: 400;
  justify-content: flex-end;
  border-radius: 20px;
  text-align: left;
  font-size: 1rem;
  transition: transform 1s ease-in;
  cursor: pointer;
  padding: 1rem;
  border-radius: 20px;
  background-color: #f0f0f0;

  animation: ${(props) =>
    props.animate
      ? css`
          ${scaleAnimation} 1s ease-in-out infinite
        `
      : "none"};
`;

  export { ArrowLeft, StyledBox, StyledSelectContainer, SlideContainer, Line1, Line2, DateContainer, Hour, Trainer, Name, Phone, Mail, scaleAnimation }