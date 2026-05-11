import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import ListasPersonas from './pages/ListasPersonas';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/" element={<PrivateLayout />}>
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="personas" element={<ListasPersonas />} />
      </Route>
    </Routes>
  );
}

export default App;