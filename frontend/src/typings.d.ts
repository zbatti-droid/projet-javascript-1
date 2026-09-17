interface Product {

  id: string;

  title: string;

  image: string;

  category: string;

  price: number;

  popularity: number;

  stock: number;

}



interface ProductInCart extends Product {

  id: string;

  productId: string;

  quantity: number;

  size: string;

  color: string;

}



interface User {

  id: string;

  name: string;

  lastname: string;

  email: string;

  role: "USER" | "ADMIN";

}



interface Order {

  id: string;


  customer: {

    firstName: string;

    lastName: string;

    phone: string;

    city: string;

    address: string;

    note?: string;

    email?: string;

  };



  products: ProductInCart[];



  subtotal: number;


  shipping: number;


  total: number;



  paymentMethod: string;



  createdAt: string;



  orderStatus?: string;

  whatsappNotification?: "sent" | "skipped" | "failed";

}
