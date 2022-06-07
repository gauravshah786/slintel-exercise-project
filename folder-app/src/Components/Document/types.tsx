export interface DocumentContainerProps {
  id: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export interface DocumentProps {
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  isFolder: boolean;
  isSelected: boolean;
  name: string; 
};