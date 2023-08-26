import React, { ChangeEvent, useMemo, useState } from "react";
import "./nav.css";
import { TitleType } from "../../types";
import { StyledSelect, caratURL } from "../../styled/common";
import styled from "styled-components";

interface Props {
  titleInfo?: TitleType;
  onEnter?: any;
  dashboardList: string[];
  onDashboardChange: React.ChangeEventHandler<HTMLSelectElement>;
  selectedBoard?: string;
}

const StyledNavSelect = styled(StyledSelect)`
  color: white;
  border-color: white;
  text-transform: capitalize;
  background: url("${caratURL("white")}") no-repeat;
`;

const NavBar: React.FC<Props> = ({
  titleInfo,
  onEnter,
  dashboardList,
  onDashboardChange,
  selectedBoard,
}) => {
  const [showAddInput, setShowAddInput] = useState(false);
  const [title, setTitle] = useState("");

  const Title = useMemo(() => {
    let title = "Trello",
      version = "2.0";
    if (titleInfo) {
      title = titleInfo.title;
      version = titleInfo.version;
    }
    return (
      <div className="nav-title">
        <span>{title}</span>
        {version && <span>{version}</span>}
      </div>
    );
  }, [titleInfo]);

  const onClickAdd = () => {
    setShowAddInput((prev) => !prev);
    setTitle("");
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && title) {
      onEnter?.(title);
      onClickAdd();
    }
  };

  return (
    <nav id="navbar">
      {Title}
      <div className="nav-right">
        {showAddInput ? (
          <div className="add-board">
            <input
              type="text"
              placeholder="type and press to add dashboard"
              value={title}
              onChange={onTitleChange}
              onKeyPress={onEnterPress}
            />
            <button className="btn-c red" onClick={onClickAdd}>
              &#x2716;
            </button>
          </div>
        ) : (
          <button className="btn-c add" onClick={onClickAdd}>
            <span>add dashboard</span>
          </button>
        )}
        {dashboardList.length ? (
          <StyledNavSelect onChange={onDashboardChange} value={selectedBoard}>
            {dashboardList.map((dashboard, i) => (
              <option key={i} value={dashboard}>
                {dashboard + " dashboard"}
              </option>
            ))}
          </StyledNavSelect>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
