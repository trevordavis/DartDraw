import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Shape } from '.';

class Rectangle extends Component {
    static propTypes = {
        id: PropTypes.string,
        onDragStart: PropTypes.func,
        onDrag: PropTypes.func,
        onDragStop: PropTypes.func,
        onClick: PropTypes.func,
        width: PropTypes.number,
        height: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
        stroke: PropTypes.string,
        strokeWidth: PropTypes.number,
        fill: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragStop = this.handleDragStop.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleDragStart(id, draggableData) {
        const { onDragStart } = this.props;
        onDragStart && onDragStart(id, draggableData);
    }

    handleDrag(id, draggableData) {
        const { onDrag } = this.props;
        onDrag && onDrag(id, draggableData);
    }

    handleDragStop(id, draggableData) {
        const { onDragStop } = this.props;
        onDragStop && onDragStop(id, draggableData);
    }

    handleClick(id, event) {
        const { onClick } = this.props;
        onClick && onClick(id, event);
    }

    render() {
        const props = Object.assign({}, this.props);
        props.width = Math.abs(props.width);
        if (this.props.width < 0) {
            props.x = props.x - props.width;
        }
        props.height = Math.abs(props.height);
        if (this.props.height < 0) {
            props.y = props.y - props.height;
        }
        delete props['id'];
        delete props['onDragStart'];
        delete props['onDrag'];
        delete props['onDragStop'];
        delete props['onClick'];

        return (
            <Shape
                id={this.props.id}
                onDragStart={this.handleDragStart}
                onDrag={this.handleDrag}
                onDragStop={this.handleDragStop}
                onClick={this.handleClick}
            >
                <rect {...props} />
            </Shape>
        );
    }
}

export default Rectangle;
