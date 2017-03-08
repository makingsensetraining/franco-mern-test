import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions/---AUTOGENERATED---';

class <%= name %> extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                ---AUTOGENERATED <%= name %>---
            </div>
        );
    }
}

<%= name %>.propTypes = {
};

<%= name %>.defaultProps = {
};

function mapStatesToProps(state, ownProps) {
    return {
      state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(<%= name %>);