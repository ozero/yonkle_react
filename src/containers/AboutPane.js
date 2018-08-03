import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AboutPane extends Component {
  //
  /*constructor(props) {
    super(props);
  }*/

  //
  static propTypes = {
    ykState: PropTypes.object.isRequired,
    //bindOnClickEditorSelectElement: PropTypes.func.isRequired,
    //bindOnClickEditorHistoryItem: PropTypes.func.isRequired,
  };

  render() {
    //
    return (
      <div className="pane-container">
        <div className="pane-well">
          あなたのエージェントライフによんくるのご加護がありますように…。
        </div>
      </div>
    );
  }
}

export default AboutPane;
