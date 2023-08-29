import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { CLOSE_ICON_CODE, CONFIRM_ICON_CODE } from '../constants';
import { StyledAddOneElement, StyledAddOneMini } from '../styled/app.styles';
import { StyledButton } from '../styled/common';

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
          {CONFIRM_ICON_CODE}
        </StyledButton>
        <StyledButton $bgcolor={theme.pallete.ERROR} onClick={toggleBtn}>
          {CLOSE_ICON_CODE}
        </StyledButton>
      </div>
    </StyledAddOneMini>
  );
};

export default AddEntity;
