import React, { useState } from 'react';
import { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from './components/Page';
import seedColors, { SeedColor, SeedColors } from './data/seedColors';
import { generatePalette } from './helpers/colorHelpers';
import NewPaletteForm from './views/NewPaletteForm';
import Palette from './views/Palette';
import PaletteList from './views/PaletteList';
import SingleColorPalette from './views/SingleColorPalette';

const App: React.FC = () => {
  const [state, setState] = useState({
    palettes: (JSON.parse(window.localStorage.getItem('palettes')!) as SeedColors) || seedColors,
  });

  useLayoutEffect(() => {
    syncLocalStorage();
    return () => {};
  }, [state.palettes]);

  const syncLocalStorage = () => {
    //save palettes to local storage
    window.localStorage.setItem('palettes', JSON.stringify(state.palettes));
  };

  const findPalette = (id: string) => {
    return state.palettes.find((palette) => palette.id === id);
  };
  const deletePalette = (id: string) => {
    setState((prev) => ({ palettes: prev.palettes.filter((palette) => palette.id !== id) }));
  };
  const savePalette = (newPalette: SeedColor) => {
    setState(() => ({ palettes: [...state.palettes, newPalette] }));
  };

  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Page>
                <Switch location={location}>
                  <Route
                    exact
                    path="/palette/new"
                    render={(props) => (
                      <NewPaletteForm
                        {...props}
                        savePalette={savePalette}
                        palettes={state.palettes}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={(props) => {
                      const foundPalette = findPalette(props.match.params.paletteId);
                      if (!foundPalette) return <Redirect to="/" />;
                      return (
                        <SingleColorPalette
                          colorId={props.match.params.colorId}
                          palette={generatePalette(foundPalette)}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/palette/:id"
                    render={(props) => {
                      const foundPalette = findPalette(props.match.params.id);
                      if (!foundPalette) return <Redirect to="/" />;
                      return <Palette palette={generatePalette(foundPalette)} />;
                    }}
                  />
                  <Route
                    render={(props) => (
                      <PaletteList
                        {...props}
                        palettes={state.palettes}
                        deletePalette={deletePalette}
                      />
                    )}
                  />
                </Switch>
              </Page>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
};

export default App;
