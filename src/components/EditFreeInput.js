import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TextField, IconButton} from '@material-ui/core';
import {CheckCircle} from '@material-ui/icons';

class EditFreeInput extends Component {
  //
  static propTypes = {
    partsName: PropTypes.string.isRequired,
    default: PropTypes.string.isRequired,
    bindOnClickEditorHistoryItem: PropTypes.func.isRequired,
  };

  //
  constructor(props) {
    super(props);

    // stateの初期値を設定
    this.state = {
      input: this.props.default
    };
  }

  //rerender react component(with state) when prop changes
  componentWillReceiveProps(nextProps) {
    this.setState({input: nextProps.default });
  }

  //
  handleChange = name => event => {
    this.setState({
      input: event.target.value,
    });
  };

  render() {
    return (
      <div className="edit-freeinput">
        <TextField id="yk_freeinput" 
          label="自由入力"
          className={this.props.partsName} 
          onChange={this.handleChange('name')}
          value={this.state.input} />
        <IconButton 
          label="OK"
          color="primary"
          onClick={() => this.props.bindOnClickEditorHistoryItem(this.props.partsName, this.state.input)}
          style={{minWidth: '10px',margin: '4px 4px 0 0'}}
        >
          <CheckCircle />
        </IconButton>
      </div>
    );
  }
}

export default EditFreeInput;
