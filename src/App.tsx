import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { DndProvider } from "react-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./App.css";
import { AddCard, List, NavBar } from "./components";
import { DashBoardDataType, TitleType } from "./types";

const DND: any = DndProvider;

const App: React.FC = () => {
  const [titleInfo] = useState<TitleType>({
    title: "Trello",
    version: "2.0",
  });
  const [dashboard, setDashboard] = useState<DashBoardDataType>({});
  const [selectedBoard, setSelectedBoard] = useState("");
  const [currentHoverListID, setHoverId] = useState<number | null>(null);

  const getMockData = async () => {
    const data = await fetch(process.env.PUBLIC_URL + "/mock-data.json").then(
      (data) => data.json()
    );
    setDashboard(data);
    setSelectedBoard(Object.keys(data)[0]);
  };

  const addList = (title) => {
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

  const handleDrop = (cardID: number, listID: number) => {
    if (currentHoverListID && currentHoverListID !== listID) {
      let mutatedDashboard = cloneDeep(dashboard);
      let lists = mutatedDashboard[selectedBoard];

      let listToRemove = lists.filter((list) => list.id === listID)[0];
      let listToAdd = lists.filter((list) => list.id === currentHoverListID)[0];
      let removedCard = listToRemove.cards.splice(
        listToRemove.cards
          .filter((card) => card)
          .map((card) => card.id)
          .indexOf(cardID),
        1
      )[0];
      listToAdd.cards.push(removedCard);
      listToAdd.cards = listToAdd.cards.filter((card) => card);
      listToRemove.cards = listToRemove.cards.filter((card) => card);
      mutatedDashboard[selectedBoard] = lists;
      setDashboard(mutatedDashboard);
    }
  };

  const onHoverList = (id: number) => {
    if (id && id !== currentHoverListID) {
      setHoverId(id);
    }
  };

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

  useEffect(() => {
    getMockData();
  }, []);

  if (Object.keys(dashboard).length === 0) {
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
      <DND backend={HTML5Backend}>
        <DragDropContext onDragEnd={() => {}}>
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
                {dashboard[selectedBoard] &&
                  dashboard[selectedBoard].map((eachList, i) => (
                    <List
                      key={i}
                      list={eachList}
                      onHoverList={onHoverList}
                      handleDrop={handleDrop}
                      updateDashBoard={updateDashBoard}
                      onDelete={deleteList}
                    />
                  ))}
                <AddCard addingFor="add a new list..." onSave={addList} />
              </div>
            </Scrollbars>
          </div>
        </DragDropContext>
      </DND>
    </div>
  );
};

export default App;
