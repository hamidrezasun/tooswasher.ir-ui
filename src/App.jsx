/** @jsxImportSource @emotion/react */
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Page from './pages/Page';
import Category from './pages/Category';

function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pages/:pageName" element={<Page />} />
        <Route path="/categories/:categoryId" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;