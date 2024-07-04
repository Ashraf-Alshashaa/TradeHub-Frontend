export interface Address {
    id: number;
    street_name: string;
    city: string;
    country: string;
    postcode: string;
    house_number: number;
    default: boolean;
}


export interface AddressState {
    all_addresses: Address [];
    address: Address | null;
    loading: boolean;
    error: {detail: string} | null;
  }