import React, { Component } from "react";
import styled, { css } from "styled-components";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

// import Host from "./Host";

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

const StylDownloadButton = styled.button`
  background-color: #a5ce39;
  background-color: ${props => (props.disabled ? "#6a7b84" : "#a5ce39")};
  color: ${props => (props.disabled ? "#ffffff" : "#2a363d")};
  box-sizing: border-box;
  width: 12rem;
  font-weight: 700;

  padding: 0.5rem 1rem;
  border: none;

  ${props => {
    if (!props.disabled) {
      return css`
        &:hover {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
        }

        &:active {
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
          transform: translateY(2px);
        }
      `;
    }
  }}
`;

class HeaderContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.download = this.download.bind(this);
  }

  download() {
    const downloadable = [];
    const sites = document.querySelectorAll(".item");

    // debugger;

    sites.forEach(site => {
      const dlSite = {};
      dlSite.name = site.childNodes[0].textContent;
      dlSite.hosts = [];

      site.childNodes[1].childNodes.forEach(host => {
        const dlHost = {};
        const array = host.textContent.split(" > ");
        dlHost.host = array[0];
        dlHost.detail = array[1];

        dlSite.hosts.push(dlHost);
      });

      downloadable.push(dlSite);
    });

    ipcRenderer.send("csv:download", downloadable);

    console.log(downloadable);
  }

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
          <StylDownloadButton
            disabled={!this.props.isFinished}
            onClick={this.download}
          >
            {this.props.isFinished ? "Download CSV" : "Pinging hosts"}
          </StylDownloadButton>
        </div>
      </StylWrapper>
    );
  }
}

export default HeaderContainer;
