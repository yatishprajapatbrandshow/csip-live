import React from 'react'
function SmallFooter() {
    return (
        <div className='bg-[#F0F0F0] h-20 w-full flex justify-center items-center max-lg:flex-wrap max-lg:gap-5 gap-10 '>
            <span>FIE © 2024 created by <a
                className="text-[#4E54C8] hover:text-[#666ef7]"
                href="https://www.brandshow.in/"
                target="_blank"
                rel="noopener noreferrer"
            >
                BrandShow
            </a></span>
            <button className='text-[#4E54C8] hover:text-[#666ef7] font-medium'>Contact</button>
            <button className='text-[#4E54C8] hover:text-[#666ef7] font-medium'>Refund Policy</button>
            <button className='text-[#4E54C8] hover:text-[#666ef7] font-medium'>Privacy Policy</button>
            <button className='text-[#4E54C8] hover:text-[#666ef7] font-medium'>Terms and Conditions</button>
            <button className='text-[#4E54C8] hover:text-[#666ef7] font-medium'>About</button>
        </div>
    )
}   

export default SmallFooter
