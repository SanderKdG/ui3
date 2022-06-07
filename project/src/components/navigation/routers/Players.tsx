import React from "react";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { ModifyPlayerForm, NewPlayerForm } from "../../pages/forms/PlayerForm";
import PlayerDetails from "../../pages/details/PlayerDetails";
import PlayersList from "../../pages/lists/PlayersList";

export default function Players() {
  const { path } = useRouteMatch()
  return (
      <Switch>
        <Route path={`${path}/new`} component={NewPlayerForm} />
        <Route path={`${path}/:id/modify`} component={ModifyPlayerForm} />
        <Route path={`${path}/:id`} component={PlayerDetails} />
        <Route path={`${path}`} component={PlayersList} />
      </Switch>
  );
}