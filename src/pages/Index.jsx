/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Navbar from '../components/Navbar';

const heroStyles = css`
  background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6rem; /* Adjusted for taller navbar */
`;

const Index = () => {
  return (
    <>
      <Navbar />
      <section css={heroStyles} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            به طوس واشر خوش آمدید
          </h1>
          <p className="text-lg md:text-xl mb-6">
            بهترین راه‌حل برای نیازهای صنعتی شما
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200">
            بیشتر بدانید
          </button>
        </div>
      </section>
    </>
  );
};

export default Index;