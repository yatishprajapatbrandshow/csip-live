import { useCallback } from 'react';

const useRazorpay = () => {
    const loadRazorpayScript = useCallback(() => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
            document.body.appendChild(script);
        });
    }, []);

    const initiatePayment = async (amount, orderId) => {
        await loadRazorpayScript();

        const options = {
            key: 'rzp_test_bJShg4py6mnQe0', 
            // key: 'rzp_live_CDDk2KEJwzL6j1',
            amount: 1 * 100,
            currency: 'INR',
            name: 'Your Company Name',
            description: 'Activity Payment',
            handler: function (response) {
                // Handle success
                console.log('Payment successful:', response);
                alert('Payment successful!');
                // You can also send response.details to your server to validate the payment
            },
            prefill: {
                name: 'Your Name',
                email: 'youremail@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Your Address',
            },
            theme: {
                color: '#F37254',
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return { initiatePayment };
};

export default useRazorpay;
