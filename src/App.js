import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Category from './components/Category';
import Input from './components/Input';
import Title from './components/Title';
import Cuisine from './pages/Cuisine';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Search from './pages/Search';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  return (
    <div>
      <Title />
      <Input />
      <Category />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/cuisine/:cuisine/:page" element={<Cuisine />} />
          <Route path="/search/:input/:page" element={<Search />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
