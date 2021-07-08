import { AppBar, Button, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SeedColor, SeedColors } from '~/data/seedColors';
import usePaletteFormNavStyles from '~/hooks/usePaletteFormNavStyles';
import PaletteMetaForm from './PaletteMetaForm';

type Props = {
  open?: boolean;
  palettes: SeedColors;
  handleSubmit: (newPalette: SeedColor) => void;
  handleDrawerOpen: () => void;
};

const PaletteFormNav: React.FC<Props> = ({
  open = false,
  palettes,
  handleSubmit,
  handleDrawerOpen,
}) => {
  const history = useHistory();
  const [state, setState] = useState({ newPaletteName: '', formShowing: false });
  const classes = usePaletteFormNavStyles();

  const showForm = () => {
    setState((prev) => ({ ...prev, formShowing: true }));
  };
  const hideForm = () => {
    setState((prev) => ({ ...prev, formShowing: false }));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <AddToPhotos />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={showForm} className={classes.button}>
            Save
          </Button>
        </div>
      </AppBar>
      {state.formShowing && (
        <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={hideForm} />
      )}
    </div>
  );
};

export default PaletteFormNav;
