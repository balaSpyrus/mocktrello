import styled from 'styled-components';

export const StyledListContainer = styled.div`
  margin-top: 48px;
  height: calc(100% - 80px);
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  overflow: hidden;
  position: relative;
`;

export const StyledDeleteDashboard = styled.div`
  position: absolute;
  bottom: 24px;
  right: 32px;
  z-index: 999;
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 16px;

  & > button {
    box-shadow: 4px 6px 6px 0px ${({ theme }) => theme.pallete.GREY + '80'};
    font-size: 22px;
    padding: 12px;
    border-radius: 24px;
  }

  & > h2 {
    width: 140px;
    font-size: 15px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.pallete.GREY};
    background: ${({ theme }) => `${theme.pallete.BLACK}35`};
    border-radius: 8px;
    padding: 2px 6px;
    transition: all 0.1s ease-in-out;
    overflow: hidden;
    opacity: 0;
  }

  &:hover > h2 {
    opacity: 1;
    transition: all 0.1s ease-in-out;
  }
`;

export const StyledListSection = styled.div`
  display: flex;
  gap: 16px;
  overflow: auto;
  align-items: flex-start;
`;

const StyledAddOneContainer = styled.div`
  background: ${({ theme }) => theme.pallete.VERY_LIGHT_GREY};
  width: 214px;
  min-width: 214px;
  border-radius: 2px;
  cursor: pointer;
  padding: 12px;
`;

export const StyledAddOneElement = styled(StyledAddOneContainer)`
  color: ${({ theme }) => theme.pallete.GREY};
  align-self: flex-start;
  font-size: 14px;
`;

export const StyledAddOneMini = styled(StyledAddOneContainer)`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  gap: 12px;

  & > input {
    height: 32px;
    border-radius: 2px;
    padding: 4px 8px;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    & > button {
      text-align: center;
      justify-content: center;
    }
  }
`;
