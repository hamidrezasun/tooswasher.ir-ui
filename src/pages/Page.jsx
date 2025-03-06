/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getPageByName } from '../api/api';

const pageStyles = css`
  padding-top: 10rem; /* Increased to ensure content starts below navbar */
  min-height: 100vh;
  background-color: #f9fafb;
`;

const contentStyles = css`
  max-width: 7xl;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Page = () => {
  const { pageName } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const pageData = await getPageByName(pageName);
        setPage(pageData);
      } catch (err) {
        const errorMessage = err.detail
          ? typeof err.detail === 'string'
            ? err.detail
            : err.detail.msg || 'خطا در بارگذاری صفحه'
          : 'خطا در بارگذاری صفحه';
        setError(errorMessage);
      }
    };
    fetchPage();
  }, [pageName]);

  if (error) {
    return (
      <div css={pageStyles}>
        <Navbar />
        <div css={contentStyles} className="text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div css={pageStyles}>
        <Navbar />
        <div css={contentStyles} className="text-center">
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  return (
    <div css={pageStyles}>
      <Navbar />
      <div css={contentStyles}>
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: page.body || 'محتوایی برای نمایش وجود ندارد' }}
        />
      </div>
    </div>
  );
};

export default Page;