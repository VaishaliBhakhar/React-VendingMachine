/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import * as actions from './services/action';
import { MachineData } from './components/vendingMachine/VendingMachine';
// test('renders the component', () => {
//   const component = shallow(<App />);
//   expect(component).toMatchSnapshot();
// });

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('actions', () => {
  it('should create an action to load data', () => {
    const expectedAction = {
      type: actions.types.LOAD_DATA,
    };
    expect(actions.loadData()).toEqual(expectedAction);
  });
});

const productData = {
  name: 'Snikers',
  quantity: 2,
};
const bankData = [{
  coin: '10c',
  quantity: 8,
},
{
  coin: '20c',
  quantity: 25,
},
{
  coin: '50c',
  quantity: 5,
},
{
  coin: '$1',
  quantity: 11,
},
{
  coin: '$2',
  quantity: 15,
},
];
const data: MachineData = { product: productData, bank: bankData };
describe('actions', () => {
  it('should create an action to add a todo', () => {
    const expectedAction = {
      type: actions.types.UPDATE_DATA,
      data,
    };
    expect(JSON.stringify(actions.updateDatas(data))).toEqual(JSON.stringify(expectedAction));
  });
});
