import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Link from "next/link";

const BreadCrumb = [
    {
        name: "Return and Refund Policy",
        Link: "/refund-policy",
    }
]

const RefundPolicy = () => {
    return (
        <>
            <Header />
            <section className="py-10">
                <div className="bg-purple-700 text-center py-10">
                    <h1 className="text-4xl text-white tracking-wide font-bold">Return and Refund Policy</h1>
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
                <div className="max-w-6xl mx-auto shadow-[rgba(13,_38,_76,_0.19)_0px_0px_10px] border border-gray-200 py-20 px-10">
                    <p className="border border-gray-200 p-4">Thanks for your registration at National management Olympiad 2020's website www.managementolympiad.org.</p>
                    <div className="border border-gray-200 p-4">
                        <h2 className="text-3xl font-semibold tracking-wider pb-3">REFUND</h2>
                        <ul className="space-y-4 text-gray-600">
                            <li>Any candidate is eligible for refund until approval of registration request, After Approval Or 3 Days from Registration date, No refund request will be processed.</li>
                            <li>Once we receive your refund Request. We will immediately notify you on the status of your refund after reviewing your case.</li>
                            <li>If your return is approved, we will initiate a refund to your credit card (or original method of payment).</li>
                            <li>You will receive the credit within a certain amount of days, depending on your card issuer's policies.</li>
                            <li>If your registration is being denied by NMO 2019 Committee, then you will get full refund.</li>
                        </ul>
                    </div>
                    <div className="border border-gray-200 p-4">
                        <h2 className="text-3xl font-semibold tracking-wider pb-3">CONTACT US</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li>If you have any questions on how to return your item to us, contact us.</li>
                            <li><strong>Email id:</strong> info@managementolympiad.org</li>
                            <li><strong>Contact Number:</strong> +91 120 424 1617</li>
                            <li><strong>Postal Address Noida:</strong> A-105, Logix Technova, Plot A-4 Sector-132, Noida (U.P.), India</li>
                            <li><strong>Postal Address Pune:</strong> Federation of Industrial Education, 4th Floor, Marisoft 3, Marigold, EFC Business Center Kalyani Nagar Pune-411014</li>
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default RefundPolicy;