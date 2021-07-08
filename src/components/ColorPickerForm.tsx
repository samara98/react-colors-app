import { Button } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import useColorPickerStyles from '~/hooks/useColorPickerStyles';

type Props = {
  paletteIsFull?: boolean;
  addNewColor: (newColor: { name: string; color: string }) => void;
  colors: {
    name: string;
    color: string;
  }[];
};

const ColorPickerForm: React.FC<Props> = ({ paletteIsFull = false, addNewColor, colors }) => {
  const [state, setState] = useState({ currentColor: 'teal', newColorName: '' });
  const classes = useColorPickerStyles();
  const formRef = useRef(null);

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()),
    );
    ValidatorForm.addValidationRule('isColorUnique', (value) =>
      colors.every(({ color }) => color !== state.currentColor),
    );
    return () => {};
  }, []);

  const updateCurrentColor = (newColor: { hex: string }) => {
    setState((prev) => ({ ...prev, currentColor: newColor.hex }));
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setState((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };
  const handleSubmit = () => {
    const newColor = {
      color: state.currentColor,
      name: state.newColorName,
    };
    addNewColor(newColor);
    setState((prev) => ({ ...prev, newColorName: '' }));
  };

  return (
    <div>
      <ChromePicker
        color={state.currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit} ref={formRef} instantValidate={false}>
        <TextValidator
          value={state.newColorName}
          className={classes.colorNameInput}
          placeholder="Color Name"
          name="newColorName"
          variant="filled"
          margin="normal"
          onChange={handleChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          className={classes.addColor}
          style={{
            backgroundColor: paletteIsFull ? 'grey' : state.currentColor,
          }}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
