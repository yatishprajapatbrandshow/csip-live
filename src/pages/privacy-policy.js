import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Link from "next/link";

const BreadCrumb = [
    {
        name: "Privacy Policy",
        Link: "/privacy-policy",
    }
]

const PrivacyPolicy = () => {
    return (
        <>
            <Header />
            <section className="py-10">
                <div className="bg-purple-700 text-center py-10">
                    <h1 className="text-4xl text-white tracking-wide font-bold">Privacy Policy</h1>
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
                    <div className="border border-gray-200 p-4">
                        <ul className="space-y-4 text-gray-600">
                            <li>Federation Of Industrial Education operates the www.fieindia.org website, which provides the SERVICEs of Competitive Exam</li>
                            <li>This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</li>
                            <li>If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</li>
                            <li>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at, unless otherwise defined in this Privacy Policy.</li>
                        </ul>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Information Collection and Use</h2>
                            <ul className="space-y-4 text-gray-600">
                                <li>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Log Data</h2>
                            <ul className="space-y-4 text-gray-600">
                                <li>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Cookies</h2>
                            <ul className="space-y-5 text-gray-600">
                                <li>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer's hard drive.</li>
                                <li>Our website uses these "cookies" to collect information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Service Providers</h2>
                            <p className="mb-3">We may employ third-party companies and individuals due to the following reasons</p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>To facilitate our Service;</li>
                                <li>To provide the Service on our behalf;</li>
                                <li>To perform Service-related services; or</li>
                                <li>To assist us in analyzing how our Service is used.</li>
                            </ul>
                            <p className="mt-2">We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>
                        </div>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Security</h2>
                            <ul className="text-gray-600">
                                <li>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the Internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Links to Other Sites</h2>
                            <ul className="text-gray-600">
                                <li>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Children's Privacy</h2>
                            <ul className="text-gray-600">
                                <li>Our Services do not address anyone under the age of 18. We do not knowingly collect personal identifiable information from children under 18. In the case we discover that a child under 18 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Changes to This Privacy Policy</h2>
                            <ul className="text-gray-600">
                               <li>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mt-3 text-3xl font-semibold tracking-wide pb-2">Contact Us</h2>
                            <ul className="space-y-3 text-gray-600">
                                <li>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at info@fieindia.org</li>
                                <li>This Privacy Policy page was created at www.fieindia.org</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default PrivacyPolicy;