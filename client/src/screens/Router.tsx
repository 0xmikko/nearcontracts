import React from "react";
import { PrivateRoute } from "../components/PrivateRoute";
import { withTracker } from "../utils/ga";
import { Redirect, Route, Switch } from "react-router";
import AppBar from "../components/AppBar/AppBar";
import { TemplatesListScreen } from "./Templates/TemplatesListScreen";

export const Router: React.FC = () => {
  return (
    <>
      <AppBar />
      <Switch>
        <PrivateRoute
          exact
          path="/docs"
          component={withTracker(TemplatesListScreen)}
        />

        <Route path={"*"}>
          <Redirect to={"/docs"} />
        </Route>
      </Switch>
    </>
  );
};
