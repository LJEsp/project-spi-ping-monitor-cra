import React, { Component } from "react";
import "./css/sanitize.css";
import hosts from "./data/hosts.json";
import PingContainer from "./components/PingContainer/PingContainer";
import HeaderContainer from "./components/HeaderContainer/HeaderContainer";

import styled from "styled-components";

const Div = styled.div`
  /* text-align: center; */
`;

const StylContentContainer = styled.div`
  padding: 1rem;
  padding-top: 5rem;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hostCount: this.countHosts(),
      pingCount: 0,
      isContinuous: true,
      isFinished: false
    };

    this.incrementPing = this.incrementPing.bind(this);
    this.countHosts = this.countHosts.bind(this);
    this.handleContinuousChange = this.handleContinuousChange.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  countHosts() {
    let hostCount = 0;

    hosts.sites.forEach(site => {
      site.hosts.forEach(host => {
        hostCount++;
      });
    });

    return hostCount;
  }

  incrementPing() {
    this.setState(
      (prevState, props) => ({
        pingCount: prevState.pingCount + 1
      }),
      () => {
        if (this.state.hostCount === this.state.pingCount) {
          this.handleFinish();
        }
      }
    );
  }

  handleFinish() {
    setTimeout(() => {
      this.setState({ isFinished: true }, () => {
        if (this.state.isContinuous === true) {
          this.setState({ isFinished: false, pingCount: 0 });
        }
      });
    }, 5000);
  }

  handleContinuousChange() {
    this.setState({ isContinuous: !this.state.isContinuous }, () => {
      if (this.state.isContinuous === true) {
        this.setState({ isFinished: false, pingCount: 0 });
      }
    });
  }

  render() {
    const pingList = hosts.sites.map((site, index) => {
      return (
        <PingContainer
          key={index}
          site={site}
          incrementPing={this.incrementPing}
          isContinuous={this.state.isContinuous}
          isFinished={this.state.isFinished}
        />
      );
    });

    return (
      <Div>
        <HeaderContainer
          hostCount={this.state.hostCount}
          pingCount={this.state.pingCount}
          handleContinuousChange={this.handleContinuousChange}
          isContinuous={this.state.isContinuous}
        />

        <StylContentContainer>{pingList}</StylContentContainer>
      </Div>
    );
  }
}

export default App;
