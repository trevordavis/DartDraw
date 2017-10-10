import { connect } from 'react-redux';
import TopMenu from './TopMenu';
import {
    undoClick,
    redoClick,
    selectTool
} from './../../actions/menu';

const mapDispatchToProps = (dispatch) => {
    return {
        onUndoClick: () => {
            dispatch(undoClick());
        },
        onRedoClick: () => {
            dispatch(redoClick());
        },
        onToolSelect: (toolType) => { // replace with onColorSelect
            dispatch(selectTool(toolType));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(TopMenu);
