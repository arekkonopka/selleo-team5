import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authenticated, Unauthenticated } from "../../views";
import { GuardedRoute } from "../GuardedRoute/GuardedRoute";
import useAuth from "../../hooks/useAuth";
import SingleClient from "../../views/Authenticated/Management/SingleClient/SingleClient";

export const AppWrapper: React.FC = (): JSX.Element => {
  const { user, isLoggedIn } = useAuth();

  return (
    <>
      <Switch>
        <Route path="/auth">
          <Unauthenticated />
        </Route>
        {/* <Route path="/test-client/:id">
          <SingleClient />
        </Route> */}
        <GuardedRoute component={Authenticated} path="/" auth={isLoggedIn} />
      </Switch>
    </>
  );
};
