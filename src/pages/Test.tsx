import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="App">
      {/* Other components */}
      <Footer githubUrl="https://github.com/yourprofile" email="your.email@example.com" />
    </div>
  );
}

export default App;
