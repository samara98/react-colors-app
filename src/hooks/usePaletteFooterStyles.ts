import { makeStyles } from '@material-ui/styles';

const usePaletteFooterStyles = makeStyles({
  PaletteFooter: {
    backgroundColor: 'white',
    height: '5vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
});

export default usePaletteFooterStyles;
