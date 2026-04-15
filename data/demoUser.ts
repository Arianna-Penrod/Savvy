import { Double } from "react-native/Libraries/Types/CodegenTypes";

export type ShoppingListItem = {
  name: string;
  quantity: number;
};

export type UserLocation = {
  lat: number;
  long: number;
};

export type user = {
  userID: string;
  list: ShoppingListItem[];
  location: UserLocation;
  radiusMiles: number;
};

export const users: user[] = [
    {
        userID: "1", // the user id
        list: [
            { name: "Apples", quantity: 2 },
            { name: "Milk", quantity: 1 }
        ],
        location: { lat: 0, long: 0 }
        ,
        radiusMiles: 10.3,

    }
];