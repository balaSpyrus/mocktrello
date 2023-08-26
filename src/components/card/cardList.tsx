import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { CardType, DashBoardDataType } from "../../types";
import EditCardModal from "../modals/editCardModal";
import AddCard from "./addCard";
import Card from "./card";
import "./cardList.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface Props {
  index: number;
  list: DashBoardDataType[0][0] | null;
  updateDashBoard: (data: DashBoardDataType[0][0]) => void;
  onDelete: (id: number) => void;
}

const List: React.FC<Props> = ({
  list: listFromProps = null,
  updateDashBoard,
  onDelete,
  index,
}) => {
  const [list, setList] = useState(listFromProps);
  const [isAddingCard, setIsAddingCard] = useState(false);
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

  const onToggle = () => setIsAddingCard((prev) => !prev);

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
                <span className="btn-c red" onClick={() => onDelete(list.id)}>
                  &#x2716;
                </span>
              </div>
              <div
                ref={innerRef}
                {...droppableProps}
                className={"card-container"}
              >
                <Scrollbars
                  className="scroll"
                  autoHeight
                  autoHeightMin={0}
                  autoHeightMax={
                    isAddingCard ? "calc(100vh - 240px)" : "calc(100vh - 185px)"
                  }
                  renderThumbVertical={({ style, ...props }) => (
                    <div
                      {...props}
                      style={{
                        ...style,
                        backgroundColor: "rgba(49, 49, 49, 0.4)",
                        borderRadius: "3px",
                      }}
                    />
                  )}
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
                </Scrollbars>
              </div>
              <div className="btn-container">
                <AddCard
                  addingFor="add a card..."
                  onSave={addCard}
                  onToggle={onToggle}
                />
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
