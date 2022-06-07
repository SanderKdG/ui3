import { Route, Switch } from "react-router";
import Home from "../../pages/Home";
import Clubs from "./Clubs";
import Formations from "./Formations";
import Players from "./Players";

export default function MainRouter() {
  return (
    <Switch>
      <Route path="/formations" component={Formations} />
      <Route path="/clubs" component={Clubs} />
      <Route path="/players" component={Players} />
      <Route path="/" component={Home} />
    </Switch>
  )
}