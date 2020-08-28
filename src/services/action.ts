import { MachineData } from '../components/vendingMachine/VendingMachine';

export const types = {
  LOAD_DATA: 'LOAD_DATA',
  UPDATE_DATA: 'UPDATE_DATA',
};

export function updateDatas(data: MachineData) {
  return {
    type: types.UPDATE_DATA,
    data,
  };
}

export function loadData() {
  return {
    type: types.LOAD_DATA,
  };
}
