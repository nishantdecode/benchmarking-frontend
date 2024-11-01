# Benchmarking | Financial Data Visualisation Tool
![View Count Badge](https://img.shields.io/badge/views-100%2B-brightgreen)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-nishantdecode-blue)](https://linkedin.com/in/nishantdecode)

A powerful data visualization tool designed for financial insights across 10+ banks and over 15 years of data. Built with a microservices backend architecture and a Next.js frontend with Redux for state management.

> **Note**: The render server might be slow at times, so please allow a few moments for data to load.

## Demo Video

[![Demo Video](https://i.ibb.co/bQ9Tk71/Benchmarking.png)](https://drive.google.com/file/d/11evRlxiQ7OI4-8sgEtPDMyIx1XqFS2jg/view?usp=sharing)

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Learn More](#learn-more)

## Description

Benchmarking is a comprehensive financial data visualization tool that supports:
- Visualization of historical financial data.
- Micro-services based architecture for modular, scalable backend.
- Responsive and interactive UI with advanced charting and filtering capabilities.

## Technologies Used

### Frontend
- **Framework**: Next.js, React
- **State Management**: Redux
- **UI Components**: Tailwind CSS, Radix UI, Cloudinary
- **Charting & Data Export**: Chart.js, `react-chartjs-2`, `xlsx`, `pdf-lib`
  
### Backend
- **Framework**: Express
- **Database**: MongoDB
- **Security**: JWT, Helmet, Bcrypt
- **Inter-service Communication**: RabbitMQ
- **Miscellaneous**: Winston for logging, Multer for File handling, Nodemailer for notifications

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
