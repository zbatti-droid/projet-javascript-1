import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";



type CartState = {

  productsInCart: ProductInCart[];

  subtotal: number;

};



const initialState: CartState = {

  productsInCart: [],

  subtotal: 0,

};





export const cartSlice = createSlice({

  name: "cart",

  initialState,


  reducers: {



    addProductToTheCart: (

      state,

      action: PayloadAction<ProductInCart>

    ) => {



      const existingProduct =
        state.productsInCart.find(
          (product) =>
            product.id === action.payload.id
        );




      if(existingProduct){


        existingProduct.quantity +=
          action.payload.quantity;



      } else {



        state.productsInCart.push(
          action.payload
        );


      }



      state.subtotal =
        state.productsInCart.reduce(

          (total, product) =>

            total +
            product.price *
            product.quantity,

          0

        );



    },








    removeProductFromTheCart: (

      state,

      action: PayloadAction<{id:string}>

    ) => {



      state.productsInCart =
        state.productsInCart.filter(

          (product)=>
            product.id !== action.payload.id

        );




      state.subtotal =
        state.productsInCart.reduce(

          (total, product)=>

            total +
            product.price *
            product.quantity,

          0

        );



    },









    updateProductQuantity: (

      state,

      action: PayloadAction<{
        id:string;
        quantity:number;
      }>

    ) => {



      state.productsInCart =
        state.productsInCart.map(

          (product)=>{


            if(
              product.id === action.payload.id
            ){


              return {

                ...product,

                quantity:
                  action.payload.quantity > 0
                  ? action.payload.quantity
                  : 1,

              };


            }



            return product;


          }

        );





      state.subtotal =
        state.productsInCart.reduce(

          (total, product)=>

            total +
            product.price *
            product.quantity,

          0

        );



    },








    calculateTotalPrice:(state)=>{


      state.subtotal =
        state.productsInCart.reduce(

          (total, product)=>

            total +
            product.price *
            product.quantity,

          0

        );


    },







    clearCart:(state)=>{


      state.productsInCart = [];

      state.subtotal = 0;


    },



  },

});





export const {

  addProductToTheCart,

  removeProductFromTheCart,

  updateProductQuantity,

  calculateTotalPrice,

  clearCart,

} = cartSlice.actions;




export default cartSlice.reducer;