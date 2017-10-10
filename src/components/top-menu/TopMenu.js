import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './top-menu.css';
import { ColorPicker } from '.';

class TopMenu extends Component {
    static propTypes = {
        onUndoClick: PropTypes.func,
        onRedoClick: PropTypes.func,
        onColorSelect: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleUndoClick = this.handleUndoClick.bind(this);
        this.handleRedoClick = this.handleRedoClick.bind(this);
        this.handleColorSelect = this.handleColorSelect.bind(this);
    }

    handleUndoClick() {
        this.props.onUndoClick();
    }

    handleRedoClick() {
        this.props.onRedoClick();
    }

    handleColorSelect(color) {
        this.props.onColorSelect(color);
    }

    render() {
        return (
            <div id="top-bar">
              <button onClick={this.handleUndoClick}>
                  <img src="./assets/004-undo.svg" alt="undo" id="button-icon" />
              </button>
              <button onClick={this.handleRedoClick}>
                  <img src="./assets/003-redo.svg" alt="redo" id="button-icon" />
              </button>
              <div id="color-palette">
                <ColorPicker></ColorPicker>
              </div>
            </div>
        );
    }
}

export default TopMenu;
