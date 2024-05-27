export type TitleType = {
  title: string;
  version: string;
};

type commonType = {
  id: string;
  title: string;
};

export interface ListDataType extends commonType {
  cards: CardType[];
}
export interface CardType extends commonType {
  priority: number;
  description: string;
  comments: string[];
}

export interface DashBoardDataType extends commonType {
  lists: ListDataType[];
}
