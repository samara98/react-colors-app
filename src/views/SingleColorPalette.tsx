import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from '~/components/ColorBox';
import Navbar from '~/components/Navbar';
import PaletteFooter from '~/components/PaletteFooter';
import { Palette } from '~/helpers/colorHelpers';
import usePaletteStyles from '~/hooks/usePaletteStyles';

type Props = {
  palette: Palette;
  colorId: string;
};

const SingleColorPalette: React.FC<Props> = ({ palette, colorId }) => {
  const [state, setState] = useState<{ format: 'hex' | 'id' | 'name' | 'rgb' | 'rgba' }>({
    format: 'hex',
  });
  const classes = usePaletteStyles();

  const _shades = gatherShades(palette, colorId);

  function gatherShades(palette: Palette, colorToFilterBy: string) {
    let shades: {
      id: string;
      name: string;
      hex: string;
      rgb: string;
      rgba: string;
    }[] = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      const tmp = allColors[key].filter((color) => color.id === colorToFilterBy);
      shades = shades.concat(tmp);
    }
    return shades.slice(1);
  }
  const changeFormat = (val: 'hex' | 'id' | 'name' | 'rgb' | 'rgba') => {
    setState({ format: val });
  };

  const { paletteName, emoji, id } = palette;

  const colorBoxes = _shades.map((color) => (
    <ColorBox key={color.name} name={color.name} background={color[state.format]} />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>GO BACK</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default SingleColorPalette;
