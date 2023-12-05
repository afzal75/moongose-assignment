

export type FullName= {
    firstName: string,
    lastName: string
}

export type Adress = {
    street: string,
    city: string,
    country: string
}


export type Orders = 
  {
    productName: string,
    price: number,
    quantity: number
  }



export type UsersInterface = {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Adress;
  orders?: Orders[];
};
