export interface IInsertBookInput {
  title: string;
  pubYear: string;
  authorId: number;
}
export interface IFetchAllBookInput {
  authorId?: number;
  startYear?: string;
  endYear?: string;
}
