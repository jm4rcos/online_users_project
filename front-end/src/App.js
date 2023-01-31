import OnlineUsers from "./components/OnlineUsers";

function App(usr) {
  console.log("App in React props: ", usr);
  return (
    <div className="App">
      <OnlineUsers username={usr} />
    </div>
  );
}

export default App;
