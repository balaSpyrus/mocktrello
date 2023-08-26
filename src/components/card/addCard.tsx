import React, { useEffect, useState } from "react";

interface Props {
  isAddingOne?: boolean;
  onToggle?: (toggle: boolean) => void;
  onSave?: (title: string) => void;
  addingFor: string;
}

const AddOne: React.FC<Props> = ({
  isAddingOne: isAddingOneFromProps,
  onToggle,
  onSave: onSaveFromProps,
  addingFor,
}) => {
  const [isAddingOne, setIsAddignOne] = useState(isAddingOneFromProps);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setIsAddignOne(isAddingOneFromProps);
  }, [isAddingOneFromProps]);

  const toggleBtn = () => {
    setIsAddignOne((prev) => !prev);
    onToggle?.(!isAddingOne);
  };

  const onTitleChange = (e) => setTitle(e.target.value);

  const onSave = () => {
    onSaveFromProps?.(title);
    onToggle?.(false);
    setTitle("");
    setIsAddignOne(false);
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter" && title) {
      onSave();
    }
  };

  return isAddingOne ? (
    <div className="add-one-mini">
      <input
        type="text"
        placeholder={addingFor}
        autoFocus
        value={title}
        onChange={onTitleChange}
        onKeyPress={onEnterPress}
      />
      <div>
        <button className="btn-c blue" onClick={title ? onSave : null}>
          &#x2714;
        </button>
        <button className="btn-c red" onClick={toggleBtn}>
          &#x2716;
        </button>
      </div>
    </div>
  ) : (
    <a href="/#" className="add-one-element" onClick={toggleBtn}>
      {addingFor}
    </a>
  );
};

export default AddOne;
