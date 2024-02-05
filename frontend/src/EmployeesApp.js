import React from 'react';
import { Provider } from 'react-redux';

// store stores all my states
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';

const EmployeesApp = () => {
   return (
      // Provider provides the child components with the information of the store
      <Provider store={store}>
         <AppRouter />
      </Provider>
   );
};

export default EmployeesApp;