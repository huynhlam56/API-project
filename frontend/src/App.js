import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from  "./components/Spots/SpotIndex";
import SpotForm from "./components/CreateSpot/SpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' component={SpotIndex} />
          <Route path='/spots' component={SpotForm} />
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
    )}
    </>
  );
}

export default App;
