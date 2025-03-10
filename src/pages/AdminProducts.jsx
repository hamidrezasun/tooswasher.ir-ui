/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductPopup from '../components/ProductPopup';
import { getProducts, createProduct, updateProduct, deleteProduct, getUserProfile } from '../api/api';
import { isAuthenticated } from '../api/auth';
import { containerStyles } from './style';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated()) {
          const user = await getUserProfile();
          setIsAdmin(user.role === 'admin');
        }
        const data = await getProducts();
        setProducts(data || []);
      } catch (err) {
        setError(err.message || 'خطا در بارگذاری');
      }
    };
    fetchData();
  }, []);

  const handleSaveProduct = async (data) => {
    try {
      if (selectedProduct) {
        const updated = await updateProduct(selectedProduct.id, data);
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const newProduct = await createProduct(data);
        setProducts([...products, newProduct]);
      }
      setSelectedProduct(null);
      setShowAddPopup(false);
    } catch (err) {
      setError(err.message || 'خطا در ذخیره محصول');
    }
  };
  
  const handleDeleteProduct = async (id) => {
    if (window.confirm('آیا مطمئن هستید؟')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        setSelectedProduct(null);
      } catch (err) {
        setError(err.message || 'خطا در حذف محصول');
      }
    }
  };

  if (isAdmin === false) return <Navigate to="/products" />;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;

  return (
    <div css={containerStyles}>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">مدیریت محصولات</h1>
          <button
            onClick={() => setShowAddPopup(true)}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            افزودن محصول
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-right">نام</th>
                <th className="p-3 text-right">قیمت</th>
                <th className="p-3 text-right">اقدامات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.price.toLocaleString()} تومان</td>
                  <td className="p-3">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct(product.id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(selectedProduct || showAddPopup) && (
        <ProductPopup
          product={selectedProduct}
          onSave={handleSaveProduct}
          onDelete={selectedProduct ? handleDeleteProduct : null}
          onClose={() => {
            setSelectedProduct(null);
            setShowAddPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminProducts;