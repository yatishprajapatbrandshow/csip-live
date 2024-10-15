import Login from '@/Components/Login'
import SignupForm from '@/Components/SignUp'
import SmallFooter from '@/Components/SmallFooter'

function SignupPage() {
    return (
        <div className='w-full h-full bg-[#4E54C8]'>
            <div className='w-full h-[90vh] bg-[#4E54C8] flex justify-center items-center px-2'>
                <SignupForm />
            </div>
            <SmallFooter />
        </div>
    )
}

export default SignupPage
