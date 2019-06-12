import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';

import App from '../App';

const initialState = {}; 
const mockStore = configureStore();
let wrapper;
let store;
it('renders without crashing', () => {
  const div = document.createElement('div');
  store = mockStore(initialState);
  wrapper = shallow(<App store={store}/>);
});