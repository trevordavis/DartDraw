import uuidv1 from 'uuid';
import { calculateBoundingBox } from './groups';

export function addRectangle(shapes, action, fill, matrix) {
    const { draggableData } = action.payload;
    const { x, y, node } = draggableData;

    const rectangle = {
        id: uuidv1(),
        type: 'rectangle',
        x: (x - node.getBoundingClientRect().left - matrix[4]) / matrix[0],
        y: (y - node.getBoundingClientRect().top - matrix[5]) / matrix[3],
        width: 0,
        height: 0,
        fill: formatColor(fill)
    };

    shapes.byId[rectangle.id] = rectangle;
    shapes.allIds.push(rectangle.id);
    return shapes;
}

export function addLine(shapes, action, fill, matrix) {
    const { draggableData } = action.payload;
    const { x, y, node } = draggableData;

    const line = {
        id: uuidv1(),
        type: "line",
        x1: (x - node.getBoundingClientRect().left - matrix[4]) / matrix[0],
        y1: (y - node.getBoundingClientRect().top - matrix[5]) / matrix[3],
        x2: (x - node.getBoundingClientRect().left - matrix[4]) / matrix[0],
        y2: (y - node.getBoundingClientRect().top - matrix[5]) / matrix[3],
        stroke: formatColor(fill)
    };

    shapes.byId[line.id] = line;
    shapes.allIds.push(line.id);
    return shapes;
}

export function moveLineAnchor(shapes, selected, draggableData, matrix) {
    const { deltaX, deltaY } = draggableData;
    const scaledDeltaX = deltaX / matrix[0];
    const scaledDeltaY = deltaY / matrix[3];

    selected.map((id) => {
        const line = shapes.byId[id];
        line.x2 += scaledDeltaX;
        line.y2 += scaledDeltaY;
    });

    return shapes;
}

export function removeShape(shapes, shapeId) {
    const index = shapes.allIds.indexOf(shapeId);
    delete shapes.byId[shapeId];
    shapes.allIds.splice(index, 1);
    return shapes;
}

export function resizeShape(shapes, selected, draggableData, handleIndex, matrix, group, offSetX, offSetY, isMember) {
    const { deltaX, deltaY } = draggableData;
    const scaledDeltaX = deltaX / matrix[0];
    const scaledDeltaY = deltaY / matrix[3];

    selected.map((id) => {
        const shape = shapes.byId[id];
        if (shape.type === "group") {
            if (typeof (group) === "undefined" || group === null) {
                group = calculateBoundingBox(shape, shapes, { x: Infinity, x2: -Infinity, y: Infinity, y2: -Infinity });
            } else {
                group = calculateBoundingBox(shape, shapes, group);
            }
            shapes = resizeShape(shapes, shape.members, draggableData, handleIndex, matrix, group, deltaX, deltaY, true);
        } else {
            if (!isMember) {
                switch (handleIndex) {
                    case 0:
                        shape.width = shape.width + scaledDeltaX;
                        shape.y = shape.y + scaledDeltaY;
                        shape.height = shape.height - scaledDeltaY;
                        break;
                    case 1:
                        shape.width = shape.width + scaledDeltaX;
                        shape.height = shape.height + scaledDeltaY;
                        break;
                    case 2:
                        shape.x = shape.x + scaledDeltaX;
                        shape.width = shape.width - scaledDeltaX;
                        shape.height = shape.height + scaledDeltaY;
                        break;
                    case 3:
                        shape.x = shape.x + scaledDeltaX;
                        shape.width = shape.width - scaledDeltaX;
                        shape.y = shape.y + scaledDeltaY;
                        shape.height = shape.height - scaledDeltaY;
                        break;
                    default:
                        break;
                }
            } else {
                group.width = group.x2 - group.x;
                group.height = group.y2 - group.y;
                if (group.width === 0) group.width = 1;
                if (group.height === 0) group.height = 1;

                let oldShape = { x: shape.x, y: shape.y, height: shape.height, width: shape.width };

                let x1Diff = shape.x - group.x;
                if (shape.width < 0) {
                    x1Diff = group.x2 - shape.x;
                }

                let x2Diff = group.x2 - shape.x;
                if (shape.width < 0) {
                    x2Diff = shape.x - group.x;
                }

                let y1Diff = shape.y - group.y;
                if (shape.height < 0) {
                    y1Diff = group.y2 - shape.y;
                }

                let y2Diff = group.y2 - shape.y;
                if (shape.height < 0) {
                    y2Diff = shape.y - group.y;
                }

                switch (handleIndex) {
                    case 0:
                        shape.width += Math.abs(shape.width) / group.width * scaledDeltaX;
                        shape.height -= Math.abs(shape.height) / group.height * scaledDeltaY;
                        shape.x += x1Diff / group.width * scaledDeltaX;
                        shape.y += y2Diff / group.height * scaledDeltaY;
                        break;
                    case 1:
                        shape.width += Math.abs(shape.width) / group.width * scaledDeltaX;
                        shape.height += Math.abs(shape.height) / group.height * scaledDeltaY;
                        shape.x += x1Diff / group.width * scaledDeltaX;
                        shape.y += y1Diff / group.height * scaledDeltaY;
                        break;
                    case 2:
                        shape.width -= Math.abs(shape.width) / group.width * scaledDeltaX;
                        shape.height += Math.abs(shape.height) / group.height * scaledDeltaY;
                        shape.x += x2Diff / group.width * scaledDeltaX;
                        shape.y += y1Diff / group.height * scaledDeltaY;
                        break;
                    case 3:
                        shape.width -= Math.abs(shape.width) / group.width * scaledDeltaX;
                        shape.height -= Math.abs(shape.height) / group.height * scaledDeltaY;
                        shape.x += x2Diff / group.width * scaledDeltaX;
                        shape.y += y2Diff / group.height * scaledDeltaY;
                        break;
                    default:
                        break;
                }
                if (isNaN(shape.x) || shape.x === -Infinity) { shape.x = oldShape.x; }
                if (isNaN(shape.y) || shape.y === -Infinity) { shape.y = oldShape.y; }
                if (isNaN(shape.width) || shape.width === -Infinity) { shape.width = 0; }
                if (isNaN(shape.height) || shape.height === -Infinity) { shape.height = 0; }
            }
        }
    });
    return shapes;
}

