import { Routes, Route, Link } from 'react-router-dom';
import { Comp1 } from './components/Comp1';
import { Comp2 } from './components/Comp2';

export const App = () => {
  return (
    <div>
      <h1>My App Demo</h1>
      <div>
        <Link to={'comp1'}>comp1</Link>
        <Link to={'comp2'}>comp2</Link>
      </div>

      <div>
        <Routes>
          <Route path="comp1" element={<Comp1 />} />
          <Route path="comp2" element={<Comp2 />} />
        </Routes>
      </div>
    </div>
  );
};
