import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClipBoardHistoryPane extends Component {
  //
  /*constructor(props) {
    super(props);
  }*/

  //
  static propTypes = {
    ykState: PropTypes.object.isRequired,
    //bindOnClickSelectElement: PropTypes.func.isRequired,
    //bindOnClickHistoryItem: PropTypes.func.isRequired,
  };

  render() {
    //
    return (
      <div className="clipboardhistory-container">
        clipboard history item list.
      </div>
    );
  }
}

export default ClipBoardHistoryPane;
