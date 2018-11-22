import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";

const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;

class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ping: {},
      isDone: false
    };

    this.handlePing = this.handlePing.bind(this);
    this.fetchPing = this.fetchPing.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      // prevProps.isFinished === false &&
      this.props.isFinished === true &&
      this.props.isContinuous === true
    ) {
      this.setState({ isDone: false }, () => {
        this.fetchPing();
      });
    }
  }

  componentDidMount() {
    const { host } = this.props;

    ipcRenderer.on(`host:${host}`, this.handlePing);

    this.fetchPing();
  }

  fetchPing() {
    const { host } = this.props;

    ipcRenderer.send("host:request", host);
  }

  handlePing(event, data) {
    const { incrementPing } = this.props;

    if (this.state.isDone === false) {
      this.setState({ ping: data, isDone: true }, () => {
        incrementPing();
      });
    }

    // if (isContinuous === true) {
    //   this.fetchPing();
    // }
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("host:ping", this.handlePing);
  }

  render() {
    const { host } = this.props;
    const { ping } = this.state;

    let status;
    let ms;
    let ip;

    return (
      <StylWrapper>
        <StylHost>{host}</StylHost> >{" "}

        <StylStatus status={ping.status}>
          {!_.isEmpty(ping) ? ping.status : "..."},{" "}
        </StylStatus>

        <StylMs>{!_.isEmpty(ping) ? ping.time : "..."}, </StylMs>

        <StylIp>{!_.isEmpty(ping) ? ping.ip : "..."}</StylIp>
      </StylWrapper>
    );
  }
}

const StylWrapper = styled.div`
  margin-top: 0.2rem;
`;

const StylHost = styled.span``;
const StylStatus = styled.span`
  color: ${props => {
    if (props.status === "Up") {
      return "green";
    } else if (props.status === "Timed out") {
      return "blue";
    } else if (props.status === "Not found") {
      return "red";
    }
  }};
`;
const StylMs = styled.span``;
const StylIp = styled.span``;

export default Host;
