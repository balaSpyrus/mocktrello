import { cloneDeep } from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import { useTheme } from 'styled-components';
import { CLOSE_ICON_CODE, CONFIRM_ICON_CODE } from '../../constants';
import { StyledButton } from '../../styled/common';
import { CardType } from '../../types';
import {
  StyledModal,
  StyledModalTitle,
  StyledCardDescription,
  StyledModalSelect,
  StyledCommentContainer,
} from '../../styled/modal.styles';

interface Props {
  card: CardType;
  onClose: (cardToSave?: CardType) => void;
}

const EditCardModal: React.FC<Props> = ({ card: cardFromProps, onClose }) => {
  const theme = useTheme();
  const [card, setCard] = useState(cloneDeep(cardFromProps));
  const [titleIsOpen, setTitleIsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [descriptionIsOpen, setDescriptionIsOpen] = useState(false);

  const deleteComment = (index: number) =>
    setCard((prev) => ({
      ...prev,
      comments: prev.comments.splice(index, 1),
    }));

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

  const addComment: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && comment) {
      setCard((prev) => ({
        ...prev,
        comment: prev.comments.push(comment),
      }));
      setComment('');
    }
  };

  const onSave = () => onClose?.(card);

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <StyledModal
      isOpen
      onRequestClose={() => onClose()}
      className='Modal'
      overlayClassName='Overlay'
      appElement={document.getElementById('root') as HTMLDivElement}
    >
      <StyledModalTitle>
        {titleIsOpen ? (
          <input type='text' name='title' onChange={onChange} value={card.title} />
        ) : (
          <h2>{card.title}</h2>
        )}
        <span
          className={titleIsOpen ? 'close' : 'edit'}
          onClick={() => setTitleIsOpen((prev) => !prev)}
        />
      </StyledModalTitle>
      <div>
        <label>description</label>
        <StyledCardDescription>
          {descriptionIsOpen ? (
            <textarea value={card.description} onChange={onChange} name='description' />
          ) : (
            <i>{card.description}</i>
          )}
          <span
            className={descriptionIsOpen ? 'close' : 'edit'}
            onClick={() => setDescriptionIsOpen((prev) => !prev)}
          />
        </StyledCardDescription>
      </div>
      <div>
        <label>status</label>
        <StyledModalSelect value={card.priority} name='priority' onChange={onChange}>
          <option value={0}>new</option>
          <option value={1}>investigate</option>
          <option value={2}>in-progress</option>
          <option value={3}>done</option>
          <option value={4}>critical</option>
          <option value={5}>hold</option>
        </StyledModalSelect>
      </div>
      <div>
        <label>comments</label>
        <StyledCommentContainer>
          <div>
            {card.comments.map((comment, i) => (
              <span key={i}>
                <i>{comment}</i>
                <span onClick={() => deleteComment(i)}>{CLOSE_ICON_CODE}</span>
              </span>
            ))}
          </div>

          <input
            type='text'
            value={comment}
            placeholder='type and press enter to add comment'
            onChange={onInputChange}
            onKeyDown={addComment}
          />
        </StyledCommentContainer>
      </div>
      <div>
        <StyledButton $bgcolor={theme.pallete.SUCCESS} onClick={onSave}>
          {CONFIRM_ICON_CODE}
        </StyledButton>
        <StyledButton $bgcolor={theme.pallete.ERROR} onClick={() => onClose?.()}>
          {CLOSE_ICON_CODE}
        </StyledButton>
      </div>
    </StyledModal>
  );
};

export default EditCardModal;
