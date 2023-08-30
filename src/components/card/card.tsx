import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiOutlineEdit } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import { MdDragIndicator } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { StyledCard, StyledCardTitle } from '../../styled/card.styles';
import { CardType } from '../../types';

interface Props {
  index: number;
  listId: number;
  card: CardType;
  editCard: () => void;
  deleteCard: (id: number) => void;
  moveCard: any;
}

const Card: React.FC<Props> = ({
  card: { comments, description, id, priority, title },
  deleteCard,
  editCard,
  index,
}) => {
  const theme = useTheme();
  const getTitleColor = (priority: number) => {
    switch (`${priority}`) {
      case '1':
        return theme.pallete.ORANGE;
      case '2':
        return theme.pallete.WARNING;
      case '3':
        return theme.pallete.SUCCESS;
      case '4':
        return theme.pallete.ERROR;
      case '5':
        return theme.pallete.GREY;
      default:
        return theme.pallete.BLUE;
    }
  };

  return (
    <Draggable draggableId={`${id}`} key={`${id}`} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }, { isDragging }) => (
        <StyledCard $isDragging={isDragging} ref={innerRef} {...draggableProps}>
          <StyledCardTitle $bgColor={getTitleColor(priority)}>
            <div {...dragHandleProps}>
              <MdDragIndicator />
              <span> {title} </span>
            </div>
            <span onClick={editCard}>
              <AiOutlineEdit fontSize={16} />
            </span>
            <span onClick={() => deleteCard(id)}>
              <GrFormClose fontSize={16} />
            </span>
          </StyledCardTitle>
          <div title={description}>
            {comments.length ? (
              <i>{`${comments.length} comment(s)`}</i>
            ) : (
              <i>Be the first to comment</i>
            )}
          </div>
        </StyledCard>
      )}
    </Draggable>
  );
};

export default Card;
