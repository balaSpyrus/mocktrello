import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { CardType, DashBoardDataType } from "../../types";
import EditCardModal from "../modals/editCardModal";
import AddCard from "./addCard";
import Card from "./card";
import "./cardList.css";

interface Props {
  list: DashBoardDataType[0][0] | null;
  updateDashBoard: (data: DashBoardDataType[0][0]) => void;
  onDelete: (id: number) => void;
  onHoverList: any;
  handleDrop: any;
}

const List: React.FC<Props> = ({
  list: listFromProps = null,
  updateDashBoard,
  onDelete,
  onHoverList,
  handleDrop,
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
    <div className="list">
      <div className="title-container">
        <span>{list.title}</span>
        <span className="btn-c red" onClick={() => onDelete(list.id)}>
          &#x2716;
        </span>
      </div>
      <div className="card-container">
        <Scrollbars
          className="scroll"
          autoHeight
          autoHeightMin={0}
          autoHeightMax={
            isAddingCard ? "calc(100vh - 220px)" : "calc(100vh - 165px)"
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
          {list.cards.length ? (
            list.cards.map((eachCard, i) => (
              <Card
                index={i}
                listID={list.id}
                deleteCard={deleteCard}
                expandCard={() => setExpandedCard(eachCard)}
                onHoverList={onHoverList}
                moveCard={moveCard}
                handleDrop={handleDrop}
                card={eachCard}
                key={i}
              />
            ))
          ) : (
            <Card
              moveCard={moveCard}
              onHoverList={onHoverList}
              handleDrop={handleDrop}
            />
          )}
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
  );
};

export default List;
