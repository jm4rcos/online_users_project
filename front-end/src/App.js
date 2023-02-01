import React, { useState } from "react";
import OnlineUsers from "./components/OnlineUsers";

function App(props) {
  const [usr, setUsr] = useState(
    props.usr !== undefined ? props.usr : "user test"
  );
  const [pageID, setPageID] = useState(
    props.pageID !== undefined ? props.pageID : 0
  );
  console.log("React props: ", props.usr, props.pageID);

  return (
    <div className="App">
      <OnlineUsers username={usr} pageID={pageID} />
    </div>
  );
}

export default App;
