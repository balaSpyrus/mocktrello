import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import './App.css';
import styled, { useTheme } from 'styled-components';
import { AddEntity, List, NavBar } from './components';
import { CardType, DashBoardDataType, TitleType } from './types';
import { CLOSE_ICON_CODE } from './constants';
import { StyledButton } from './styled/common';

const StyledListContainer = styled.div`
  margin-top: 48px;
  height: calc(100% - 80px);
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const StyledDeleteDashboard = styled.div`
  position: absolute;
  bottom: 24px;
  right: 32px;
  z-index: 999;
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 16px;

  & > button {
    box-shadow: 4px 6px 6px 0px #787878;
    font-size: 22px;
    padding: 8px 14px;
  }

  & > h2 {
    width: 140px;
    font-size: 15px;
    text-transform: capitalize;
    color: #3b3b3b;
    background: rgba(0, 0, 0, 0.206);
    border-radius: 8px;
    padding: 2px 6px;
    transition: all 0.1s ease-in-out;
    overflow: hidden;
    opacity: 0;
  }

  &:hover > h2 {
    opacity: 1;
    transition: all 0.1s ease-in-out;
  }
`;

const StyledListSection = styled.div`
  display: flex;
  gap: 16px;
  overflow: auto;
  align-items: flex-start;
`;

const App: React.FC = () => {
  const theme = useTheme();
  const [titleInfo] = useState<TitleType>({
    title: 'Trello',
    version: '2.0',
  });
  const [dashboard, setDashboard] = useState<DashBoardDataType>({});
  const [selectedBoard, setSelectedBoard] = useState('');

  const getMockData = async () => {
    const data = await fetch(`${process.env.PUBLIC_URL}/mock-data.json`).then((data) =>
      data.json(),
    );
    setDashboard(data);
    setSelectedBoard(Object.keys(data)[0]);
  };

  const addList = (title: string) => {
    const mutatedDashboard = cloneDeep(dashboard);
    let currBoard = selectedBoard ?? 'default';

    if (!mutatedDashboard[currBoard]) {
      currBoard = 'default';
      mutatedDashboard[currBoard] = [];
    }

    mutatedDashboard[currBoard].push({
      id: new Date().getTime(),
      title,
      cards: [],
    });

    setDashboard(mutatedDashboard);
    setSelectedBoard(currBoard);
  };

  const deleteList = (id: number) =>
    setDashboard((prev) => ({
      ...prev,
      [selectedBoard]: prev[selectedBoard].filter((eachList) => eachList.id !== id),
    }));

  const onDashboardChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSelectedBoard(e.target.value);

  const updateDashBoard = (list: DashBoardDataType[0][0]) => {
    const mutatedDashboard = cloneDeep(dashboard);
    const lists = mutatedDashboard[selectedBoard].map((eachList) => {
      if (eachList.id === list.id) return list;
      return eachList;
    });
    mutatedDashboard[selectedBoard] = lists;
    setDashboard(mutatedDashboard);
  };

  const onDashBoardTitleSave = (title: string) => {
    const mutatedDashboard = cloneDeep(dashboard);
    mutatedDashboard[title] = [];
    setDashboard(mutatedDashboard);
    setSelectedBoard(title);
  };

  const deleteBoard = () => {
    const mutatedDashboard = cloneDeep(dashboard);
    delete mutatedDashboard[selectedBoard];
    setDashboard(mutatedDashboard);
    setSelectedBoard(Object.keys(mutatedDashboard)[0]);
  };

  const onCardDrag = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      setDashboard((prev) => {
        let destList: DashBoardDataType[0][0] | undefined;
        const listToMutate = prev[selectedBoard].find(
          ({ id }) => id === Number(source.droppableId),
        );
        const cardToMutate = listToMutate?.cards.find(({ id }) => id === Number(draggableId));

        listToMutate?.cards.splice(source.index, 1);

        if (destination?.droppableId === source.droppableId) {
          listToMutate?.cards.splice(destination.index, 0, cardToMutate as CardType);
        } else {
          destList = prev[selectedBoard].find(({ id }) => id === Number(destination?.droppableId));

          destList?.cards.splice(destination?.index ?? 0, 0, cardToMutate as CardType);
        }
        return {
          ...prev,
          //@ts-ignore
          [selectedBoard]: prev[selectedBoard].map((each) => {
            if (each.id === listToMutate?.id) return listToMutate;

            if (destList?.id === each.id) return destList;

            return each;
          }),
        };
      });
    },
    [selectedBoard],
  );

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { destination, source, type } = result;
      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      if (type === 'card') {
        onCardDrag(result);
      }
    },
    [onCardDrag],
  );

  useEffect(() => {
    getMockData();
  }, []);

  if (Object.keys(dashboard).length === 0 && !selectedBoard) {
    return <></>;
  }

  return (
    <div className='App'>
      <NavBar
        titleInfo={titleInfo}
        dashboardList={Object.keys(dashboard)}
        onDashboardChange={onDashboardChange}
        selectedBoard={selectedBoard}
        onEnter={onDashBoardTitleSave}
      />
      <StyledListContainer>
        {Object.keys(dashboard).length > 1 && (
          <StyledDeleteDashboard>
            <h2>Delete Dashboard</h2>
            <StyledButton $bgcolor={theme.pallete.ERROR} onClick={deleteBoard}>
              {CLOSE_ICON_CODE}
            </StyledButton>
          </StyledDeleteDashboard>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='container' direction='horizontal' type='list'>
            {({ droppableProps, placeholder, innerRef }) => (
              <StyledListSection ref={innerRef} {...droppableProps}>
                {dashboard[selectedBoard]?.map((eachList, i) => (
                  <List
                    index={i}
                    key={i}
                    list={eachList}
                    updateDashBoard={updateDashBoard}
                    onDelete={deleteList}
                  />
                ))}
                {placeholder}
                <AddEntity infoText='add a new list...' onSave={addList} />
              </StyledListSection>
            )}
          </Droppable>
        </DragDropContext>
      </StyledListContainer>
    </div>
  );
};

export default App;
