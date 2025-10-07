export type ApiData={
    success:boolean,
    data:Product[]
}
export type Product={
    _id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    createdAt: string;
}
export type RegisterData={
    name?:string,
    email:string,
    password:string
}
