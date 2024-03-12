export interface TimeLineProps {
  heading?: string,
  textVariant?: string,
  fontTextSize?: string,
  text?: string,
  badge?: boolean,
  badgeVariant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'default',
  data?: any;
  currentPage?: number;
  numOfPages?: number;
  paginationNumberClick?: (val) => void;
  previousClick?: (val) => void;
  nextClick?: (val) => void;
  cardHeight?:number;
  scrollHeight?:number;
}