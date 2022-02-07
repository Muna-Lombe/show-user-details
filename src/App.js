

//components
import { Navigation, UserInfo } from "./components";
import Container from "react-bootstrap/Container";



function App() {
  return (
    <div className="App">
      <Navigation />
      <Container>
        <UserInfo />
      </Container>
    </div>
  );
}

export default App;
