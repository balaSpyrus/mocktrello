import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { useTheme } from 'styled-components';
import { StyledAddOneElement, StyledAddOneMini } from '../styled/app.styles';
import { StyledButton } from './common/common.styles';

interface Props {
  onSave?: (title: string) => void;
  infoText: string;
}

const AddEntity: React.FC<Props> = ({ onSave: onSaveFromProps, infoText }) => {
  const theme = useTheme();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const toggleBtn = () => {
    setIsAdding((prev) => !prev);
  };

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.target.value);

  const onSave = () => {
    onSaveFromProps?.(title);
    setTitle('');
    setIsAdding(false);
  };

  const onEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && title) {
      onSave();
    }
  };

  if (!isAdding) {
    return <StyledAddOneElement onClick={toggleBtn}>{infoText}</StyledAddOneElement>;
  }

  return (
    <StyledAddOneMini>
      <input
        type='text'
        placeholder={infoText}
        autoFocus
        value={title}
        onChange={onTitleChange}
        onKeyDown={onEnterPress}
      />
      <div>
        <StyledButton $bgcolor={theme.pallete.SUCCESS} onClick={title ? onSave : undefined}>
          <GiConfirmed />
          Save
        </StyledButton>
        <StyledButton $bgcolor={theme.pallete.ERROR} onClick={toggleBtn}>
          <AiFillCloseCircle />
          Cancel
        </StyledButton>
      </div>
    </StyledAddOneMini>
  );
};

export default AddEntity;
