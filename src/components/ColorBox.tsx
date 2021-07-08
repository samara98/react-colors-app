import classNames from 'classnames';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import useColorBoxStyles from '~/hooks/useColorBoxStyles';

type Props = {
  name: string;
  background: string;
  moreUrl?: string;
  showingFullPalette?: boolean;
};

const ColorBox: React.FC<Props> = ({
  name,
  background,
  moreUrl = '/',
  showingFullPalette = false,
}) => {
  const classes = useColorBoxStyles({ name, background, moreUrl, showingFullPalette });
  const [state, setState] = useState({ copied: false });

  const changeCopyState = () => {
    setState({ copied: true });
    setTimeout(() => setState({ copied: false }), 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: state.copied,
          })}
        />

        <div
          className={classNames(classes.copyMessage, {
            [classes.showMessage]: state.copied,
          })}
        >
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
