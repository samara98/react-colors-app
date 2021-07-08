import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Check, Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from '~/components/MiniPalette';
import { SeedColors } from '~/data/seedColors';
import usePaletteListStyles from '~/hooks/usePaletteListStyles';

type Props = RouteComponentProps & {
  palettes: SeedColors;
  deletePalette: (id: string) => void;
};

const PaletteList: React.FC<Props> = ({ deletePalette, history, palettes }) => {
  const [state, setState] = useState({
    openDeleteDialog: false,
    deletingId: '',
  });
  const classes = usePaletteListStyles();

  const openDialog = (id: string) => {
    setState((prev) => ({ ...prev, openDeleteDialog: true, deletingId: id }));
  };
  const closeDialog = () => {
    setState((prev) => ({ ...prev, openDeleteDialog: false, deletingId: '' }));
  };
  const goToPalette = (id: string) => {
    history.push(`/palette/${id}`);
  };
  const handleDelete = () => {
    deletePalette(state.deletingId);
    closeDialog();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                {...palette}
                goToPalette={goToPalette}
                openDialog={openDialog}
                key={palette.id}
                id={palette.id!}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={state.openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <Check />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <Close />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default PaletteList;
