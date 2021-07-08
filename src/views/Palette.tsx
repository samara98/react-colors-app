import React, { useState } from 'react';
import ColorBox from '~/components/ColorBox';
import Navbar from '~/components/Navbar';
import PaletteFooter from '~/components/PaletteFooter';
import { Palette as PaletteInterface } from '~/helpers/colorHelpers';
import usePaletteStyles from '~/hooks/usePaletteStyles';

type Props = {
  palette: PaletteInterface;
};

const Palette: React.FC<Props> = ({ palette: { id, colors, paletteName, emoji } }) => {
  const [state, setState] = useState<{
    level: number;
    format: 'id' | 'name' | 'hex' | 'rgb' | 'rgba';
  }>({ level: 500, format: 'hex' });
  const classes = usePaletteStyles();

  const changeLevel = (level: number) => {
    setState((prev) => ({ ...prev, level }));
  };
  const changeFormat = (val: 'id' | 'name' | 'hex' | 'rgb' | 'rgba') => {
    setState((prev) => ({ ...prev, format: val }));
  };

  const colorBoxes = colors[state.level].map((color) => (
    <ColorBox
      background={color[state.format]}
      name={color.name}
      key={color.id}
      moreUrl={`/palette/${id}/${color.id}`}
      showingFullPalette
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar
        level={state.level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
        showingAllColors
      />
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default Palette;
