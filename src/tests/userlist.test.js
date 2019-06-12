import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import UserList from '../components/users/userlist.jsx';
import userReducer from '../reducers/userreducer';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;
let store;
it('renders without crashing', () => {
    store = setupStore();
    wrapper = mount(<Provider store={store}><UserList /></Provider>);
     expect(wrapper.find('AppContainer').find("a").text()).toEqual('Address Book');
});
function setupStore() {
    return createStore(
      combineReducers({ userReducer }),
      applyMiddleware(thunk)
    );
  }