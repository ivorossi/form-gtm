import React from 'react';
import Form from './components/Form/Form';

const App: React.FC = () => {
  const apiEndpoint = 'https://kaniuleads-api-913425272782.us-central1.run.app/data'; 

return (
    <div>
      <h1>Form Test Tag Manager</h1>
      <Form apiEndpoint={apiEndpoint} />
    </div>
  );
};

export default App;
