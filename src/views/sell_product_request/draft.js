// import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
// import { ColorChooser, ImageLoader, MessageDisplay } from '@/components/common';
// import { RequestLine } from '@/components/sell_product_request';
// import { ProductShowcaseGrid } from '@/components/product';
// import { WAREHOUSE, SHOP } from '@/constants/routes';
// import { displayMoney } from '@/helpers/utils';
// import {
//   useDocumentTitle,
//   useSellProductRequest,
//   useWarehouseProducts,
//   useScrollTop,
// } from '@/hooks';
// import React, { useEffect, useRef, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import Select from 'react-select';
// import bannerImg from '@/images/banner-girl-1.png';

// const Request = () => {
//   useDocumentTitle('Request | Spachy');
//   useScrollTop();

//   const {
//     requests,
//     fetchRequests,
//     isLoading,
//     error
//   } = useSellProductRequest();
//   console.log(requests)

//   return (
//     <main className="content">
//       <div className="featured">
//         <div className="banner">
//           <div className="banner-desc">
//             <h1>Register Product Request</h1>
//           </div>
//           <div className="banner-img">
//             <img src={bannerImg} alt="" />
//           </div>
//         </div>
//         <div className="display">
//           <div className="product-display-grid">
//             {/* {(error && !isLoading) ? (
//               <MessageDisplay
//                 message={error}
//                 action={fetchRequests}
//                 buttonLabel="Try Again"
//               />
//             ) : (
//               <RequestLine
//                 request={requests}
//                 skeletonCount={6}
//               />
//             )} */}
//             {(error && !isLoading) ? (
//               <MessageDisplay
//                 message={error}
//                 action={fetchRequests}
//                 buttonLabel="Try Again"
//               />
//             ) : (
//               <ProductShowcaseGrid
//                 products={requests}
//                 skeletonCount={6}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Request;
