// import React from "react";
// import App from "./App";
// import ReactDOM from "react-dom";

// window.renderDOM = ({ usr }) => {
//   ReactDOM.render(
//     <React.Fragment>
//       <App usr={usr} />
//     </React.Fragment>,
//     document.getElementById("onlineUsers")
//   );
// };

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
