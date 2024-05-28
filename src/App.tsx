import { cloneDeep } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { BsFillClipboardXFill } from 'react-icons/bs';
import { useTheme } from 'styled-components';
import { AddEntity, List, NavBar } from './components';
import { Loader } from './components/common/loader';
import { createDashboard, deleteDashboard, getAllDashboards, updateDashboard } from './firebaseDB';
import { StyledDeleteDashboard, StyledListContainer, StyledListSection } from './styled/app.styles';
import { StyledButton } from './components/common/common.styles';
import { DashBoardDataType, ListDataType, TitleType } from './types';

const App: React.FC = () => {
  const theme = useTheme();
  const initialUpdateTime = useRef<number | undefined>();
  const [titleInfo] = useState<TitleType>({
    title: 'Trello',
    version: '2.0',
  });
  const [dashboards, setDashboards] = useState<DashBoardDataType[]>();
  const [selectedBoard, setSelectedBoard] = useState<DashBoardDataType>();

  const addList = async (title: string) => {
    if (!selectedBoard) return;

    setSelectedBoard((prev) => ({
      ...(prev as DashBoardDataType),
      updatedAt: Date.now(),
      lists: [
        ...(prev?.lists as ListDataType[]),
        {
          id: new Date().getTime() + '',
          title,
          cards: [],
        },
      ],
    }));
  };

  const deleteList = async (id: string) => {
    if (!selectedBoard) return;

    setSelectedBoard((prev) => ({
      ...(prev as DashBoardDataType),
      updatedAt: Date.now(),
      lists: (prev?.lists as ListDataType[]).filter((eachList) => eachList.id !== id),
    }));
  };

  const onDashboardChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setSelectedBoard(dashboards?.find((each) => each.id === e.target.value));

  const updateLists = async (list: ListDataType) => {
    if (!selectedBoard) return;

    setSelectedBoard((prev) => ({
      ...(prev as DashBoardDataType),
      updatedAt: Date.now(),
      lists: (prev?.lists as ListDataType[]).map((eachList) => {
        if (eachList.id === list.id) return list;
        return eachList;
      }),
    }));
  };

  const onDashBoardTitleSave = async (title: string) => {
    if (!dashboards) return;
    const newDashboard: DashBoardDataType = {
      id: (dashboards?.length || 0) + '',
      title,
      lists: [],
    };
    setDashboards((prev) => [...(prev as DashBoardDataType[]), newDashboard]);
    await createDashboard(newDashboard);
    const alldashboards = await getAllDashboards();
    setSelectedBoard(alldashboards.find((each) => each.title === title));
    setDashboards(alldashboards);
  };

  const deleteBoard = async () => {
    if (!selectedBoard || !dashboards) return;
    const mutatedDashboard = dashboards.filter((each) => each.id !== selectedBoard.id);
    setSelectedBoard(mutatedDashboard?.[0]);
    await deleteDashboard(selectedBoard.id);
    setDashboards(mutatedDashboard);
  };

  const onListDrag = useCallback(
    async (result: DropResult) => {
      if (!selectedBoard || !dashboards) return;
      const { destination, source } = result;

      const changedList = cloneDeep(selectedBoard?.lists) as ListDataType[];
      const [removedList] = changedList.splice(source.index, 1);
      changedList.splice(destination?.index ?? source.index, 0, removedList);

      setSelectedBoard((prev) => ({
        ...(prev as DashBoardDataType),
        updatedAt: Date.now(),
        lists: changedList,
      }));
    },
    [selectedBoard],
  );

  const onCardDrag = useCallback(
    async (result: DropResult) => {
      if (!selectedBoard || !dashboards) return;
      const { destination, source } = result;
      let destList: ListDataType | undefined;
      const listToMutate = cloneDeep(
        selectedBoard.lists.find(({ id }) => id === source.droppableId),
      ) as ListDataType;
      const [cardToMutate] = listToMutate?.cards.splice(source.index, 1) ?? [];

      if (destination?.droppableId === source.droppableId) {
        listToMutate?.cards.splice(destination.index, 0, cardToMutate);
      } else {
        destList = cloneDeep(selectedBoard.lists.find(({ id }) => id === destination?.droppableId));
        destList?.cards.splice(destination?.index ?? source.index, 0, cardToMutate);
      }

      setSelectedBoard((prev) => ({
        ...(prev as DashBoardDataType),
        updatedAt: Date.now(),
        lists: (prev?.lists as ListDataType[]).map((eachList) =>
          eachList.id === listToMutate.id
            ? listToMutate
            : destList?.id === eachList.id
            ? destList
            : eachList,
        ),
      }));
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
    getAllDashboards(true).then(setDashboards);
  }, []);

  useEffect(() => {
    if (selectedBoard && selectedBoard?.updatedAt !== initialUpdateTime.current) {
      updateDashboard(selectedBoard).then(() => getAllDashboards().then(setDashboards));
    }
  }, [selectedBoard?.updatedAt]);

  useEffect(() => {
    if (dashboards?.length && !selectedBoard) {
      const selected = dashboards.find((each) => !!each.lists.length) || dashboards[0];
      initialUpdateTime.current = selected.updatedAt;
      setSelectedBoard(selected);
    }
  }, [dashboards, selectedBoard]);

  if (!dashboards) {
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
        <Loader />
      </div>
    );
  }

  return (
    <div className='App'>
      <NavBar
        titleInfo={titleInfo}
        dashboards={dashboards}
        onDashboardChange={onDashboardChange}
        selectedBoard={selectedBoard}
        onEnter={onDashBoardTitleSave}
      />
      <StyledListContainer>
        {dashboards?.length ? (
          <>
            <StyledDeleteDashboard>
              <h2>Delete Dashboard</h2>
              <StyledButton $bgcolor={theme.pallete.ERROR} onClick={deleteBoard}>
                <BsFillClipboardXFill />
              </StyledButton>
            </StyledDeleteDashboard>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='container' direction='horizontal' type='list'>
                {({ droppableProps, placeholder, innerRef }) => (
                  <StyledListSection ref={innerRef} {...droppableProps}>
                    {selectedBoard?.lists.map((eachList, i) => (
                      <List
                        index={i}
                        key={eachList.id}
                        list={eachList}
                        updateLists={updateLists}
                        onDelete={deleteList}
                      />
                    ))}
                    {placeholder}
                    <AddEntity infoText='Add a new list...' onSave={addList} />
                  </StyledListSection>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : (
          <></>
        )}
      </StyledListContainer>
    </div>
  );
};

export default App;
