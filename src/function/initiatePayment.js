const loadRazorpayScript = () => { 
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
        document.body.appendChild(script);
    });
};

const Razorpay = (amount, orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) throw new Error('Razorpay SDK failed to load');

            const options = {
                key: 'rzp_test_bJShg4py6mnQe0',
                // key: 'rzp_live_CDDk2KEJwzL6j1',
                amount: amount * 100,
                currency: 'INR',
                name: 'Your Company Name',
                description: 'Activity Payment',
                order_id: orderId,  // Optional order ID
                handler: function (response) {
                    // Payment successful
                    resolve(response);  // Resolve with the payment response
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

            razorpay.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                reject(response.error);  // Reject with the error
            });
        } catch (error) {
            reject(error);  // Reject with any other errors
        }
    });
};

export default Razorpay;
