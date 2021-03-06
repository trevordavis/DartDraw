import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Shape } from '.';
import { formatTransform } from '../../utilities/shapes';

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
        fill: PropTypes.string,
        transform: PropTypes.arrayOf(PropTypes.shape({
            command: PropTypes.string,
            parameters: PropTypes.arrayOf(PropTypes.number)
        })),
        propagateEvents: PropTypes.bool
    }

    defaultProps = {
        propagateEvents: false
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
        const { id, width, height, x, y, stroke, strokeWidth, fill, transform, propagateEvents } = this.props;
        let renderX = x;
        let renderWidth = Math.abs(width);
        if (width < 0) {
            renderX = x - renderWidth;
        }
        let renderY = y;
        let renderHeight = Math.abs(height);
        if (height < 0) {
            renderY = y - renderHeight;
        }
        const rectProps = {
            id,
            x: renderX,
            y: renderY,
            width: renderWidth,
            height: renderHeight,
            stroke,
            strokeWidth,
            fill,
            transform: formatTransform(transform)
        };

        return (
            <Shape
                id={id}
                onDragStart={this.handleDragStart}
                onDrag={this.handleDrag}
                onDragStop={this.handleDragStop}
                onClick={this.handleClick}
                propagateEvents={propagateEvents}
            >
                <rect {...rectProps} />
            </Shape>
        );
    }
}

export default Rectangle;
