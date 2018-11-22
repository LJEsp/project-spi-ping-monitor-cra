import React, { Component } from "react";
import styled from "styled-components";

const StylWrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  border-bottom: 3px solid #a5ce39;
  background-color: #465b66;
  color: white;
`;

const StylTitle = styled.h1`
  font-weight: 400;
  margin: 0;
  padding: 0;
`;

const StylCounterContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
`;

const StylCounter = styled.span`
  margin-right: 1rem;
`;

const StylCheckbox = styled.input`
  margin-right: 0.3rem;
  width: 1rem;
  height: 1rem;
`;

const StylCheckboxLabel = styled.label``;

class HeaderContainer extends Component {
  render() {
    const {
      hostCount,
      pingCount,
      handleContinuousChange,
      isContinuous
    } = this.props;

    return (
      <StylWrapper>
        <StylTitle>SPi Ping Monitor</StylTitle>

        <StylCounterContainer>
          <StylCounter>
            {pingCount} / {hostCount}
          </StylCounter>

          <div>
            <StylCheckbox
              type="checkbox"
              id="continuous"
              checked={isContinuous}
              onChange={handleContinuousChange}
            />
            <StylCheckboxLabel htmlFor="continuous">
              Continuous
            </StylCheckboxLabel>
          </div>
        </StylCounterContainer>

        <div>
          <button>Download</button>
        </div>
      </StylWrapper>
    );
  }
}
export default HeaderContainer;
