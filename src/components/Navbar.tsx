import { IconButton, MenuItem, Select, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useNavbarStyles from '~/hooks/useNavbarStyles';

type Props = {
  level?: number;
  changeLevel?: (level: number) => void;
  handleChange: (val: 'id' | 'name' | 'hex' | 'rgb' | 'rgba') => void;
  showingAllColors?: boolean;
};

const Navbar: React.FC<Props> = ({
  level,
  changeLevel,
  handleChange,
  showingAllColors = false,
}) => {
  const [state, setState] = useState({ format: 'hex', open: false });
  const classes = useNavbarStyles();

  const handleFormatChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setState((prev) => ({
      ...prev,
      format: typeof e.target.value === 'string' ? e.target.value : 'hex',
      open: true,
    }));
    handleChange(e.target.value as 'id' | 'name' | 'hex' | 'rgb' | 'rgba');
  };
  const closeSnackbar = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">reactcolorpicker</Link>
      </div>
      {showingAllColors && (
        <div>
          <span style={{ marginRight: '20px' }}>Level: {level}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      )}
      <div className={classes.selectContainer}>
        <Select value={state.format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={state.open}
        autoHideDuration={3000}
        message={<span id="message-id">Format Changed To {state.format.toUpperCase()}</span>}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={closeSnackbar}
        action={[
          <IconButton onClick={closeSnackbar} color="inherit" key="close" aria-label="close">
            <Close />
          </IconButton>,
        ]}
      />
    </header>
  );
};

export default Navbar;
