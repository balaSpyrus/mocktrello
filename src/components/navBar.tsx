import React, { ChangeEvent, useMemo, useState } from 'react';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { useTheme } from 'styled-components';
import { StyledButton } from '../styled/common.styles';
import {
  NavAction,
  StyledAddBtn,
  StyledNav,
  StyledNavSelect,
  StylesNavTitle,
} from '../styled/navbar.styles';
import { DashBoardDataType, TitleType } from '../types';
import { GrFormClose } from 'react-icons/gr';

interface Props {
  titleInfo?: TitleType;
  onEnter?: any;
  dashboards: DashBoardDataType[];
  onDashboardChange: React.ChangeEventHandler<HTMLSelectElement>;
  selectedBoard?: DashBoardDataType;
}

const NavBar: React.FC<Props> = ({
  titleInfo,
  onEnter,
  dashboards,
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
            <StyledButton $bgcolor={'transparent'} onClick={onClickAdd}>
              <GrFormClose fontSize={18} />
            </StyledButton>
          </div>
        ) : (
          <StyledAddBtn
            $bgcolor={theme.pallete.WHITE}
            $color={theme.pallete.BLUE}
            onClick={onClickAdd}
          >
            <MdOutlineDashboardCustomize />
            Add New Dashboard
          </StyledAddBtn>
        )}
        {dashboards.length ? (
          <StyledNavSelect
            onChange={onDashboardChange}
            value={selectedBoard?.id}
            $caratColor='white'
          >
            {dashboards.map(({ id, title }, i) => (
              <option key={i} value={id}>
                {`${title} dashboard`}
              </option>
            ))}
          </StyledNavSelect>
        ) : null}
      </NavAction>
    </StyledNav>
  );
};

export default NavBar;
