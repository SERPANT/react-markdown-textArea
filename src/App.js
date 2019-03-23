import marked from 'marked';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './app.css';

/**
 * React mark-down textfield Component.
 */
class App extends Component {
  /**
   * Constructor.
   * 
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef();
    this.divTextAreaRef = React.createRef();
    const { width, height } = props;

    this.state = { isSelected: false, width: width || 256, height: height || 36, text: '' };
  }

  /**
   * Calculates size of text box and saves it in state.
   */
  setSize = () => {
    const { clientHeight, clientWidth } = this.textAreaRef.current;

    this.setState({ width: clientWidth, height: clientHeight });
  };

  /**
   * Toggles the isSelected flag.
   */
  switchView = () => {
    this.setState((state) => ({ isSelected: !state.isSelected }));
  };

  /**
   * React Life Cycle method.
   */
  componentDidUpdate = () => {
    const { isSelected, text } = this.state;

    if (!isSelected && text !== '') {
      this.divTextAreaRef.current.innerHTML = marked(text);

      return;
    }

    if (this.divTextAreaRef.current && this.props.placeHolder) {
      this.divTextAreaRef.current.innerHTML = `<p class="placeholder">${this.props.placeHolder}<p>`;
    }
  };

  /**
   * @param {object} e : event object.
   */
  onRemoveFocus = (e) => {
    this.setSize();
    this.switchView();

    const { onRemoveFocus } = this.props;

    if (onRemoveFocus) {
      onRemoveFocus(e);
    }
  }

  /**
   * Performs some task if text changes in textfield.
   * 
   * @param {object} e : event object.
   */
  onTextChange = (e) => {
    this.setState({ text: e.target.value });

    const { onTextChange } = this.props;

    if (onTextChange) {
      onTextChange(e);
    }
  }

  /**
   * Returns inline style object.
   */
  getTextBoxStyleObj = () => {
    const { cssStyle } = this.props;
    const { height, width } = this.state;

    return { width: `${width}px`, height: `${height}px`, ...cssStyle };
  }


  /**
   * Based on value of isSelected flag return JSX.
   * 
   * @returns {JSX}
   */
  getView = () => {
    const { isSelected } = this.state;
    const { cssClasses, placeHolder } = this.props;

    const styleObj = this.getTextBoxStyleObj();

    if (isSelected) {
      return (
        <textarea
          style={styleObj}
          autoFocus="autoFocus"
          ref={this.textAreaRef}
          value={this.state.text}
          placeholder={placeHolder}
          onBlur={this.onRemoveFocus}
          onChange={this.onTextChange}
          className={`text-area ${cssClasses}`}
        />
      );
    }

    return (
      <div
        style={styleObj}
        ref={this.divTextAreaRef}
        onClick={this.switchView}
        className={`div-text-area ${cssClasses}`}
      />
    );
  };


  /**
   * @returns {JSX}
   */
  render() {
    const currentView = this.getView();

    return <div className="react-markdown-textarea">{currentView}</div>;
  }
}

App.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  cssStyle: PropTypes.object,
  cssClasses: PropTypes.string,
  onTextChange: PropTypes.func,
  placeHolder: PropTypes.string,
  onRemoveFocus: PropTypes.func,
};

export default App;
