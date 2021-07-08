import { Button, Divider, Drawer, IconButton, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { arrayMove } from 'react-sortable-hoc';
import ColorPickerForm from '~/components/ColorPickerForm';
import DraggableColorList from '~/components/DraggableColorList';
import PaletteFormNav from '~/components/PaletteFormNav';
import seedColors, { SeedColor, SeedColors } from '~/data/seedColors';
import useNewPaletteFormStyles from '~/hooks/useNewPaletteFormStyles';

type Props = RouteComponentProps & {
  savePalette: (newPalette: SeedColor) => void;
  palettes: SeedColors;
  maxColors?: number;
};

const NewPaletteForm: React.FC<Props> = ({ history, savePalette, palettes, maxColors = 20 }) => {
  const [state, setState] = useState({
    open: true,
    colors: seedColors[0].colors!,
  });
  const classes = useNewPaletteFormStyles();

  const addNewColor = (newColor: { name: string; color: string }) => {
    setState((prev) => ({ ...prev, colors: [...state.colors, newColor], newColorName: '' }));
  };
  const addRandomColor = () => {
    const allColors = palettes.map((p) => p.colors).flat();
    let rand;
    let randomColor: {
      name: string;
      color: string;
    };
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand]!;
      // eslint-disable-next-line no-loop-func
      isDuplicateColor = state.colors.some((color) => color.name === randomColor.name);
    }
    setState((prev) => ({ ...prev, colors: [...state.colors, randomColor] }));
  };
  const clearColors = () => {
    setState((prev) => ({ ...prev, colors: [] }));
  };
  const removeColor = (colorName: string) => {
    setState((prev) => ({
      ...prev,
      colors: state.colors.filter((color) => color.name !== colorName),
    }));
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setState((prev) => ({ ...prev, colors: arrayMove(prev.colors, oldIndex, newIndex) }));
  };

  const handleDrawerOpen = () => {
    setState((prev) => ({ ...prev, open: true }));
  };
  const handleDrawerClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };
  const handleSubmit = (newPalette: SeedColor) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = state.colors;
    savePalette(newPalette);
    history.push('/');
  };

  const paletteIsFull = state.colors.length >= maxColors;

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={state.open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={state.colors}
          />
        </div>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: state.open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={state.colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </main>
    </div>
  );
};

export default NewPaletteForm;
