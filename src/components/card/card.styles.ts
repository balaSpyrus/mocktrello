import styled from 'styled-components';

export const StyledChip = styled.span<{ $bgColor: string }>`
  background: ${({ $bgColor }) => $bgColor};
  padding: 4px 6px;
  border-radius: 25px;
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

export const StyledCardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  padding: 8px;
  font-weight: 700;
  color: white;
  text-transform: capitalize;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ theme }) => theme.pallete.GREY};

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
  }

  & > span {
    display: flex;
    align-items: center;
    cursor: pointer;
    & path {
      fill: ${({ theme }) => theme.pallete.WHITE};
      stroke: ${({ theme }) => theme.pallete.WHITE};
    }
  }
`;

export const StyledCard = styled.div<{ $isDragging: boolean }>`
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.pallete.BLACK};
  box-shadow: ${({ $isDragging, theme }) =>
    $isDragging ? undefined : `2px 2px 0px 0px ${theme.pallete.BLACK}96`};
  transition: 200ms all ease-in-out;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.7 : 1)};

  &:hover {
    opacity: 0.85;
    transform: scale(0.95);
  }
`;

export const StyledCardContent = styled.div<{ $bgColor: string }>`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${({ theme, $bgColor }) =>
    `repeating-linear-gradient(-55deg, ${theme.pallete.WHITE}, ${theme.pallete.WHITE} 10px, ${$bgColor}20 10px, ${$bgColor}20 20px)`};

  & span:first-child {
    font-size: 12px;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    & span {
      font-size: 12px;
    }
  }
`;

export const StyledAddContainer = styled.div`
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.pallete.BLACK};

  & > * {
    padding: 8px !important;
    width: 198px !important;
    min-width: 198px !important;
  }
`;

export const StyledListContainer = styled.div<{ $isDraggingOver?: boolean }>`
  min-width: 240px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ $isDraggingOver, theme }) =>
    $isDraggingOver ? theme.pallete.VERY_LIGHT_GREY : theme.pallete.WHITE};
  border: 1px solid ${({ theme }) => theme.pallete.BLACK};
  box-shadow: 4px 4px
    ${({ $isDraggingOver, theme }) =>
      $isDraggingOver
        ? `4px 2px ${theme.pallete.LIGHT_GREY}75`
        : ` 0px 0px ${theme.pallete.LIGHT_GREY}75`};
  color: ${({ theme }) => theme.pallete.GREY};
  max-height: calc(100% - 12px);
  transition: 200ms all ease-in-out;
`;

export const StyledTitleContainer = styled.div`
  padding: 12px;
  font-weight: 900;
  border-bottom: 1px solid ${({ theme }) => theme.pallete.BLACK};
  background: ${({ theme }) => theme.pallete.VERY_LIGHT_GREY};
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  & > span {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

export const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 12px 12px 12px;
  overflow: auto;
  gap: 20px;

  .no-card {
    padding-top: 12px;
    text-align: center;
    font-size: 12px;
  }
`;
