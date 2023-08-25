type CommonAttrType = {
  id: number;
  title: string;
};

export type CardType = CommonAttrType & {
  priority: number;
  description: string;
  comments: string[];
};

export interface DashBoardDataType {
  [key: string]: (CommonAttrType & { cards: CardType[] })[];
}
