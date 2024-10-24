import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Link from "next/link";

const BreadCrumb = [
    {
        name: "Terms and Condition",
        Link: "/term-and-condition",
    }
]

const TermAndCondition = () => {
    return (
        <>
            <Header />
            <section className="py-10">
                <div className="bg-purple-700 text-center py-10">
                    <h1 className="text-4xl text-white tracking-wide font-bold">Terms and Condition</h1>
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
                <div className="max-w-6xl mx-auto shadow-[rgba(13,_38,_76,_0.19)_0px_0px_10px] border border-gray-200 py-20 px-5">
                    <div className="border border-gray-200 p-4">
                        <h2  className="text-3xl font-semibold tracking-wider pt-4 pb-2">Introduction</h2>
                        <p className="mb-3">1. These terms and conditions shall govern your use of our website.</p>
                        <ul className="space-y-4 pl-5">
                            <li>1.1. By using our website, you accept these terms and conditions in full; accordingly, if you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website.</li>
                            <li>1.2. If you [register with our website, submit any material to our website or use any of our website services], we will ask you to expressly agree to these terms and conditions.</li>
                            <li>1.3. You must be at least [18] years of age to use our website; by using our website or agreeing to these terms and conditions, you warrant and represent to us that you are at least [18] years of age.</li>
                            <li>1.4. Our website uses cookies; by using our website or agreeing to these terms and conditions, you consent to our use of cookies in accordance with the terms of our [privacy and cookies policy].</li>
                        </ul>

                        <h2  className="text-3xl font-semibold tracking-wider pt-6 pb-2">2. Licence to use website</h2>
                        <p className="pl-4">2.1. You may:</p>
                        <ul className="my-5 list-disc pl-8 list-inside">
                            <li>view pages from our website in a web browser;</li>
                            <li>download pages from our website for caching in a web browser;</li>
                            <li>print pages from our website;</li>
                            <li>[stream audio and video files from our website]; and</li>
                            <li>[use [our website services] by means of a web browser], subject to the other provisions of these terms and conditions.</li>
                        </ul>
                        <p className="pl-4">
                            2.2. Except as expressly permitted by the provisions of these terms and conditions, you must not download any material from our website or save any such material to your computer.
                        </p>
                        <p className="pl-4">2.3. You may only use our website for [your own personal and business purposes], and you must not use our website for any other purposes.</p>
                        <p className="pl-4">
                            2.4. Except as expressly permitted by these terms and conditions, you must not edit or otherwise modify any material on our website.
                        </p>
                        <p className="pl-4">2.5. Unless you own or control the relevant rights in the material, you must not:</p>
                        <ul className="my-5 pl-8 list-disc list-inside">
                            <li>republish material from our website (including republication on another website);</li>
                            <li>sell, rent or sub-license material from our website;</li>
                            <li>show any material from our website in public;</li>
                            <li>exploit material from our website for a commercial purpose; or</li>
                            <li>redistribute material from our website.</li>
                        </ul>
                        <p className="pl-4">
                            2.6. We reserve the right to restrict access to areas of our website, or indeed our whole website, at our discretion; you must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction measures on our website.
                        </p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">3. Acceptable use</h2>
                        <p className="pl-4">3.1. You must not:</p>
                        <ul className="my-5 list-disc pl-8 list-inside">
                            <li>use our website in any way or take any action that causes, or may cause, damage to the website or impairment of the performance, availability or accessibility of the website;</li>
                            <li>use our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity;</li>
                            <li>use our website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software;</li>
                            <li>[conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to our website without our express written consent];</li>
                            <li>[access or otherwise interact with our website using any robot, spider or other automated means[, except for the purpose of [search engine indexing]]];</li>
                            <li>[violate the directives set out in the robots.txt file for our website]; or</li>
                            <li>[use data collected from our website for any direct marketing activity (including without limitation email marketing, SMS marketing, telemarketing and direct mailing)].</li>
                        </ul>
                        <p className="pl-4">3.2. You must not use data collected from our website to contact individuals, companies or other persons or entities.</p>
                        <p className="pl-4">3.3. You must ensure that all the information you supply to us through our website, or in relation to our website, is [true, accurate, current, complete and non-misleading].</p>

                        <h2 className="text-3xl font-semibold tracking-wider pt-8 pb-2">4. Registration and accounts</h2>
                        <p className="pl-4">
                            4.1. You may register for an account with our website by [completing and submitting the account registration form on our website, and submitting OTP shared on your Registered Mobile Number].
                        </p>
                        <p className="pl-4">4.2. You must not allow any other person to use your account to access the website.</p>
                        <p className="pl-4">4.3. You must notify us in writing immediately if you become aware of any unauthorized use of your account.</p>
                        <p className="pl-4">4.4. You must not use any other person's account to access the website[, unless you have that person's express permission to do so].</p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">5. User login details</h2>
                        <p className="pl-4">5.1. If you register for an account with our website, [we will provide you with] OR [you will be asked to choose] [a user ID and password].</p>
                        <p className="pl-4">Your user ID must not be liable to mislead; you must not use your account or user ID for or in connection with the impersonation of any person.</p>
                        <p className="pl-4">You must keep your password confidential.</p>
                        <p className="pl-4">
                            You must notify us in writing immediately if you become aware of any disclosure of your password.
                        </p>
                        <p className="pl-4">
                            You are responsible for any activity on our website arising out of any failure to keep your password confidential, and may be held liable for any losses arising out of such a failure.
                        </p>
                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">6. Cancellation and suspension of account</h2>
                        <p className="pl-4">6.1. We may:</p>
                        <ul className="my-5 list-disc pl-8 list-inside">
                            <li>[suspend your account];</li>
                            <li>[cancel your account]; and/or</li>
                            <li>[edit your account details],</li>
                        <p>at any time in our sole discretion without notice or explanation.</p>
                        </ul>
                        <p className="pl-4">6.2. You may cancel your account by sending an email to info@fieindia.org</p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">7. Your content: license</h2>
                        <p className="pl-4">
                            7.1. In these terms and conditions, "your content" means [all works and materials (including without limitation text, graphics, images, audio material, video material, audio-visual material, scripts, software and files) that you submit to us or our website for storage or publication on, processing by, or transmission via, our website].
                        </p>
                        <p className="pl-4">
                            7.2. You grant to us a [worldwide, irrevocable, non-exclusive, royalty-free licence] to [use, reproduce, store, adapt, publish, translate and distribute your content in any existing or future media] OR [reproduce, store and publish your content on and in relation to this website and any successor website] OR [reproduce, store and, with your specific consent, publish your content on and in relation to this website].
                        </p>
                        <p className="pl-4">
                            7.3. You hereby waive all your moral rights in your content to the maximum extent permitted by applicable law; and you warrant and represent that all other moral rights in your content have been waived to the maximum extent permitted by applicable law.
                        </p>
                        <p className="pl-4">7.4. You may edit your content to the extent permitted using the editing functionality made available on our website.</p>
                        <p className="pl-4">
                            7.5. Without prejudice to our other rights under these terms and conditions, if you breach any provision of these terms and conditions in any way, or if we reasonably suspect that you have breached these terms and conditions in any way, we may delete, unpublish or edit any or all of your content.
                        </p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">8. Your content: rules</h2>
                        <p className="pl-4">8.1. You warrant and represent that your content will comply with these terms and conditions.</p>
                        <p className="pl-4">Your content must not be illegal or unlawful, must not infringe any person's legal rights, and must not be capable of giving rise to legal action against any person (in each case in any jurisdiction and under any applicable law).</p>
                        <p className="pl-4">8.2. Your content, and the use of your content by us in accordance with these terms and conditions, must not:</p>
                        <ul className="my-5 list-disc pl-8 list-inside">
                            <li>be libellous or maliciously false;</li>
                            <li>be obscene or indecent;</li>
                            <li>infringe any copyright, moral right, database right, trade mark right, design right, right in passing off, or other intellectual property right;</li>
                            <li>infringe any right of confidence, right of privacy or right under data protection legislation;</li>
                            <li>constitute negligent advice or contain any negligent statement;</li>
                            <li>constitute an incitement to commit a crime[, instructions for the commission of a crime or the promotion of criminal activity];</li>
                            <li>be in contempt of any court, or in breach of any court order;</li>
                            <li>be in breach of racial or religious hatred or discrimination legislation;</li>
                            <li>be blasphemous;</li>
                            <li>be in breach of official secrets legislation;</li>
                            <li>be in breach of any contractual obligation owed to any person;</li>
                            <li>[depict violence[ in an explicit, graphic or gratuitous manner]];</li>
                            <li>[be pornographic[, lewd, suggestive or sexually explicit]];</li>
                            <li>[be untrue, false, inaccurate or misleading];</li>
                            <li>[consist of or contain any instructions, advice or other information which may be acted upon and could, if acted upon, cause illness, injury or death, or any other loss or damage];</li>
                            <li>[constitute spam];</li>
                            <li>[be offensive, deceptive, fraudulent, threatening, abusive, harassing, anti-social, menacing, hateful, discriminatory or inflammatory]; or</li>
                            <li>[cause annoyance, inconvenience or needless anxiety to any person].</li>
                        </ul>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">9. Limited warranties</h2>
                        <p className="pl-4">9.1. We do not warrant or represent:</p>
                        <ul className="my-5 list-disc pl-8 list-inside">
                            <li>the completeness or accuracy of the information published on our website;</li>
                            <li>that the material on the website is up to date; or</li>
                            <li>that the website or any service on the website will remain available.</li>
                        </ul>
                        <p className="pl-4">
                            9.2. We reserve the right to discontinue or alter any or all of our website services, and to stop publishing our website, at any time in our sole discretion without notice or explanation; and save to the extent expressly provided otherwise in these terms and conditions, you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any website services, or if we stop publishing the website.
                        </p>
                        <p className="pl-4">
                            9.3. To the maximum extent permitted by applicable law, we exclude all representations and warranties relating to the subject matter of these terms and conditions, our website and the use of our website.
                        </p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">10. Breaches of these terms and conditions</h2>
                        <p className="pl-4">
                            10.1. Without prejudice to our other rights under these terms and conditions, if you breach these terms and conditions in any way, or if we reasonably suspect that you have breached these terms and conditions in any way, we may:
                        </p>
                        <ul className="my-5 list-disc pl-8 list-inside">
                            <li>send you one or more formal warnings;</li>
                            <li>Temporarily suspend your access to our website;</li>
                            <li>Permanently prohibit you from accessing our website;</li>
                            <li>[Block computers using your IP address from accessing our website];</li>
                            <li>[Contact any or all of your Internet service providers and request that they block your access to our website];</li>
                            <li>Commence legal action against you, whether for breach of contract or otherwise; and/or</li>
                            <li>[Suspend or delete your account on our website].</li>
                        </ul>
                        <p className="pl-4">
                            10.2. Where we suspend or prohibit or block your access to our website or a part of our website, you must not take any action to circumvent such suspension or prohibition or blocking[ (including without limitation [creating and/or using a different account])].
                        </p>
                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">11. Variation</h2>
                        <p className="pl-4">11.1. We may revise these terms and conditions from time to time.</p>
                        <p className="pl-4">
                            11.2. [The revised terms and conditions shall apply to the use of our website from the date of publication of the revised terms and conditions on the website, and you hereby waive any right you may otherwise have to be notified of, or to consent to, revisions of these terms and conditions.] OR [We will give you written notice of any revision of these terms and conditions, and the revised terms and conditions will apply to the use of our website from the date that we give you such notice; if you do not agree to the revised terms and conditions, you must stop using our website.]
                        </p>
                        <p className="pl-4">
                            11.3. If you have given your express agreement to these terms and conditions, we will ask for your express agreement to any revision of these terms and conditions; and if you do not give your express agreement to the revised terms and conditions within such period as we may specify, we will disable or delete your account on the website, and you must stop using the website.
                        </p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">12. Assignment</h2>
                        <p className="pl-4">12.1. You hereby agree that we may assign, transfer, sub-contract or otherwise deal with our rights and/or obligations under these terms and conditions.</p>
                        <p className="pl-4">12.2. You may not without our prior written consent assign, transfer, sub-contract or otherwise deal with any of your rights and/or obligations under these terms and conditions.</p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">13. Severability</h2>
                        <p className="pl-4">
                            13.1. If a provision of these terms and conditions is determined by any court or other competent authority to be unlawful and/or unenforceable, the other provisions will continue in effect.
                        </p>
                        <p className="pl-4">
                            13.2. If any unlawful and/or unenforceable provision of these terms and conditions would be lawful or enforceable if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.
                        </p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">14. Third party rights</h2>
                        <p className="pl-4">14.1. A contract under these terms and conditions is for our benefit and your benefit, and is not intended to benefit or be enforceable by any third party.</p>
                        <p className="pl-4">14.2. The exercise of the parties' rights under a contract under these terms and conditions is not subject to the consent of any third party.</p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">15. Entire agreement</h2>
                        <p className="pl-4">
                            15.1. The terms and conditions [, together with [our privacy and cookies policy], shall constitute the entire agreement between you and us in relation to your use of our website and shall supersede all previous agreements between you and us in relation to your use of our website.
                        </p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">16. Law and jurisdiction</h2>
                        <p className="pl-4">16.1. These terms and conditions shall be governed by and construed in accordance with [Indian Law].</p>
                        <p className="pl-4">16.2. Any disputes relating to these terms and conditions shall be subject to the [exclusive] OR [non-exclusive] jurisdiction of the courts of [India].</p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">17. Statutory and regulatory disclosures</h2>
                        <p className="pl-4">17.1. We are registered in Goods & Services Tax you can find the online version of the register Here, and our registration number is [09AAAAF2376H1ZQ].</p>
                        <p className="pl-4">17.2. We subscribe to [Game Constitution], which can be consulted electronically Here.</p>
                        <p className="pl-4">17.3. Our GST number is [09AAAAF2376H1ZQ].</p>

                        <h2  className="text-3xl font-semibold tracking-wider pt-8 pb-2">18. Our details</h2>
                        <p className="pl-4">18.1. This website is owned and operated by Federation Of Industrial Education.</p>
                        <p className="pl-4">18.2. We are registered in [India] and our registered office is at [M22, Sector 66, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301].</p>
                        <p className="pl-4">18.3. Our principal place of business is at [4th Floor, Marisoft 3, Marigold, EFC Business Center Kalyani Nagar Pune-411014].</p>
                        <p className="pl-4">18.4. You can contact us:</p>
                        <ul className="my-5 list-disc pl-8 list-inside">
                            <li>by post, using the postal address [4th Floor, Marisoft 3, Marigold, EFC Business Center Kalyani Nagar Pune-411014];</li>
                            <li>using our website contact form; Send Query</li>
                            <li>by telephone, on [the contact number published on our website from time to time]; or</li>
                            <li>by email, using [the email address published on our website from time to time].</li>
                        </ul>
                    </div>
                    <div className="mt-4 border border-gray-200 p-4">
                        <h2 className="text-2xl font-semibold tracking-wide pb-3">Terms and Conditions for Participating Colleges</h2>
                        <ul className="mt-4 text-gray-600">
                            <strong>Role</strong>
                            <li>In order to participate in FIE, College needs to be registered with FIE.</li>
                            <li>In order to support and guide students, College is supposed to encourage their best faculty/faculties, to participate in FIE as Expert Faculty of management stream.</li>
                            <li>College should assist student to register with FIE</li>
                            <li>FIE requests college to motivate student and should support them by providing them facilities, information, guidance, and Infra (computer & internet connections etc.)</li>
                        </ul>
                        <ul className="mt-4 text-gray-600">
                            <strong>Eligibility</strong>
                            <li>In order to participate in FIE, College should be minimum 2 years old. If not, then specific approval will be required from FIE college coordination committee.</li>
                            <li>College should be recognised with at least one statutory bodies.</li>
                            <li>College Should have minimum 1 course of Management faculty in their curriculum.</li>
                        </ul>
                        <ul className="mt-4 text-gray-600">
                            <strong>Joining</strong>
                            <li>In order to join FIE college can Fill Form Online OR Offline.</li>
                            <li>In case of offline submission, please send form to our corporate office via post.</li>
                            <li>FIE Team will share an email notification after completion of registration formalities, with schedule vouchers participation details etc.</li>
                            <li>College should make payment via Cheque/Bank DD/NEFT/RTGS/Credit Card/Debit Card
                            Post clearance of payment, FIE Team will notify college about registration confirmation with registration Id allotted to college</li>
                        </ul>
                        <ul className="mt-4 text-gray-600">
                            <strong>Payment</strong>
                            <li>FIE Accepts payment by DD/Cheque/Online Payments options.</li>
                            <li>For DD/Cheque transactions, only cleared payment will be considered as payment made.</li>
                            <li>For Online transactions, only a successful transaction will be considered as payment.</li>
                            <li>Please keep your transaction ID and receipt safe with you, Payment status may take up to 48 hours to update on website (In general condition will be updated instantly),</li>
                            <li>If you find payment status still showing unpaid after 48 hours and your payment was successful then please contact us atinfo@fieindia.org mentioning full details like transaction Id, date, with receipt attachment.</li>
                            <li>For College participation fee details please contact General Management Committee.</li>
                            <li>No refund will be provided once management of FIE confirms participation of college under any circumstances.</li>
                        </ul>
                        <ul className="mt-4 text-gray-600">
                            <strong>Approval</strong>
                            <li>An approval on registration means participant is now eligible to take part in game.</li>
                            <li>An approval on registration may obtained only after submission of complete registration form, along with receipt of all valid documents and successful payment.</li>
                            <li>Approval will only be provided once all eligibility criteria is fulfilled to the satisfaction of FIE managing Committee.</li>
                            <li>Committee for college interaction have right to hold/ approve/ cancel any registration at any point in time with or without presenting any reason.</li>
                            <li>Note: -Right of participation in FIE is reserved with general management committee and Management committee can accept / decline participation to any college with or without declaring any reason, in case of decline of permission from Management committee, FIE is not liable for any amount more than registration fees deposited. FIE will refund registration fees within 15 days from the date of Decline.</li>
                        </ul>
                        <ul className="mt-4 text-gray-600">
                            <strong>Obligations</strong>
                            <li>Participating College is always expected to provide correct information, to the best and true to their knowledge.</li>
                            <li>Participating colleges can use FIE logo and Few intellectual properties by obtaining written permission from FIE 'College coordination committee'.</li>
                            <li>College is obliged to update FIE team about any one or more participating students/faculty expert have any legal complaint against them, college is also obliged to report any undisciplined behaviour of Participating students during game timeline of FIE.</li>
                            <li>College is obliged to maintain decent and favourable atmosphere regarding participation in FIE.</li>
                            <li>College is obligated to assign one Or More faculties for participation in FIE.</li>
                        </ul>
                        <ul className="mt-4 text-gray-600">
                            <strong>Rights</strong>
                            <li>Voting right: College as an entity does not have any rights of voting.</li>
                            <li>Sharing Rights: college can share any published content which is tagged as public and / Or provided with Sharing options specifically.</li>
                            <li>Posting Rights: College can post comments, suggestions criticism at designated places under the rules mentioned in General code of conduct.</li>
                        </ul>
                        <ul className="mt-4 text-gray-600">
                            <strong>General code of conduct</strong>
                            <li>Official language of FIE is English, submission in any other language will be deleted, we respect all languages but to make it possible for majority and to create workable format we need to freeze one language.</li>
                            <li>Any communication which is not related to FIE Should not be posted on FIE Website
                            Participants should restrain themselves from use of any Abusive/ Aggressive language & from indulging into any kind of destructive arguments.</li>
                            <li>Intellectual properties of FIE like Logos, brand names, content, communication should not be copied / used on any other platform / forum etc. Until allowed by rules mentioned in Constitution of FIE or specific written permission is granted by FIE General management committee.</li>
                            <li>Any activity / behaviour which is against the prescribed behaviour/ rules/ obligation/ activity/role, may result in disqualification from FIE.</li>
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default TermAndCondition;