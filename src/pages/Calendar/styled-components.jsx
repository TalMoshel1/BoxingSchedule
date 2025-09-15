import styled from "styled-components";
export const DisabledWrapper = ({ isDisabled, children, ...props }) => (
  <div {...props}>{children}</div>
);

export const StyledDisabledWrapper = styled(DisabledWrapper)`
  ${({ isDisabled }) =>
    isDisabled &&
    `
      opacity: 0.5;
      pointer-events: none;
      width: 100vw;
    `}
`;

export const CalendarContainer = styled.div`
  width: 100%;
  direction: rtl;

  @media (orientation: landscape) {
    // margin-top: 5rem;
    // min-height: calc(100svh - 5rem);
  }

  @media (orientation: portrait) {
    // min-height: calc(100svh - 3rem);
  }

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  direction: rtl;
  // justify-content: center;
  flex-direction: column;
  // min-height: 40svh;
  // height: 73svh;
  overflow-x: none;
  overflow-y: scroll;
  gap: 0.5rem;
  direction: rtl;
  overflow: scroll;
  scrollbar-width: none;
  overflow: auto;

  &::-webkit-scrollbar {
    overflow: hidden;
  }

  &::-ms-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar {
    width: 102px;
  }

  @media (orientation: portrait) {
    height: calc(100svh - 15rem);
  }

  @media (orientation: landscape) {
    height: calc(100svh - 15rem);

  }
`;
