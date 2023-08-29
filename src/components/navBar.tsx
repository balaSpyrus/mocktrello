import React, { ChangeEvent, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import { CLOSE_ICON_CODE } from '../constants';
import { StyledButton } from '../styled/common';
import { TitleType } from '../types';
import {
  StylesNavTitle,
  StyledNav,
  NavAction,
  StyledAddBtn,
  StyledNavSelect,
} from '../styled/navbar.styles';

interface Props {
  titleInfo?: TitleType;
  onEnter?: any;
  dashboardList: string[];
  onDashboardChange: React.ChangeEventHandler<HTMLSelectElement>;
  selectedBoard?: string;
}

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
