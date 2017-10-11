import { connect } from 'react-redux';
import LeftMenu from './LeftMenu';
import {
<<<<<<< HEAD
    selectTool,
    groupClick
=======
    selectTool
>>>>>>> 0d1a61659c6619431402820d30d1ce090d842e87
} from './../../actions/menu';

const mapDispatchToProps = (dispatch) => {
    return {
        onToolSelect: (toolType) => {
            dispatch(selectTool(toolType));
<<<<<<< HEAD
        },
        onGroupClick: () => {
            dispatch(groupClick());
=======
>>>>>>> 0d1a61659c6619431402820d30d1ce090d842e87
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(LeftMenu);
