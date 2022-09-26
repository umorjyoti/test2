import React from 'react';
import {AuthProvider} from './src/Auth/AuthenticationProvider';
import Provider from './src/navigator';

const App = () => {
  return (
    <AuthProvider>
      <Provider />
    </AuthProvider>
  );
};

export default App;
