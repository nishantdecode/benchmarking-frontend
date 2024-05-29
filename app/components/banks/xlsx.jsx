// components/AsyncXLSXLoader.js
import Script from 'next/script';

const AsyncXLSXLoader = () => (
  <Script
    src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"
    strategy="beforeInteractive"
    onLoad={() => {
      window.XLSX = XLSX; // Ensure XLSX is available globally
    }}
  />
);

export default AsyncXLSXLoader;
