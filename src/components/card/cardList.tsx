import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useTheme } from 'styled-components';
import {
  StyledAddContainer,
  StyledCardContainer,
  StyledListContainer,
  StyledTitleContainer,
} from '../../styled/card.styles';
import { StyledButton } from '../../styled/common.styles';
import { CardType, DashBoardDataType } from '../../types';
import AddEntity from '../addEntity';
import EditCardModal from '../modals/editCardModal';
import Card from './card';

interface Props {
  index: number;
  list: DashBoardDataType[0][0];
  updateDashBoard: (data: DashBoardDataType[0][0]) => void;
  onDelete: (id: number) => void;
}

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
                <StyledButton $bgcolor={'transparent'} onClick={() => onDelete(list.id)}>
                  <AiFillCloseCircle size={22} color={theme.pallete.ERROR} />
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
                <AddEntity infoText='Add a card...' onSave={addCard} />
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
