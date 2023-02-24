import './App.css';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, { persistor } from './store'
import {BrowserRouter} from "react-router-dom";
import Theme from "./components/template/Theme";
import history from './history'
import Layout from "./components/layout";

function App() {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter history={history}>
               <Theme>
                  <Layout/>
               </Theme>
            </BrowserRouter>
         </PersistGate>
      </Provider>
   );
}

export default App;
