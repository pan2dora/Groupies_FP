
const Button= (props)=>{
return (
    <button className =' bg-white-600 text-black font-[Poppins] py-1 w-20 rounded md:ml-9 hover:bg-orange-100 duration-500'>
        {props.children}
    </button>
)
}
export default Button;