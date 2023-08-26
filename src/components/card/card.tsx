import React from "react";
import { CardType } from "../../types";
import "./card.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  listId: number;
  card: CardType;
  expandCard: () => void;
  deleteCard: (id: number) => void;
  moveCard: any;
}

const Card: React.FC<Props> = ({ card, deleteCard, expandCard, index }) => {
  const getTitleColor = (priority: number) => {
    let classNames = ["card-title"];

    switch (priority + "") {
      case "1":
        classNames.push("investigate");
        break;
      case "2":
        classNames.push("in-progress");
        break;
      case "3":
        classNames.push("done");
        break;
      case "4":
        classNames.push("critical");
        break;
      case "5":
        classNames.push("hold");
        break;
      default:
        classNames.push("new");
        break;
    }

    return classNames.join(" ");
  };

  return (
    <Draggable draggableId={card.id + ""} key={card.id + ""} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }, { isDragging }) => (
        <div
          ref={innerRef}
          className={isDragging ? "card card-drag" : "card"}
          onClick={expandCard}
          {...dragHandleProps}
          {...draggableProps}
        >
          <div className={getTitleColor(card.priority)}>
            <span> {card.title} </span>
            <span onClick={() => deleteCard(card.id)}>&#x2716;</span>
          </div>
          <div className="card-comment-count" title={card.description}>
            {card.comments.length ? (
              <i>{`${card.comments.length} comment(s)`}</i>
            ) : (
              <i>Be the first to comment</i>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
