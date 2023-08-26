import React, { ChangeEvent, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-modal";
import "./editCardModal.css";
import { cloneDeep } from "lodash";
import { CardType } from "../../types";
import { StyledSelect } from "../../styled/common";
import styled from "styled-components";

interface Props {
  card: CardType;
  onClose: (cardToSave?: CardType) => void;
}

const StyledModalSelect = styled(StyledSelect)`
  width: 100%;
  color: #474747;
  text-transform: capitalize;
`;

const EditCardModal: React.FC<Props> = ({ card: cardFromProps, onClose }) => {
  const [card, setCard] = useState(cloneDeep(cardFromProps));
  const [titleIsOpen, setTitleIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [descriptionIsOpen, setDescriptionIsOpen] = useState(false);

  const deleteComment = (index: number) =>
    setCard((prev) => ({
      ...prev,
      comments: prev.comments.splice(index, 1),
    }));

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setComment(e.target.value);

  const addComment: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && comment) {
      setCard((prev) => ({
        ...prev,
        comment: prev.comments.push(comment),
      }));
      setComment("");
    }
  };

  const onSave = () => onClose?.(card);

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => onClose()}
      className="Modal"
      overlayClassName="Overlay"
      appElement={document.getElementById("root") as HTMLDivElement}
    >
      <div className="edit-modal-title">
        {titleIsOpen ? (
          <input
            type="text"
            className="on-edit-modal-title"
            name="title"
            onChange={onChange}
            value={card.title}
          />
        ) : (
          <h2>{card.title}</h2>
        )}
        <span
          className={titleIsOpen ? "close" : "edit"}
          onClick={() => setTitleIsOpen((prev) => !prev)}
        ></span>
      </div>
      <div>
        <label className="model-label">description</label>
        <div className="card-desc">
          {descriptionIsOpen ? (
            <textarea
              value={card.description}
              onChange={onChange}
              name="description"
              className="edit-text-area"
            />
          ) : (
            <i>{card.description}</i>
          )}
          <span
            className={descriptionIsOpen ? "close" : "edit"}
            onClick={() => setDescriptionIsOpen((prev) => !prev)}
          ></span>
        </div>
      </div>
      <div>
        <label className="model-label">status</label>
        <StyledModalSelect
          value={card.priority}
          name="priority"
          onChange={onChange}
        >
          <option value={0}>new</option>
          <option value={1}>investigate</option>
          <option value={2}>in-progress</option>
          <option value={3}>done</option>
          <option value={4}>critical</option>
          <option value={5}>hold</option>
        </StyledModalSelect>
      </div>
      <div>
        <label className="model-label">comments</label>
        <div className="card-comment-container">
          <Scrollbars
            className="scroll"
            autoHeight
            autoHeightMin={0}
            autoHeightMax={200}
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
            {card.comments.map((comment, i) => (
              <span className="comment" key={i}>
                <i>{comment}</i>
                <span
                  className="comment-delete"
                  onClick={() => deleteComment(i)}
                >
                  &#x2716;
                </span>
              </span>
            ))}
          </Scrollbars>
          <input
            type="text"
            value={comment}
            className="add-comment"
            placeholder="type and press enter to add comment"
            onChange={onInputChange}
            onKeyPress={addComment}
          />
        </div>
      </div>
      <div>
        <button className="btn-c blue" onClick={onSave}>
          &#x2714;
        </button>
        <button className="btn-c red" onClick={() => onClose?.()}>
          &#x2716;
        </button>
      </div>
    </Modal>
  );
};

export default EditCardModal;
