import React, { ChangeEvent, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { StyledButton, StyledSelect } from '../styled/common';
import { TitleType } from '../types';
import { CLOSE_ICON_CODE } from '../constants';

interface Props {
  titleInfo?: TitleType;
  onEnter?: any;
  dashboardList: string[];
  onDashboardChange: React.ChangeEventHandler<HTMLSelectElement>;
  selectedBoard?: string;
}

const StyledNavSelect = styled(StyledSelect)`
  color: ${({ theme }) => theme.pallete.WHITE};
  border-color: ${({ theme }) => theme.pallete.WHITE};
`;

const StyledAddBtn = styled(StyledButton)`
  font-size: 14px;
  font-weight: 700;
  padding: 4px 8px;

  &:before {
    content: '+';
    padding-right: 8px;
    font-size: 18px;
    line-height: 16px;
  }
`;

const StyledNav = styled.nav`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.pallete.BLUE};
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 32px);
  max-height: 32px;
  min-height: 32px;
  padding: 8px 16px;
  box-shadow: ${({ theme }) => `0px 4px 6px 0px ${theme.pallete.BLACK}4d`};
  z-index: 100;
`;

const StylesNavTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span {
    font-weight: 900;
    &:first-child {
      color: ${({ theme }) => theme.pallete.WHITE};
    }

    &:nth-child(2) {
      font-size: 12px;
      padding: 2px 4px;
      border-radius: 16px;
      background: ${({ theme }) => theme.pallete.WHITE};
      color: ${({ theme }) => theme.pallete.BLUE};
    }
  }
`;

const NavAction = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > div {
    position: relative;

    & > input {
      height: 32px;
      border-radius: 4px;
      color: ${({ theme }) => theme.pallete.BLUE};
      padding: 2px 36px 2px 8px;
      font-weight: 700;
      font-size: 16px;

      &::placeholder {
        font-size: 12px;
        font-weight: initial;
      }
    }

    & > button {
      position: absolute;
      right: 0%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const NavBar: React.FC<Props> = ({
  titleInfo,
  onEnter,
  dashboardList,
  onDashboardChange,
  selectedBoard,
}) => {
  const theme = useTheme();
  const [showAddInput, setShowAddInput] = useState(false);
  const [title, setTitle] = useState('');

  const Title = useMemo(() => {
    let title = 'Trello';
    let version = '2.0';
    if (titleInfo) {
      title = titleInfo.title;
      version = titleInfo.version;
    }
    return (
      <StylesNavTitle>
        <span>{title}</span>
        {version && <span>{version}</span>}
      </StylesNavTitle>
    );
  }, [titleInfo]);

  const onClickAdd = () => {
    setShowAddInput((prev) => !prev);
    setTitle('');
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const onEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && title) {
      onEnter?.(title);
      onClickAdd();
    }
  };

  return (
    <StyledNav>
      {Title}
      <NavAction>
        {showAddInput ? (
          <div>
            <input
              type='text'
              placeholder='type and press to add dashboard'
              value={title}
              onChange={onTitleChange}
              onKeyDown={onEnterPress}
            />
            <StyledButton $bgcolor={theme.pallete.ERROR} onClick={onClickAdd}>
              {CLOSE_ICON_CODE}
            </StyledButton>
          </div>
        ) : (
          <StyledAddBtn
            $bgcolor={theme.pallete.WHITE}
            $color={theme.pallete.BLUE}
            onClick={onClickAdd}
          >
            Add New Dashboard
          </StyledAddBtn>
        )}
        {dashboardList.length ? (
          <StyledNavSelect onChange={onDashboardChange} value={selectedBoard} $caratColor='white'>
            {dashboardList.map((dashboard, i) => (
              <option key={i} value={dashboard}>
                {`${dashboard} dashboard`}
              </option>
            ))}
          </StyledNavSelect>
        ) : null}
      </NavAction>
    </StyledNav>
  );
};

export default NavBar;
