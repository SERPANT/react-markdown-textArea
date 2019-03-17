import React, { Component } from 'react';

import marked from 'marked';

import './app.css';

class App extends Component {
  constructor() {
    super();
    this.state = { isSelected: false, width: 256, height: 36, text: '' };
    this.textAreaRef = React.createRef();
    this.divTextAreaRef = React.createRef();
  }

  setSize = () => {
    const { clientHeight, clientWidth } = this.textAreaRef.current;

    this.setState({ width: clientWidth, height: clientHeight });
  };

  switchView = () => {
    this.setState({ isSelected: !this.state.isSelected });
  };

  componentDidUpdate = () => {
    if (!this.state.isSelected) {
      this.divTextAreaRef.current.innerHTML = marked(this.state.text);
    }
  };

  getView = () => {
    const { isSelected, height, width } = this.state;

    if (isSelected) {
      return (
        <textarea
          className="text-area"
          ref={this.textAreaRef}
          value={this.state.text}
          autoFocus="autoFocus"
          onBlur={() => {
            this.setSize();
            this.switchView();
          }}
          onChange={e => {
            this.setState({ text: e.target.value });
          }}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      );
    }

    return (
      <div
        className="div-text-area"
        ref={this.divTextAreaRef}
        onClick={this.switchView}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    );
  };

  render() {
    const currentView = this.getView();

    return <div className="react-markdown-textarea">{currentView}</div>;
  }
}

export default App;
