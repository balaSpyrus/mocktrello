import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CardType, DashBoardDataType } from "../../types";
import EditCardModal from "../modals/editCardModal";
import AddEntity from "../addEntity";
import Card from "./card";
import "./cardList.css";
import { CLOSE_ICON_CODE } from "../../constants";
import { StyledButton } from "../../styled/common";
import { useTheme } from "styled-components";

interface Props {
  index: number;
  list: DashBoardDataType[0][0];
  updateDashBoard: (data: DashBoardDataType[0][0]) => void;
  onDelete: (id: number) => void;
}

const List: React.FC<Props> = ({
  list: listFromProps,
  updateDashBoard,
  onDelete,
  index,
}) => {
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
          description: "",
          comments: [],
        },
      ],
    }));

    updateDashBoard(list);
  };

  const closeModal = (card: CardType | null = null) => {
    let mutatedList = cloneDeep(list);

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
    let mutatedList = cloneDeep(list);
    const dragCard = mutatedList.cards[dragIndex];
    mutatedList.cards.splice(dragIndex, 1);
    mutatedList.cards.splice(hoverIndex, 0, dragCard);
    updateDashBoard(mutatedList);
  };

  const deleteCard = (id: number) => {
    let mutatedList = cloneDeep(list);
    mutatedList.cards = mutatedList.cards.filter(
      (eachCard) => eachCard.id !== id
    );
    updateDashBoard(mutatedList);
  };

  return (
    <Draggable draggableId={list.id + ""} key={list.id + ""} index={index}>
      {({ dragHandleProps, draggableProps, innerRef: dragRef }) => (
        <Droppable droppableId={list.id + ""} key={list.id + ""} type="card">
          {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
            <div
              className={isDraggingOver ? "list card-cont-drop" : "list"}
              {...draggableProps}
              ref={dragRef}
            >
              <div className="title-container" {...dragHandleProps}>
                <span>{list.title}</span>
                <StyledButton
                  $bgcolor={theme.pallete.ERROR}
                  onClick={() => onDelete(list.id)}
                >
                  {CLOSE_ICON_CODE}
                </StyledButton>
              </div>
              <div
                ref={innerRef}
                {...droppableProps}
                className={"card-container"}
              >
                {!list.cards.length && (
                  <div
                    className="no-card"
                    onMouseDown={(e) => e.preventDefault()}
                  >
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
              </div>
              <div className="btn-container">
                <AddEntity infoText="add a card..." onSave={addCard} />
              </div>
              {expandedCard && (
                <EditCardModal card={expandedCard} onClose={closeModal} />
              )}
            </div>
          )}
        </Droppable>
      )}
    </Draggable>
  );
};

export default List;
