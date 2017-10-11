import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './left-menu.css';

class LeftMenu extends Component {
    static propTypes = {
<<<<<<< HEAD
        onToolSelect: PropTypes.func,
        onGroupClick: PropTypes.func
=======
        onToolSelect: PropTypes.func
>>>>>>> 0d1a61659c6619431402820d30d1ce090d842e87
    };

    constructor(props) {
        super(props);

        this.handleToolSelect = this.handleToolSelect.bind(this);
<<<<<<< HEAD
        this.handleGroupClick = this.handleGroupClick.bind(this);
=======
>>>>>>> 0d1a61659c6619431402820d30d1ce090d842e87
    }

    handleToolSelect(toolType) {
        this.props.onToolSelect(toolType);
    }

<<<<<<< HEAD
    handleGroupClick() {
        this.props.onGroupClick();
    }

    render() {
        return (
            <div id="left-bar">
                <div id="basic-buttons">
                    <button onClick={() => this.handleToolSelect("selectTool")}>
                        <img src="./assets/001-cursor.svg" alt="select" id="button-icon" />
                    </button>
                    <button onClick={() => this.handleToolSelect("rectangleTool")}>
                        <img src="./assets/002-frame.svg" alt="rect" id="button-icon" />
                    </button>
                    <button onClick={() => this.handleGroupClick()}>
                        <img src="./assets/005-group.svg" alt="group" id="button-icon" />
                    </button>
                </div>
=======
    render() {
        return (
            <div id="left-bar">
              <div id="basic-buttons">
                <button onClick={() => this.handleToolSelect("selectTool")}>
                    <img src="./assets/001-cursor.svg" alt="select" id="button-icon" />
                </button>
                <button onClick={() => this.handleToolSelect("rectangleTool")}>
                    <img src="./assets/002-frame.svg" alt="rect" id="button-icon" />
                </button>
                <button onClick={() => this.handleToolSelect("groupTool")}>
                  <img src="./assets/005-group.svg" alt="group" id="button-icon" />
                </button>
              </div>
>>>>>>> 0d1a61659c6619431402820d30d1ce090d842e87
            </div>
        );
    }
}

export default LeftMenu;
