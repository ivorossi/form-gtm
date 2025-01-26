import React from 'react';
import Form from './components/Form/Form';

const App: React.FC = () => {
  const apiEndpoint = 'TU_API_ENDPOINT'; 

return (
    <div>
      <h1>Form Test Tag Manager</h1>
      <Form apiEndpoint={apiEndpoint} />
    </div>
  );
};

export default App;
