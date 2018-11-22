import React, { Component } from "react";
import "./App.css";
import hosts from "./data/hosts.json";
import PingContainer from "./components/PingContainer/PingContainer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const pingList = hosts.sites.map((site, index) => {
      return <PingContainer key={index} site={site} />;
    });
    return (
      <div className="App">
        <h1>SPi Ping Monitor</h1>
        {pingList}
      </div>
    );
  }
}

export default App;
