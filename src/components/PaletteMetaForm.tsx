import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { BaseEmoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { SeedColor, SeedColors } from '~/data/seedColors';

type Props = {
  palettes: SeedColors;
  handleSubmit: (newPalette: SeedColor) => void;
  hideForm: () => void;
};

const PaletteMetaForm: React.FC<Props> = ({ palettes, handleSubmit, hideForm }) => {
  const [state, setState] = useState({
    stage: 'form',
    newPaletteName: '',
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()),
    );
    return () => {};
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setState((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };
  const showEmojiPicker = () => {
    setState((prev) => ({ ...prev, stage: 'emoji' }));
  };
  const savePalette = (emoji: BaseEmoji) => {
    const newPalette: SeedColor = {
      paletteName: state.newPaletteName,
      emoji: emoji.native,
    };
    handleSubmit(newPalette);
    setState((prev) => ({ ...prev, stage: '' }));
  };

  return (
    <div>
      <Dialog open={state.stage === 'emoji'} onClose={hideForm}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker title="Pick a Palette Emoji" onSelect={savePalette} />
      </Dialog>
      <Dialog open={state.stage === 'form'} aria-labelledby="form-dialog-title" onClose={hideForm}>
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unique!
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              value={state.newPaletteName}
              name="newPaletteName"
              onChange={handleChange}
              fullWidth
              margin="normal"
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette Name', 'Name already used']}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
