/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const popupStyles = css`
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30;
`;

const formStyles = css`
  @apply bg-white p-6 rounded-lg shadow-lg w-full max-w-md;
`;

const ProductPopup = ({ product, onSave, onDelete, onClose }) => {
  const [formData, setFormData] = useState(product || { name: '', price: '', description: '', image: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, price: parseFloat(formData.price) });
  };

  return (
    <div css={popupStyles}>
      <div css={formStyles}>
        <h2 className="text-xl font-bold mb-4 text-gray-800">{product ? 'ویرایش محصول' : 'افزودن محصول'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="نام محصول"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="قیمت"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="توضیحات"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="لینک تصویر"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition">
              ذخیره
            </button>
            {product && (
              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              >
                حذف
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
            >
              لغو
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPopup;