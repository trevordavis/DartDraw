import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './top-menu.css';
import { CirclePicker } from 'react-color';

class ColorPicker extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <CirclePicker circleSize="20" circleSpacing="5" width="450px"/>
        );
    }
}

export default ColorPicker;
