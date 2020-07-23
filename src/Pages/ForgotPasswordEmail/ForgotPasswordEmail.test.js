import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ForgotPasswordEmail from './ForgotPasswordEmail';

//Check if app will crash or not 
//Adds URL to memory
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ForgotPasswordEmail/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
