import type { InputHTMLAttributes } from "react";

const QuantityInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input type="number" { ...props } className="w-full h-10 bg-white indent-2 outline-none border-black/30 border text-black/70" placeholder="Enter product quantity" />
  )
}
export default QuantityInput
