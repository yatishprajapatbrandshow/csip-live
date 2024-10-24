import Header from '@/Components/Header'
import { API_URL } from '@/Config/Config';
import { getLocalStorageItem } from '@/Config/localstorage';
import React, { useEffect, useState } from 'react'

function TransactionList() {
    const [paymentActivityData, setPaymentActivityData] = useState([]);
    const userData = getLocalStorageItem("userData");
    const fetchPaymentTransaction = async () => {
        try {
            const response = await fetch(`${API_URL}payment/transaction-list?participant_id=${userData?.sid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });
            const responseData = await response.json();
            console.log(responseData)
            if (responseData.status === true) {
                setPaymentActivityData(responseData?.data)
            } else {
                setPaymentActivityData([])
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        if (userData) {
            fetchPaymentTransaction(userData?.sid);
        }
    }, [])

    return (
        <>
            <Header />
            <div className="px-4 sm:px-6 lg:px-8 mt-10">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Transaction List</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>
                    {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

                            Add user
                        </button>
                    </div> */}
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y  divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Activity
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Payment Amount
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Payment Mode
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Transaction Date
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Attempt
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {paymentActivityData.map((item, index) => (
                                        <tr key={item?.paymentData?._id}>
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="h-11 w-11 flex-shrink-0">
                                                        <img src={`${item?.activityData?.image_assc}`} alt={item?.activityData?.name} className="h-11 w-11 rounded-full" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">{item?.activityData?.short_name}</div>
                                                        <div className="mt-1 text-gray-500">{item?.activityData?.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">{item?.paymentData?.paidAmount}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="mt-1 text-gray-500 uppercase">{item?.paymentData?.payment_mode}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="mt-1 text-gray-500">{item?.paymentData?.trans_date?.split('T')[0]}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <span
                                                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default TransactionList
