import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { BsFillClipboardXFill } from 'react-icons/bs';
import { useTheme } from 'styled-components';
import { AddEntity, List, NavBar } from './components';
import { StyledDeleteDashboard, StyledListContainer, StyledListSection } from './styled/app.styles';
import { StyledButton } from './styled/common.styles';
import { DashBoardDataType, TitleType } from './types';

const App: React.FC = () => {
  const theme = useTheme();
  const [titleInfo] = useState<TitleType>({
    title: 'Trello',
    version: '2.0',
  });
  const [dashboard, setDashboard] = useState<DashBoardDataType>({});
  const [selectedBoard, setSelectedBoard] = useState('');

  const getMockData = async () => {
    // eslint-disable-next-line no-undef
    const data = await fetch(`${process.env.PUBLIC_URL}/mock-data.json`).then((data) =>
      data.json(),
    );
    setDashboard(data);
    console.log(Object.keys(data));
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

  const onListDrag = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
      setDashboard((prev) => {
        const board = prev[selectedBoard];
        const [removedList] = board.splice(source.index, 1);
        board.splice(destination?.index ?? source.index, 0, removedList);
        prev[selectedBoard] = board;
        return prev;
      });
    },
    [selectedBoard],
  );

  const onCardDrag = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      setDashboard((prev) => {
        let destList: DashBoardDataType[0][0] | undefined;
        const listToMutate = prev[selectedBoard].find(
          ({ id }) => id === Number(source.droppableId),
        );

        const [cardToMutate] = listToMutate?.cards.splice(source.index, 1) ?? [];

        if (destination?.droppableId === source.droppableId) {
          listToMutate?.cards.splice(destination.index, 0, cardToMutate);
        } else {
          destList = prev[selectedBoard].find(({ id }) => id === Number(destination?.droppableId));
          destList?.cards.splice(destination?.index ?? source.index, 0, cardToMutate);
        }

        prev[selectedBoard] = prev[selectedBoard].map((each) => {
          if (each.id === listToMutate?.id) return listToMutate;
          if (destList?.id === each.id) return destList;
          return each;
        });

        return prev;
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

      if (type === 'list') {
        onListDrag(result);
      }
    },
    [onCardDrag, onListDrag],
  );

  useEffect(() => {
    getMockData();
  }, []);

  if (Object.keys(dashboard).length === 0 || !selectedBoard) {
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
              <BsFillClipboardXFill />
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
                <AddEntity infoText='Add a new list...' onSave={addList} />
              </StyledListSection>
            )}
          </Droppable>
        </DragDropContext>
      </StyledListContainer>
    </div>
  );
};

export default App;
