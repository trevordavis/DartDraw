import { resizeShape, moveShape, fillShape, changeZIndex, removeNegatives, deleteShapes } from '../utilities/shapes';
import { selectShape, generateSelectionBoxes, updateSelectionBoxes } from '../utilities/selection';

export function click(stateCopy, action, root) {
    switch (root.menuState.toolType) {
        case "selectTool":
            if (!stateCopy.editInProgress) {
                let shiftSelected = 16 in root.menuState.currentKeys;
                let selectMultiple = false;
                if (shiftSelected || (stateCopy.selected.length > 1 &&
                  stateCopy.selected.indexOf(action.payload.shapeId) > -1)) {
                    selectMultiple = true;
                }
                stateCopy.selected = selectShape(stateCopy.selected, action.payload.shapeId, selectMultiple, shiftSelected);
                stateCopy.selectionBoxes = generateSelectionBoxes(stateCopy.selected, stateCopy.shapes);
            }
            break;
        default: break;
    }
    stateCopy.editInProgress = false;
    return stateCopy;
}

export function dragStart(stateCopy, action, root) {
    switch (root.menuState.toolType) {
        default: break;
    }
    return stateCopy;
}

export function drag(stateCopy, action, root) {
    action.payload.draggableData.node = action.payload.draggableData.node.parentNode;

    if (!stateCopy.editInProgress) {
        stateCopy.editInProgress = true;
        stateCopy.lastSavedShapes = root.drawingState.shapes;
        switch (root.menuState.toolType) {
            case "selectTool":
                let shiftSelected = 16 in root.menuState.currentKeys;
                if (stateCopy.selected.indexOf(action.payload.shapeId) < 0) {
                    stateCopy.selected = selectShape(stateCopy.selected, action.payload.shapeId, shiftSelected, shiftSelected);
                    stateCopy.selectionBoxes = generateSelectionBoxes(stateCopy.selected, stateCopy.shapes);
                }
                break;
            default: break;
        }
    } else {
        switch (root.menuState.toolType) {
            case "selectTool":
                stateCopy.shapes = moveShape(stateCopy.shapes, stateCopy.selected, action, stateCopy.canvasTransformationMatrix);
                stateCopy.selectionBoxes = generateSelectionBoxes(stateCopy.selected, stateCopy.shapes);
                break;
            default: break;
        }
    }
    return stateCopy;
}

export function dragStop(stateCopy, action, root) {
    switch (root.menuState.toolType) {
        default:
            break;
    }
    stateCopy.editInProgress = false;
    return stateCopy;
}

export function handleDragStart(stateCopy, action, root) {
    switch (root.menuState.toolType) {
        default: break;
    }
    return stateCopy;
}

export function handleDrag(stateCopy, action, root) {
    action.payload.draggableData.node = action.payload.draggableData.node.parentNode.parentNode;

    if (!stateCopy.editInProgress) {
        stateCopy.editInProgress = true;
        stateCopy.lastSavedShapes = root.drawingState.shapes;
    } else {
        const { draggableData, handleIndex } = action.payload;
        switch (root.menuState.toolType) {
            case "selectTool":
                stateCopy.shapes = resizeShape(stateCopy.shapes, stateCopy.selected, draggableData, handleIndex, stateCopy.canvasTransformationMatrix);
                stateCopy.selectionBoxes = updateSelectionBoxes(stateCopy.shapes, stateCopy.selectionBoxes);
                break;
            default: break;
        }
    }
    return stateCopy;
}

export function handleDragStop(stateCopy, action, root) {
    switch (root.menuState.toolType) {
        case "selectTool":
            stateCopy.shapes = removeNegatives(stateCopy.shapes, stateCopy.selected);
            stateCopy.selectionBoxes = updateSelectionBoxes(stateCopy.shapes, stateCopy.selectionBoxes);
            break;
        default:
            break;
    }
    stateCopy.editInProgress = false;
    return stateCopy;
}

export function setColor(stateCopy, action, root) {
    stateCopy.lastSavedShapes = root.drawingState.shapes;
    stateCopy.shapes = fillShape(stateCopy.shapes, stateCopy.selected, action);
    return stateCopy;
}

export function bringFront(stateCopy, action, root) {
    stateCopy.lastSavedShapes = root.drawingState.shapes;
    stateCopy.shapes = changeZIndex(stateCopy.shapes, stateCopy.selected, 1);
    return stateCopy;
}

export function sendBack(stateCopy, action, root) {
    stateCopy.lastSavedShapes = root.drawingState.shapes;
    stateCopy.shapes = changeZIndex(stateCopy.shapes, stateCopy.selected, -1);
    return stateCopy;
}

export function keyDown(stateCopy, action, root) {
    const { keyCode } = action.payload;

    switch (keyCode) {
        case 8:
            stateCopy.lastSavedShapes = root.drawingState.shapes;
            stateCopy.shapes = deleteShapes(stateCopy.shapes, stateCopy.selected);
            stateCopy.selected = [];
            stateCopy.selectionBoxes = generateSelectionBoxes(stateCopy.selected, stateCopy.shapes);
            break;
        default: break;
    }

    return stateCopy;
}
