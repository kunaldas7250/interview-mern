// // import React from 'react';
// import React, { Suspense, lazy } from "react";
// 


import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ErrorBoundry from "./Lazy Loading Class Component/ErrorBoundry"
// ✅ Lazy load the Api component correctly
// const LazyApi = lazy(() => import("./Api asncy Pratice/Api"));
// const LazyApi = lazy(() => import("./ImageSlider/ImageSlider"));
// const LazyApi = lazy(() => import("./Load more button from api call/LoadMore"));
// const LazyApi = lazy(() => import("./Light and Dark Theme/LightAndDarkTheme"));
// const LazyApi = lazy(() => import("./Load more button from api call/InfintiScoloring"));
// const LazyApi = lazy(() => import("./javascipt/SearchFilter"));
// const LazyApi = lazy(() => import("./javascript/Pagination_list_Of_iteam"));
// const LazyApi = lazy(() => import("./change button color/Change_color_button"));
// const LazyApi = lazy(() => import("./change button color/FocusInput"));
// const LazyApi = lazy(() => import("./Implementing a pop-up component/Model"));
// const LazyApi = lazy(() => import("./simple to do app add delete function/todo"));
// const LazyApi = lazy(() => import("./Drag and Drop/Dragdrop"));
// const LazyApi = lazy(() => import("./Redux/IncrementDecrement"));
// const LazyApi = lazy(() => import("./windows popup/windowpop"));
// const LazyApi = lazy(() => import("./usecontext/Parent"));
// const LazyApi = lazy(() => import("./AddUpdateDelte/MainPage"));
// const LazyApi = lazy(() => import("./Framer Motion/StagerAnimation"));
// const LazyApi = lazy(() => import("./Express pagination/SimplePagination"));
const LazyApi = lazy(() => import("../src/linkdin blog/Pages/AllRoute"));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundry>
    <Suspense fallback={<h3 style={{color:"grey"}}>Loading</h3>}>
      <LazyApi />
    </Suspense>
    </ErrorBoundry>
  </React.StrictMode>
);

reportWebVitals();
