import styled from 'styled-components';
import { StyledSelect } from './common.styles';
import Modal from 'react-modal';

export const StyledModalSelect = styled(StyledSelect)`
  width: 100%;
  color: ${({ theme }) => theme.pallete.GREY};
`;

export const StyledModal = styled(Modal)`
  label {
    color: ${({ theme }) => theme.pallete.GREY};
  }
`;
export const StyledModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
  background: ${({ theme }) => theme.pallete.BLUE};
  padding: 12px;
  border-radius: 4px;
  color: white;
  gap: 12px;
  & input {
    height: 30px;
    width: 100%;
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 20px;
    color: ${({ theme }) => theme.pallete.GREY};
  }

  & path {
    fill: ${({ theme }) => theme.pallete.WHITE};
    stroke: ${({ theme }) => theme.pallete.WHITE};
  }

  & h2 {
    margin: 0;
    display: inline-block;
  }
`;
export const StyledCommentContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 700;
  background: ${({ theme }) => theme.pallete.LIGHT_GREEN + '40'};
  border-radius: 4px;

  & input {
    height: 24px;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    background: ${({ theme }) => theme.pallete.LIGHT_GREY};
    color: ${({ theme }) => theme.pallete.GREY};
    font-size: 14px;

    &::placeholder {
      color: ${({ theme }) => theme.pallete.GREY};
    }
  }

  & > div {
    max-height: 250px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    & > span {
      position: relative;
      display: block;
      padding: 4px 8px;
      background: ${({ theme }) => theme.pallete.SUCCESS + 'c4'};
      color: white;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-radius: 20px;
      min-height: 14px;
      & > span {
        padding: 0px 3px;
        cursor: pointer;
        position: absolute;
        right: 4px;
        top: 3px;
        color: white;
        & path {
          fill: ${({ theme }) => theme.pallete.WHITE};
          stroke: ${({ theme }) => theme.pallete.WHITE};
        }
      }
    }
  }
`;
export const StyledCardDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: auto;
  background: ${({ theme }) => theme.pallete.VERY_LIGHT_GREY};
  padding: 12px;
  border-radius: 4px;
  color: ${({ theme }) => theme.pallete.GREY};
  gap: 12px;
  & > textarea {
    margin: 0px;
    width: 475px;
    height: 100px;
    max-width: 475px;
    max-height: 100px;
    border-radius: 4px;
    font-size: 15px;
    color: ${({ theme }) => theme.pallete.GREY};
  }
`;
