import React, { Component } from "react";
import Host from "./Host";

class PingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hostCount: this.props.site.hosts.length
    };
  }
  render() {
    console.log(this.state.hostCount);

    const { site } = this.props;

    const hostList = site.hosts.map((host, index) => {
      return <Host key={index} host={host} />;
    });

    return (
      <div>
        <div>Ping Container</div>

        <div>{site.header}</div>

        <div>{hostList}</div>
      </div>
    );
  }
}

export default PingContainer;
