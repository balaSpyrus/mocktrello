import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled, { useTheme } from 'styled-components';
import { CardType, DashBoardDataType } from '../../types';
import EditCardModal from '../modals/editCardModal';
import AddEntity from '../addEntity';
import Card from './card';
import { CLOSE_ICON_CODE } from '../../constants';
import { StyledButton } from '../../styled/common';

interface Props {
  index: number;
  list: DashBoardDataType[0][0];
  updateDashBoard: (data: DashBoardDataType[0][0]) => void;
  onDelete: (id: number) => void;
}

const StyledAddContainer = styled.div`
  padding: 0px 12px 12px 12px;

  & > * {
    padding: 8px !important;
    width: 198px !important;
    min-width: 198px !important;
  }
`;

const StyledListContainer = styled.div<{ $isDraggingOver?: boolean }>`
  min-width: 240px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${({ $isDraggingOver }) => ($isDraggingOver ? 'white' : '#dfdfdf')};
  border: 1px solid #b3b3b3;
  box-shadow: ${({ $isDraggingOver }) =>
    $isDraggingOver ? '2px 6px 10px 10px #cfc8c8' : ' 2px 6px 5px 1px #cfc8c8'};
  color: #3b3b3b;
  border-radius: 4px;
  max-height: calc(100% - 12px);
  transition: 200ms all ease-in-out;
`;

const StyledTitleContainer = styled.div`
  padding: 12px;
  font-weight: 900;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 12px 12px 12px;
  overflow: auto;
  gap: 16px;

  .no-card {
    padding: 10px 0px;
    text-align: center;
    width: calc(100% - 10px);
    border-radius: 4px;
    background: #f6f6f6;
  }
`;

const List: React.FC<Props> = ({ list: listFromProps, updateDashBoard, onDelete, index }) => {
  const theme = useTheme();
  const [list, setList] = useState(listFromProps);
  const [expandedCard, setExpandedCard] = useState<CardType | null>(null);

  useEffect(() => {
    listFromProps && setList(listFromProps);
  }, [listFromProps]);

  const addCard = (title: string) => {
    setList((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          id: new Date().getTime(),
          title,
          priority: 0,
          description: '',
          comments: [],
        },
      ],
    }));

    updateDashBoard(list);
  };

  const closeModal = (card: CardType | null = null) => {
    const mutatedList = cloneDeep(list);

    if (card) {
      mutatedList.cards = mutatedList.cards.map((eachCard) => {
        if (eachCard.id === card.id) return card;
        return eachCard;
      });
    }

    setExpandedCard(null);
    updateDashBoard(mutatedList);
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const mutatedList = cloneDeep(list);
    const dragCard = mutatedList.cards[dragIndex];
    mutatedList.cards.splice(dragIndex, 1);
    mutatedList.cards.splice(hoverIndex, 0, dragCard);
    updateDashBoard(mutatedList);
  };

  const deleteCard = (id: number) => {
    const mutatedList = cloneDeep(list);
    mutatedList.cards = mutatedList.cards.filter((eachCard) => eachCard.id !== id);
    updateDashBoard(mutatedList);
  };

  return (
    <Draggable draggableId={`${list.id}`} key={`${list.id}`} index={index}>
      {({ dragHandleProps, draggableProps, innerRef: dragRef }) => (
        <Droppable droppableId={`${list.id}`} key={`${list.id}`} type='card'>
          {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
            <StyledListContainer {...draggableProps} $isDraggingOver={isDraggingOver} ref={dragRef}>
              <StyledTitleContainer {...dragHandleProps}>
                <span>{list.title}</span>
                <StyledButton $bgcolor={theme.pallete.ERROR} onClick={() => onDelete(list.id)}>
                  {CLOSE_ICON_CODE}
                </StyledButton>
              </StyledTitleContainer>
              <StyledCardContainer ref={innerRef} {...droppableProps}>
                {!list.cards.length && (
                  <div className='no-card' onMouseDown={(e) => e.preventDefault()}>
                    <i>No Card(s) available</i>
                  </div>
                )}
                {list.cards.map((eachCard, i) => (
                  <Card
                    index={i}
                    listId={list.id}
                    deleteCard={deleteCard}
                    expandCard={() => setExpandedCard(eachCard)}
                    moveCard={moveCard}
                    card={eachCard}
                    key={i}
                  />
                ))}
                {placeholder}
              </StyledCardContainer>
              <StyledAddContainer>
                <AddEntity infoText='add a card...' onSave={addCard} />
              </StyledAddContainer>
              {expandedCard && <EditCardModal card={expandedCard} onClose={closeModal} />}
            </StyledListContainer>
          )}
        </Droppable>
      )}
    </Draggable>
  );
};

export default List;
