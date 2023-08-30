import styled from 'styled-components';

export const StyledCardTitle = styled.div<{ $bgColor: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  padding: 8px;
  font-weight: 700;
  color: white;
  text-transform: capitalize;
  font-size: 12px;
  border-radius: 4px 4px 0px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: ${({ $bgColor }) => $bgColor};

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
  }

  & > span {
    display: flex;
    align-items: center;
    & path {
      fill: ${({ theme }) => theme.pallete.WHITE};
      stroke: ${({ theme }) => theme.pallete.WHITE};
    }
  }
`;

export const StyledCard = styled.div<{ $isDragging: boolean }>`
  position: relative;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 0px 1px ${({ theme }) => theme.pallete.GREY + '45'};
  transition: 200ms all ease-in-out;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.7 : 1)};
  transform: ${({ $isDragging }) => ($isDragging ? 'scale(0.8)' : 'scale(1)')};

  &:hover {
    background: ${({ theme }) => theme.pallete.VERY_LIGHT_GREY};
  }

  & > div:first-child {
  }

  & > div:last-child {
    padding: 12px;
    align-self: flex-end;
  }
`;

export const StyledAddContainer = styled.div`
  padding: 0px 12px 12px 12px;

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
  gap: 8px;
  background: ${({ $isDraggingOver, theme }) =>
    $isDraggingOver ? 'white' : theme.pallete.LIGHT_GREY};
  border: 1px solid ${({ theme }) => theme.pallete.LIGHT_GREY};
  box-shadow: ${({ $isDraggingOver, theme }) =>
    $isDraggingOver
      ? `6px 6px 10px 2px ${theme.pallete.LIGHT_GREY}75`
      : ` 4px 4px 4px 1px ${theme.pallete.LIGHT_GREY}75`};
  color: ${({ theme }) => theme.pallete.GREY};
  border-radius: 4px;
  max-height: calc(100% - 12px);
  transition: 200ms all ease-in-out;
`;

export const StyledTitleContainer = styled.div`
  padding: 12px;
  font-weight: 900;
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
  gap: 16px;

  .no-card {
    padding: 10px 0px;
    text-align: center;
    border-radius: 4px;
    background: ${({ theme }) => theme.pallete.WHITE};
  }
`;
