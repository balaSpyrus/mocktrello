import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { MdDeleteOutline, MdDragIndicator } from 'react-icons/md';
import { useTheme } from 'styled-components';
import {
  StyledAddContainer,
  StyledCardContainer,
  StyledListContainer,
  StyledTitleContainer,
} from '../../styled/card.styles';
import { CardType, ListDataType } from '../../types';
import AddEntity from '../addEntity';
import EditCardModal from '../modals/editCardModal';
import Card from './card';

interface Props {
  index: number;
  list: ListDataType;
  updateDashBoard: (data: ListDataType) => void;
  onDelete: (id: string) => void;
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
          id: new Date().getTime() + '',
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

  const deleteCard = (id: string) => {
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
              <StyledTitleContainer>
                <div {...dragHandleProps}>
                  <MdDragIndicator />
                  <span>{list.title}</span>
                </div>
                <span onClick={() => onDelete(list.id)}>
                  <MdDeleteOutline size={18} color={theme.pallete.ERROR} />
                </span>
              </StyledTitleContainer>
              <StyledCardContainer ref={innerRef} {...droppableProps}>
                {!list.cards.length && (
                  <div className='no-card' onMouseDown={(e) => e.preventDefault()}>
                    No Card(s) available
                  </div>
                )}
                {list.cards.map((eachCard, i) => (
                  <Card
                    index={i}
                    listId={list.id}
                    deleteCard={deleteCard}
                    editCard={() => setExpandedCard(eachCard)}
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
