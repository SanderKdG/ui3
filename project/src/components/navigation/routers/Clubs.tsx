import React from "react";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import ClubList from "../../pages/lists/ClubList";
import { ModifyClub, NewClub } from "../../pages/forms/ClubForm";
import ClubDetails from "../../pages/details/ClubDetails";

export default function Clubs() {
  const { path } = useRouteMatch()
  return (
      <Switch>
        <Route path={`${path}/new`} component={NewClub} />
        <Route path={`${path}/:id/modify`} component={ModifyClub} />
        <Route path={`${path}/:id`} component={ClubDetails} />
        <Route path={`${path}`} component={ClubList} />
      </Switch>
  );
}