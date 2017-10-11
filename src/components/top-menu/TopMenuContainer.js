import { connect } from 'react-redux';
import TopMenu from './TopMenu';
import {
    undoClick,
    redoClick,
    selectColor
} from './../../actions/menu';

const mapDispatchToProps = (dispatch) => {
    return {
        onUndoClick: () => {
            dispatch(undoClick());
        },
        onRedoClick: () => {
            dispatch(redoClick());
        },
<<<<<<< HEAD:src/components/top-menu/TopMenuContainer.js
        onToolSelect: (toolType) => { // replace with onColorSelect
            dispatch(selectTool(toolType));
=======
        onColorSelect: (color) => { // replace with onColorSelect
            dispatch(selectColor(color));
>>>>>>> 0d1a61659c6619431402820d30d1ce090d842e87:src/components/top-menu/TopMenuContainer.js
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(TopMenu);
