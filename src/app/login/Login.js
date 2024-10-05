import Login from '@/Components/Login'
import SmallFooter from '@/Components/SmallFooter'

function LoginPage() {
    return (
        <div className='w-full h-full bg-[#4E54C8]'>
            <div className='w-full h-[90vh] bg-[#4E54C8] flex justify-center items-center'>
                <Login />
            </div>
            <SmallFooter />
        </div>
    )
}

export default LoginPage
