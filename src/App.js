import { ResultContextProvider } from "./contexts/resultContext.js";
import Wrapper from "./components/Wrapper.jsx";
import Header from "./components/Header/Header.jsx";
import { Footer } from "./components/Footer/Footer.jsx";


function App() {
  return (
    <>
      <main className="main">
        <ResultContextProvider>
          <Wrapper>
            <Header />
          </Wrapper>

          <Wrapper>
            <Footer />
          </Wrapper>
        </ResultContextProvider>
      </main>
    </>
  );
}

export default App;
