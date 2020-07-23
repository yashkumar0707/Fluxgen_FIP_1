import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ForgotPasswordOTP from './ForgotPasswordOTP';


//Check if app will crash or not 
//Adds URL to memory
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ForgotPasswordOTP/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
