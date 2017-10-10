import { connect } from 'react-redux';
import LeftMenu from './LeftMenu';
import {
    selectTool,
    groupClick
} from './../../actions/menu';

const mapDispatchToProps = (dispatch) => {
    return {
        onToolSelect: (toolType) => {
            dispatch(selectTool(toolType));
        },
        onGroupClick: () => {
            dispatch(groupClick());
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(LeftMenu);