export function moveShape(shapes, selected, action, matrix) {
    const { draggableData } = action.payload;
    const { deltaX, deltaY } = draggableData;
    const scaledDeltaX = deltaX / matrix[0];
    const scaledDeltaY = deltaY / matrix[3];

    selected.map((id) => {
        const shape = shapes.byId[id];
        if (shape.type === "group") {
            shapes = moveShape(shapes, shape.members, action, matrix);
        } else {
            shape.x = shape.x + scaledDeltaX;
            shape.y = shape.y + scaledDeltaY;
        }
    });

    return shapes;
}

export function fillShape(shapes, selected, action) {
    const { color } = action.payload;
    selected.map((id) => {
        const shape = shapes.byId[id];
        if (shape.type === "group") {
            shapes = fillShape(shapes, shape.members, action);
        } else {
            shape.fill = formatColor(color);
        }
    });
    return shapes;
}

export function formatColor(rgba) {
    const { r, g, b, a } = rgba;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

export function changeZIndex(shapes, selected, change) {
    if (change > 0) {
        for (let i = shapes.allIds.length - 1; i >= 0; i--) {
            if (selected.indexOf(shapes.allIds[i]) > -1) {
                if (i + 1 < shapes.allIds.length && selected.indexOf(shapes.allIds[i + 1]) < 0) {
                    let temp = shapes.allIds[i + 1];
                    shapes.allIds[i + 1] = shapes.allIds[i];
                    shapes.allIds[i] = temp;
                }
            }
        }
    } else {
        for (let i = 0; i < shapes.allIds.length; i++) {
            if (selected.indexOf(shapes.allIds[i]) > -1) {
                if (i - 1 >= 0 && selected.indexOf(shapes.allIds[i - 1]) < 0) {
                    let temp = shapes.allIds[i - 1];
                    shapes.allIds[i - 1] = shapes.allIds[i];
                    shapes.allIds[i] = temp;
                }
            }
        }
    }
    return shapes;
}

export function groupShapes(selected, shapes) {
    let group = {
        id: uuidv1(),
        type: "group",
        members: []
    };
    shapes.allIds.map((id) => {
        if (selected.indexOf(id) > -1) {
            shapes.byId[id].groupID = group.id;
            group.members.push(id);
        }
    });
    return group;
}

export function ungroupShapes(selected, shapes) {
    let members = [];
    selected.map((id) => {
        if (shapes.byId[id].type === "group") {
            let i = shapes.allIds.indexOf(id);
            shapes.allIds.splice(shapes.allIds.indexOf(id), 1);
            shapes.byId[id].members.map((memberId) => {
                members.push(memberId);
                shapes.allIds.splice(i, 0, memberId);
                i += 1;
            });
            delete shapes.byId[id];
        } else {
            members.push(id);
        }
    });
    return members;
}

export function removeNegatives(shapes, selected) {
    selected.map((id) => {
        const shape = shapes.byId[id];

        if (shape.type === "group") {
            shapes = removeNegatives(shapes, shape.members);
        } else {
            if (shape.width < 0) {
                shape.x += shape.width;
                shape.width *= -1;
            }

            if (shape.height < 0) {
                shape.y += shape.height;
                shape.height *= -1;
            }
        }
    });
    return shapes;
}

export function deleteShapes(shapes, selected) {
    selected.map((id) => {
        if (shapes.byId[id].type === "group") {
            shapes = deleteShapes(shapes, shapes.byId[id].members);
        }
        delete shapes.byId[id];
        shapes.allIds.splice(shapes.allIds.indexOf(id), 1);
    });
    return shapes;
}
