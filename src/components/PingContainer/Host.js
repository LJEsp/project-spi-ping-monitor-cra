import React, { Component } from "react";
const electron = window.require("electron");
const fs = electron.remote.require("fs");
const ipcRenderer = electron.ipcRenderer;

class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ping: ""
    };

    this.handlePing = this.handlePing.bind(this);

    this.fetchPing = this.fetchPing.bind(this);
  }

  componentDidMount() {
    const { host } = this.props;

    ipcRenderer.on(`host:${host}`, this.handlePing);

    this.fetchPing();
  }

  handlePing(event, data) {
    this.setState({ ping: data });

    console.log(data);
  }

  fetchPing() {
    const { host } = this.props;

    ipcRenderer.send("host:request", host);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("host:ping", this.handlePing);
  }

  render() {
    const { host } = this.props;
    const { ping } = this.state;

    return (
      <div>
        {host} {ping.isAlive} {ping.time} {ping.numeric_host}
      </div>
    );
  }
}

export default Host;
