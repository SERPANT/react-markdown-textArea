import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './App';

ReactDOM.render(<App onRemoveFocus={(e) => { console.log(e.target.value) }} placeHolder="* aaaaaaaaaaaa hellow I am shreejit" width={500} height={500} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
