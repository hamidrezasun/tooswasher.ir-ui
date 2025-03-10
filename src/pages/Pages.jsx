/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getPages } from '../api/api';
import { containerStyles } from './style';

const Pages = () => {
  const { pageName } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const pages = await getPages();
        const decodedPageName = decodeURIComponent(pageName);
        console.log('Decoded page name from URL:', decodedPageName);
        console.log('All pages from API:', pages);
        const foundPage = pages.find((p) => p.name.replace(/\s+/g, '-') === decodedPageName);
        console.log('Found page from list:', foundPage);
        if (foundPage) {
          // Fetch the full page with body using the page ID
          const fullPage = await (await fetch(`http://192.168.1.37:8000/pages/${foundPage.id}/`)).json();
          console.log('Full page with body:', fullPage);
          setPage(fullPage);
        } else {
          setError('صفحه یافت نشد');
        }
      } catch (err) {
        setError(err.message || 'خطا در بارگذاری صفحه');
        console.error('Error fetching page:', err);
      }
    };
    fetchPageData();
  }, [pageName]);

  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;
  if (!page) return <div className="text-center mt-20">در حال بارگذاری...</div>;

  return (
    <div css={containerStyles} className="debug-border">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{page.name}</h1>
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: page.body || '<p>محتوایی برای این صفحه تعریف نشده است.</p>' }}
        />
        {Array(20).fill().map((_, index) => (
          <p key={index} className="text-gray-600 mt-4">
            این یک متن آزمایشی برای تست اسکرول است.
          </p>
        ))}
      </div>
    </div>
  );
};

export default Pages;