import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import Link from "next/link";

const BreadCrumb = [
    {
        name: "About Us",
        Link: "/about",
    }
]

const About = () => {
    return (
        <>
            <Header />
            <section className=" py-10 bg-gray-100">
                <div className="bg-purple-700 text-center py-10">
                    <h1 className="text-4xl text-white font-bold">INTRODUCTION</h1>
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
                    <h2 className="text-3xl font-semibold tracking-wider border-b border-gray-300 pb-3">Introduction</h2>
                    <p className="mt-5">Federation of industrial Education was established in Year 2012, by group of visionaries to enhance education quality in various sectors by empowering different sections of education system. FIE work closely with colleges and Industrial bodies in order to bridge the gap between practical and academic education. We at FIE aim to transform Industrial Education System and Establish a harmony between various education systems exists in India and Globally, which will empower Students, institutions & Industries alike. We believe that for growth of any Nation, Education and technology can play a vital role and In all of FIE's activities these two Aspect are always on centerstage. Improvements in education and technology can become a catalyst to national growth and our efforts are directed toward 1-Policy Level changes to improve quality of education 2-Implementation Methodologies of new and Old industrial curriculum.</p>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default About;