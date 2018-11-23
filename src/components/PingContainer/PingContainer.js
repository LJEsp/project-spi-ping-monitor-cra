import React, { Component } from "react";
import Host from "./Host";
import styled from "styled-components";

const StylWrapper = styled.div`
  border: 1px solid #a5ce39;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StylHeader = styled.h2`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;

const StylHostContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

class PingContainer extends Component {
  render() {
    const { site, incrementPing, isContinuous, isFinished } = this.props;

    const hostList = site.hosts.map((host, index) => {
      return (
        <Host
          key={index}
          host={host}
          incrementPing={incrementPing}
          isContinuous={isContinuous}
          isFinished={isFinished}
        />
      );
    });

    return (
      <StylWrapper className="item">
        <div>
          <StylHeader>{site.header}</StylHeader>
        </div>

        <StylHostContainer>{hostList}</StylHostContainer>
      </StylWrapper>
    );
  }
}

export default PingContainer;
