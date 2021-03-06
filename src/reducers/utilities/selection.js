import uuidv1 from 'uuid';
import { calculateBoundingBox } from './groups';

export function selectShape(selected, shapeId, selectMultiple, shiftSelected) {
    if (!shapeId) { return selected; }

    if (!selectMultiple) {
        return [shapeId];
    }

    if (selected === null || typeof (selected) === "undefined") {
        selected = [];
    }

    if (shiftSelected) {
        if (selected.indexOf(shapeId) > -1) {
            selected.splice(selected.indexOf(shapeId), 1);
        } else {
            selected.push(shapeId);
        }
    }

    return selected;
}

export function generateSelectionBoxes(selected, shapes) {
    const selectionBoxes = {};
    selected.map((id) => {
        const shape = shapes.byId[id];
        if (shape.type === "group") {
            selectionBoxes[id] = generateGroupSelectionBox(id, shape, shapes);
        } else if (shape.type === "rectangle") {
            selectionBoxes[id] = generateShapeSelectionBox(id, shape);
        }
    });
    return selectionBoxes;
}

function generateShapeSelectionBox(id, shape) {
    return {
        id: uuidv1(),
        shapeId: id,
        type: 'selectionBox',
        x: shape.x,
        y: shape.y,
        width: shape.width,
        height: shape.height
    };
}

function generateGroupSelectionBox(id, shape, shapes) {
    let group = {
        x: Infinity,
        x2: -Infinity,
        y: Infinity,
        y2: -Infinity
    };

    group = calculateBoundingBox(shape, shapes, group);

    return {
        id: uuidv1(),
        shapeId: id,
        type: 'selectionBox',
        x: group.x,
        y: group.y,
        width: group.x2 - group.x,
        height: group.y2 - group.y
    };
}

export function updateSelectionBoxes(shapes, selectionBoxes) {
    Object.keys(selectionBoxes).map((shapeId) => {
        const shape = shapes.byId[shapeId];
        if (typeof (shape) !== "undefined") {
            let id = selectionBoxes[shapeId].id;
            if (shape.type === "group") {
                selectionBoxes[shapeId] = generateGroupSelectionBox(shapeId, shape, shapes);
                selectionBoxes[shapeId].id = id;
            } else {
                selectionBoxes[shapeId] = generateShapeSelectionBox(shapeId, shape);
                selectionBoxes[shapeId].id = id;
            }
        }
    });
    return selectionBoxes;
}
