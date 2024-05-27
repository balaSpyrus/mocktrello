import React, { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiOutlineEdit } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import { MdDragIndicator } from 'react-icons/md';
import { useTheme } from 'styled-components';
import {
  StyledCard,
  StyledCardContent,
  StyledCardTitle,
  StyledChip,
} from '../../styled/card.styles';
import { CardType } from '../../types';

interface Props {
  index: number;
  listId: string;
  card: CardType;
  editCard: () => void;
  deleteCard: (id: string) => void;
  moveCard: any;
}

const Card: React.FC<Props> = ({
  card: { comments, description, id, priority, title },
  deleteCard,
  editCard,
  index,
}) => {
  const theme = useTheme();
  const { color, text } = useMemo(() => {
    let data = {
      color: '',
      text: '',
    };
    switch (`${priority}`) {
      case '1':
        data.color = theme.pallete.ORANGE;
        data.text = 'Investigate';
        break;
      case '2':
        data.color = theme.pallete.WARNING;
        data.text = 'In-Progess';
        break;
      case '3':
        data.color = theme.pallete.SUCCESS;
        data.text = 'Completed';
        break;
      case '4':
        data.color = theme.pallete.ERROR;
        data.text = 'Blocked';
        break;
      case '5':
        data.color = theme.pallete.LIGHT_GREY;
        data.text = 'On-Hold';
        break;
      default:
        data.color = theme.pallete.BLUE;
        data.text = 'New';
        break;
    }

    return data;
  }, [priority]);

  return (
    <Draggable draggableId={`${id}`} key={`${id}`} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }, { isDragging }) => (
        <StyledCard $isDragging={isDragging} ref={innerRef} {...draggableProps}>
          <StyledCardTitle>
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
          <StyledCardContent $bgColor={color}>
            <span>{description}</span>
            <div>
              <StyledChip $bgColor={color}>{text}</StyledChip>
              {comments.length ? (
                <span>{`${comments.length} comment(s)`}</span>
              ) : (
                <span>No comment</span>
              )}
            </div>
          </StyledCardContent>
        </StyledCard>
      )}
    </Draggable>
  );
};

export default Card;
