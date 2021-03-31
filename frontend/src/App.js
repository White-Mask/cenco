import {React} from 'react';

import {Provider} from 'react-redux';
import {generateStore} from './redux/store';

// Archivo de rutas.
import {Router} from './Router';

export const App = () => {
  
  const store = generateStore()
  
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
export default App;