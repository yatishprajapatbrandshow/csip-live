import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Link from "next/link";

const BreadCrumb = [
    {
        name: "Contact",
        Link: "/contact",
    }
]

const Contact = () => {
    return (
        <>
            <Header />
            <section className=" py-10 bg-gray-100">
                <div className="bg-purple-700 text-center py-10">
                    <h1 className="text-4xl text-white tracking-wider font-bold">Contact Us</h1>
                    <div>
                        <ul className='mt-5 flex justify-center gap-2 text-gray-300'>
                            <li className="uppercase text-sm hover:text-gray-100"><Link href="/dashboard">Home</Link> </li>
                            {BreadCrumb?.map((item, index) => (
                                <li key={index} className={`before:content-['/'] before:pr-2 hover:text-gray-100 uppercase text-sm ${index === BreadCrumb.length - 1 ? 'font-semibold' : ''
                                    }`}><Link href={item.Link}>{item.name}</Link> </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto shadow-[rgba(13,_38,_76,_0.19)_0px_0px_10px] border border-gray-200 py-20 px-10">
                    <div className="">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Left side - Contact Form */}
                            <div className="bg-white shadow-md rounded-lg">
                                <div className="p-10">
                                    <form className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="Your name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="Your email"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                placeholder="Your phone number"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium mb-1">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                placeholder="Your message"
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Right side - Company Information */}
                            <div className="">
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex flex-col justify-center gap-2 items-center bg-blue-800 text-white rounded-2xl p-3 min-h-24">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="px-10 text-center text-lg">
                                                A-105, Logix Technova, Plot A-4 Sector-132, Noida (U.P.) 201304, India
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2 items-center bg-blue-800 text-white rounded-2xl p-3 min-h-24">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <p className="text-lg">+91 1234567890</p>
                                        </div>
                                        <div className="flex flex-col justify-center gap-2 items-center bg-blue-800 text-white rounded-2xl p-3 min-h-24">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-lg">info@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom - Google Maps */}
                        <div className="bg-white shadow-md rounded-lg">
                            <div className="p-0">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8445.507137187096!2d77.379339!3d28.508843!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceff90fecfd39%3A0x844ed4e10353408f!2sFederation%20of%20Industrial%20Education!5e1!3m2!1sen!2sin!4v1729680358482!5m2!1sen!2sin"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact;