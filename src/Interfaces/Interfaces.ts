export interface ICar {
    id: number;
    title: string;
    description: string;
    price: number;
    type: string;
    photo: string;
    is_published: boolean;
}

export interface IUser {
    [x: string]: any;
    name: string;
    email: string;
    balance: number;
    photo: string;
    products: ICar[];
}

export interface IActionUser {
    user: IUser,
    token: string
}

export interface IRegister {
    name: string;
    email: string;
    password: string
}

