import React, { useState } from "react";
import OnlineUsers from "./components/OnlineUsers";

function App(props) {
  const [usr, setUsr] = useState(
    props.usr !== undefined ? props.usr : "user test"
  );
  console.log("React props: ", usr);

  return (
    <div className="App">
      <OnlineUsers username={usr} />
    </div>
  );
}

export default App;
