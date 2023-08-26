import { cloneDeep } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { Scrollbars } from "react-custom-scrollbars";
import "./App.css";
import { AddCard, List, NavBar } from "./components";
import { DashBoardDataType, TitleType } from "./types";

const App: React.FC = () => {
  const [titleInfo] = useState<TitleType>({
    title: "Trello",
    version: "2.0",
  });
  const [dashboard, setDashboard] = useState<DashBoardDataType>({});
  const [selectedBoard, setSelectedBoard] = useState("");

  const getMockData = async () => {
    const data = await fetch(process.env.PUBLIC_URL + "/mock-data.json").then(
      (data) => data.json()
    );
    setDashboard(data);
    setSelectedBoard(Object.keys(data)[0]);
  };

  const addList = (title: string) => {
    const mutatedDashboard = cloneDeep(dashboard);
    let currBoard = selectedBoard ?? "default";

    if (!mutatedDashboard[currBoard]) {
      currBoard = "default";
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
      [selectedBoard]: prev[selectedBoard].filter(
        (eachList) => eachList.id !== id
      ),
    }));

  const onDashboardChange = (e) => setSelectedBoard(e.target.value);

  const updateDashBoard = (list: DashBoardDataType[0][0]) => {
    let mutatedDashboard = cloneDeep(dashboard);
    let lists = mutatedDashboard[selectedBoard].map((eachList) => {
      if (eachList.id === list.id) return list;
      return eachList;
    });
    mutatedDashboard[selectedBoard] = lists;
    setDashboard(mutatedDashboard);
  };

  const onDashBoardTitleSave = (title: string) => {
    let mutatedDashboard = cloneDeep(dashboard);
    mutatedDashboard[title] = [];
    setDashboard(mutatedDashboard);
    setSelectedBoard(title);
  };

  const deleteBoard = () => {
    let mutatedDashboard = cloneDeep(dashboard);
    delete mutatedDashboard[selectedBoard];
    setDashboard(mutatedDashboard);
    setSelectedBoard(Object.keys(mutatedDashboard)[0]);
  };

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      setDashboard((prev) => {
        let destList: DashBoardDataType[0][0] = null;
        const listToMutate = prev[selectedBoard].find(
          ({ id }) => id === Number(source.droppableId)
        );
        const cardToMutate = listToMutate.cards.find(
          ({ id }) => id === Number(draggableId)
        );

        listToMutate.cards.splice(source.index, 1);

        if (destination.droppableId === source.droppableId) {
          listToMutate.cards.splice(destination.index, 0, cardToMutate);
        } else {
          destList = prev[selectedBoard].find(
            ({ id }) => id === Number(destination.droppableId)
          );

          destList.cards.splice(destination.index, 0, cardToMutate);
        }
        return {
          ...prev,
          [selectedBoard]: prev[selectedBoard].map((each) =>
            each.id === listToMutate.id
              ? listToMutate
              : destList && destList?.id === each.id
              ? destList
              : each
          ),
        };
      });
    },
    [selectedBoard]
  );

  useEffect(() => {
    getMockData();
  }, []);

  if (Object.keys(dashboard).length === 0 && !selectedBoard) {
    return <></>;
  }

  return (
    <div className="App">
      <NavBar
        titleInfo={titleInfo}
        dashboardList={Object.keys(dashboard)}
        onDashboardChange={onDashboardChange}
        selectedBoard={selectedBoard}
        onEnter={onDashBoardTitleSave}
      />
      <div className="list-section">
        {Object.keys(dashboard).length > 1 && (
          <div className="dashboard-delete">
            <h2>delete dashboard</h2>
            <button className="btn-c red" onClick={deleteBoard}>
              &#x2716;
            </button>
          </div>
        )}
        <Scrollbars
          className="scroll"
          renderThumbHorizontal={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: "rgb(48, 129, 176)",
                borderRadius: "3px",
              }}
            />
          )}
        >
          <div className="list-container">
            <DragDropContext onDragEnd={onDragEnd}>
              {dashboard[selectedBoard]?.map((eachList, i) => (
                <List
                  key={i}
                  list={eachList}
                  updateDashBoard={updateDashBoard}
                  onDelete={deleteList}
                />
              ))}
            </DragDropContext>
            <AddCard addingFor="add a new list..." onSave={addList} />
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default App;