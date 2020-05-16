import React from "react";
import { PrivateRoute } from "../components/PrivateRoute";
import { withTracker } from "../components/withTrackerHOC";
import { Redirect, Route, Switch } from "react-router";
import AppBar from "../components/AppBar/AppBar";
import { TemplatesListScreen } from "./Templates/TemplatesListScreen";
import { TemplateEditScreen } from "./Templates/TemplateEditScreen";
import { TemplateDetailsScreen } from "./Templates/TemplateDetailsScreen";
import { ContractsListScreen } from "./Contracts/ContractsListScreen";
import { ContractEditScreen } from "./Contracts/ContractEditScreen";
import { ContractDetailsScreen } from "./Contracts/ContractDetailsScreen";

export const Router: React.FC = () => {
  return (
    <>
      <AppBar />
      <Switch>
        <PrivateRoute
          exact
          path="/templates"
          component={withTracker(TemplatesListScreen)}
        />
        <PrivateRoute
          exact
          path="/templates/:id/edit"
          component={withTracker(TemplateEditScreen)}
        />
        <PrivateRoute
          exact
          path="/templates/:id"
          component={withTracker(TemplateDetailsScreen)}
        />
        <PrivateRoute
          exact
          path="/contracts"
          component={withTracker(ContractsListScreen)}
        />
        <PrivateRoute
          exact
          path="/contracts/:id/edit"
          component={withTracker(ContractEditScreen)}
        />
        <PrivateRoute
          exact
          path="/contracts/:id"
          component={withTracker(ContractDetailsScreen)}
        />
        <Route path={"*"}>
          <Redirect to={"/contracts"} />
        </Route>
      </Switch>
    </>
  );
};
