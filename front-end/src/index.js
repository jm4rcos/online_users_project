import React from "react";
import App from "./App";
import ReactDOM from "react-dom";

window.renderDOM = ({ usr, id }) => {
  ReactDOM.render(
    <React.Fragment>
      <App usr={usr} pageID={id}/>
    </React.Fragment>,
    document.getElementById("onlineUsers")
  );
};

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
