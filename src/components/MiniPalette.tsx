import { Delete } from '@material-ui/icons';
import React from 'react';
import useMiniPaletteStyles from '~/hooks/useMiniPaletteStyles';

type Props = {
  id: string;
  emoji?: string;
  colors?: { name: string; color: string }[];
  goToPalette: (id: string) => void;
  openDialog: (id: string) => void;
  paletteName?: string;
};

const MiniPalette: React.FC<Props> = ({
  id,
  colors = [],
  emoji = '',
  goToPalette,
  openDialog,
  paletteName,
}) => {
  const classes = useMiniPaletteStyles();

  const deletePalette: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    openDialog(id);
  };
  const handleClick = () => {
    goToPalette(id);
  };

  const miniColorBoxes = colors.map((color) => (
    <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
  ));

  return (
    <div className={classes.root} onClick={handleClick}>
      <Delete
        className={classes.deleteIcon}
        style={{ transition: 'all 0.3s ease-in-out' }}
        onClick={deletePalette}
      />

      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default MiniPalette;
