import Address from './address';

export default interface Customer {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  addresses: Address[];
}
