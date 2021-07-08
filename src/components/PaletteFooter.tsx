import React from 'react';
import usePaletteFooterStyles from '~/hooks/usePaletteFooterStyles';

type Props = {
  emoji: string;
  paletteName: string;
};

const PaletteFooter: React.FC<Props> = ({ emoji, paletteName }) => {
  const classes = usePaletteFooterStyles();

  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

export default PaletteFooter;
