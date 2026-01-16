// import React,{useId} from 'react'

// function Select({
//     options,
//     label,
//     className = "",
//     ...props
// }, ref) {
//     const id = useId()

//   return (
//     <div className='w-full'>
//         {lable && <lable htmlFor = {id} className = '' ></lable>}
//         <select
//         {...props}
//         id = {id}
//         ref= {ref}
//         className= {`px-3 py-2 rounded-lg bg-white text-black outline-none
//          focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//          >
//             {options?.map((option) => (
//                 <option key={option} value={option}>
//                     {option}
//                 </option>
//             ))}

//         </select>
//         </div>
//   )
// }

// export default React.forwardRef(Select)

import React, { useId } from 'react'

function Select({
    options,
    label, // FIX 1: Spelling must be 'label' to match PostForm
    className = "",
    ...props
}, ref) {
    const id = useId()

  return (
    <div className='w-full'>
        {/* FIX 2: Use <label> tag and put {label} inside it */}
        {label && <label htmlFor={id} className=''>{label}</label>} 
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => (
                // FIX 3: Ensure this is <option>, not <opption>
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)