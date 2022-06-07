import React from "react";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import { ModifyFormationForm, NewFormationForm } from "../../pages/forms/EditableField";
import FormationList from "../../pages/lists/FormationList";
import SharedField from "../../pages/details/SharedField";

export default function Formations() {
  const { path } = useRouteMatch()
  return (
      <Switch>
        <Route path={`${path}/new`} component={NewFormationForm} />
        <Route path={`${path}/:id/modify`} component={ModifyFormationForm} />
        <Route path={`${path}/:id`} component={SharedField} />
        <Route path={`${path}`}component={FormationList} />
      </Switch>
  );
}