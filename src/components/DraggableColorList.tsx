import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

type Props = {
  colors: {
    name: string;
    color: string;
  }[];
  removeColor: (colorName: string) => void;
};

const DraggableColorList: React.FC<Props> = ({ colors, removeColor }) => {
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, idx) => (
        <DraggableColorBox
          index={idx}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
};
export default SortableContainer(DraggableColorList);
