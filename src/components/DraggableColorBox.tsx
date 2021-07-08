import { Delete } from '@material-ui/icons';
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import useDraggableColorBoxStyles from '~/hooks/useDraggableColorBoxStyles';

type Props = {
  color: string;
  name: string;
  handleClick: () => void;
};

const DraggableColorBox: React.FC<Props> = ({ color, name, handleClick }) => {
  const classes = useDraggableColorBoxStyles({ color });

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <Delete className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
};

export default SortableElement(DraggableColorBox);
