import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { CONFIRM_ICON_CODE, CLOSE_ICON_CODE } from '../constants';
import { StyledButton } from '../styled/common';

const StyledAddOneContainer = styled.div`
  background: #dfdfdf;
  width: 214px;
  min-width: 214px;
  border-radius: 4px;
  cursor: pointer;
  padding: 12px;
`;

const StyledAddOneElement = styled(StyledAddOneContainer)`
  text-decoration: none;
  color: #444242;
  align-self: flex-start;
  font-size: 14px;

  &:hover {
    background: #c6c6c6;
  }
`;

const StyledAddOneMini = styled(StyledAddOneContainer)`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  gap: 8px;

  & > input {
    width: calc(100% - 16px);
    height: 32px;
    border-radius: 4px;
    padding: 4px 8px;
  }

  & > div {
    display: flex;
    align-self: flex-end;
    gap: 8px;
  }
`;

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
