import styled from 'styled-components';
import { StyledSelect, StyledButton } from './common.styles';

export const StyledNavSelect = styled(StyledSelect)`
  color: ${({ theme }) => theme.pallete.WHITE};
  border-color: ${({ theme }) => theme.pallete.WHITE};
  border-radius: 20px;
`;

export const StyledAddBtn = styled(StyledButton)`
  font-size: 14px;
  font-weight: 700;
  padding: 10px 12px;
  border-radius: 20px;
`;

export const StyledNav = styled.nav`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.pallete.BLUE};
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 32px);
  max-height: 32px;
  min-height: 32px;
  padding: 12px 16px;
  box-shadow: ${({ theme }) => `0px 4px 6px 0px ${theme.pallete.BLACK}4d`};
  z-index: 100;
`;

export const StylesNavTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span {
    font-weight: 900;
    &:first-child {
      color: ${({ theme }) => theme.pallete.WHITE};
    }

    &:nth-child(2) {
      font-size: 12px;
      padding: 2px 4px;
      border-radius: 16px;
      background: ${({ theme }) => theme.pallete.WHITE};
      color: ${({ theme }) => theme.pallete.BLUE};
    }
  }
`;

export const NavAction = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & > div {
    position: relative;

    & > input {
      height: 32px;
      border-radius: 50px;
      color: ${({ theme }) => theme.pallete.BLUE};
      padding: 2px 24px 2px 16px;
      font-weight: 700;
      font-size: 16px;

      &::placeholder {
        font-size: 12px;
        font-weight: initial;
      }
    }

    & > button {
      position: absolute;
      padding: 0;
      right: 0%;
      top: 50%;
      transform: translate(-25%, -50%);
      & path {
        fill: ${({ theme }) => theme.pallete.ERROR};
        stroke: ${({ theme }) => theme.pallete.ERROR};
        stroke-width: 3;
      }
    }
  }
`;
