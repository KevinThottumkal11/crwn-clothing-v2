import Home from "./components/routes/home/home.component";
import { Routes, Route } from "react-router-dom";

// import Directory from './components/directory/directory.component';

// import './categories.styles.scss'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
  );
};

export default App;
