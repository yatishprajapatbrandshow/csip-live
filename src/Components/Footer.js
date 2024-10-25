import { ChevronRight, Facebook, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='h-[37vh] max-sm:h-max bg-[#F2F2F5]  px-4 sm:px-8 md:px-20 lg:px-40 py-10'>
            <div className="w-full border-b-[1px] border-gray-600 py-2">
                <span className='flex font-medium text-sm text-gray-700 gap-2'>
                    <h5 className='font-medium text-sm text-gray-700'>Follow Us on</h5>
                    <Facebook width={20} height={20} />
                    <Linkedin width={20} height={20} />
                    <Twitter width={20} height={20} />

                </span>
            </div>
            <div className="py-6 flex justify-between max-sm:flex-col max-sm:gap-4">
                <ul>
                    <li className='flex gap-1 text-sm font-medium text-gray-800'><ChevronRight width={15} /><Link href="/about">About</Link></li>
                    <li className='flex gap-1 text-sm font-medium text-gray-800'><ChevronRight width={15} /><Link href="/contact">Contact</Link></li>
                    <li className='flex gap-1 text-sm font-medium text-gray-800'><ChevronRight width={15} /><Link href="/refund-policy">Refund Policy</Link></li>
                    <li className='flex gap-1 text-sm font-medium text-gray-800'><ChevronRight width={15} /><Link href="/privacy-policy">Privacy Policy</Link></li>
                    <li className='flex gap-1 text-sm font-medium text-gray-800'><ChevronRight width={15} /><Link href="/terms-and-condition">Term and Conditions</Link></li>
                </ul>
                <div className="flex flex-col justify-between gap-2 max-sm:gap-1 max-sm:px-0 max-sm:w-full text-base font-medium text-gray-800  w-[60%] pr-10">
                    <h3>Get In Touch</h3>
                    <h6>Address: A-105, Logix Technova, Plot A-4 Sector-132, Noida (U.P.) 201304, India</h6>
                    <h6>Phone: +91 120-424-1617</h6>
                    <h6>Email: info@fieindia.org</h6>
                </div>
            </div>
            <div className='text-gray-900 font-semibold'><span className='text-gray-600 font-normal'>FIE © 2024 created by </span> BrandShow</div>
        </div>
    )
}

export default Footer