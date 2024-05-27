import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { BsFillClipboardXFill } from 'react-icons/bs';
import { useTheme } from 'styled-components';
import { AddEntity, List, NavBar } from './components';
import { getAllDashboards } from './firebaseDB';
import { StyledDeleteDashboard, StyledListContainer, StyledListSection } from './styled/app.styles';
import { StyledButton } from './styled/common.styles';
import { ListDataType, TitleType } from './types';

const App: React.FC = () => {
  const theme = useTheme();
  const [titleInfo] = useState<TitleType>({
    title: 'Trello',
    version: '2.0',
  });
  const [dashboard, setDashboard] = useState<{ [key in string]: ListDataType[] }>({});
  const [selectedBoardId, setSelectedBoardId] = useState('');

  const addList = (title: string) => {
    const mutatedDashboard = cloneDeep(dashboard);
    let currBoard = selectedBoardId ?? 'default';

    if (!mutatedDashboard[currBoard]) {
      currBoard = 'default';
      mutatedDashboard[currBoard] = [];
    }

    mutatedDashboard[currBoard].push({
      id: new Date().getTime() + '',
      title,
      cards: [],
    });

    setDashboard(mutatedDashboard);
    setSelectedBoardId(currBoard);
  };

  const deleteList = (id: string) =>
    setDashboard((prev) => ({
      ...prev,
      [selectedBoardId]: prev[selectedBoardId].filter((eachList) => eachList.id !== id),
    }));

  const onDashboardChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSelectedBoardId(e.target.value);

  const updateDashBoard = (list: ListDataType) => {
    const mutatedDashboard = cloneDeep(dashboard);
    const lists = mutatedDashboard[selectedBoardId].map((eachList) => {
      if (eachList.id === list.id) return list;
      return eachList;
    });
    mutatedDashboard[selectedBoardId] = lists;
    setDashboard(mutatedDashboard);
  };

  const onDashBoardTitleSave = (title: string) => {
    const mutatedDashboard = cloneDeep(dashboard);
    mutatedDashboard[title] = [];
    setDashboard(mutatedDashboard);
    setSelectedBoardId(title);
  };

  const deleteBoard = () => {
    const mutatedDashboard = cloneDeep(dashboard);
    delete mutatedDashboard[selectedBoardId];
    setDashboard(mutatedDashboard);
    setSelectedBoardId(Object.keys(mutatedDashboard)[0]);
  };

  const onListDrag = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
      setDashboard((prev) => {
        const board = prev[selectedBoardId];
        const [removedList] = board.splice(source.index, 1);
        board.splice(destination?.index ?? source.index, 0, removedList);
        prev[selectedBoardId] = board;
        return prev;
      });
    },
    [selectedBoardId],
  );

  const onCardDrag = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      setDashboard((prev) => {
        let destList: ListDataType | undefined;
        const listToMutate = prev[selectedBoardId].find(({ id }) => id === source.droppableId);

        const [cardToMutate] = listToMutate?.cards.splice(source.index, 1) ?? [];

        if (destination?.droppableId === source.droppableId) {
          listToMutate?.cards.splice(destination.index, 0, cardToMutate);
        } else {
          destList = prev[selectedBoardId].find(({ id }) => id === destination?.droppableId);
          destList?.cards.splice(destination?.index ?? source.index, 0, cardToMutate);
        }

        prev[selectedBoardId] = prev[selectedBoardId].map((each) => {
          if (each.id === listToMutate?.id) return listToMutate;
          if (destList?.id === each.id) return destList;
          return each;
        });

        return prev;
      });
    },
    [selectedBoardId],
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
    getAllDashboards().then((data) => {
      setDashboard(
        data.reduce((acc, data) => ({ ...acc, [data.title]: data.lists }), {} as typeof dashboard),
      );
      setSelectedBoardId(data[0].title || 'default');
    });
  }, []);

  if (Object.keys(dashboard).length === 0 || !selectedBoardId) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className='App'>
      <NavBar
        titleInfo={titleInfo}
        dashboardList={Object.keys(dashboard)}
        onDashboardChange={onDashboardChange}
        selectedBoard={selectedBoardId}
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
                {dashboard[selectedBoardId]?.map((eachList, i) => (
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
