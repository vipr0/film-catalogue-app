import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import PageLayout from "./components/PageLayout";
import FilmDetails from "./views/FilmDetails";
import FilmsList from "./views/FilmsList";
import Search from "./views/Search";

function App() {
  return (
    <PageLayout>
      <Switch>
        <Route path="/" component={FilmsList} exact/>
        <Route path="/search" component={Search} exact/>
        <Route path="/:filmId" component={FilmDetails}/>
      </Switch>
    </PageLayout>
  );
}

export default App;
