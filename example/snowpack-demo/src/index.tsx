import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App: React.FC = () => {
  return <h1> Hello Snowpack React </h1>;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
