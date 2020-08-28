import { types } from './action';
import { MachineData } from '../components/vendingMachine/VendingMachine';

type BankDataState = {
    machineData: MachineData;
}

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
const initialState: BankDataState = {
  machineData: { product: productData, bank: bankData },
};

export default function ReceiveDataReducer(state: BankDataState = initialState, action) {
  switch (action.type) {
    case types.LOAD_DATA:
      return {
        ...state,
        machineData: initialState.machineData,
      };
    case types.UPDATE_DATA:
      return {
        ...state,
        machineData: action.data,
      };
    default:
      return state;
  }
}
