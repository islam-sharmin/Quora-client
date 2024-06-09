import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = () => {

    const [error, setError] = useState();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [authorInfo, setAuthorInfo] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const price = 50;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure])

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}`)
                .then(response => {
                    setAuthorInfo(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [axiosSecure, user]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment error', error);
            setError(error.message)
        }
        else {
            console.log("Payment Method", paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const updateBadge = {
                    badge: authorInfo.badge
                };

                try {
                    const response = await axiosSecure.patch(`/usersBadge/${authorInfo._id}`, updateBadge);
                    if (response.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: 'Payment successfully, your a member now',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.error('Failed to report comment:', error);
                }

                const payment = {
                    transactionId: paymentIntent.id,
                    email: user.email,
                    amount: price,
                    status: 'paid'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log(res.data);
                // if (res.data?.paymentResult?.insertedId) {
                //     Swal.fire({
                //         position: "center",
                //         icon: "success",
                //         title: 'Payment successfully, your a member now',
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                // }
            }
        }
    }

    return (
        <div>
            {
                transactionId ?
                    <>
                        < p className="text-green-600" > Your transaction id: {transactionId}</p >
                        <p>You are a member now</p>
                    </>
                    :
                    <>
                        <form onSubmit={handleSubmit}>
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                            <button type="submit" className="btn btn-sm bg-sky-600 text-white my-4" disabled={!stripe || !clientSecret}>
                                Pay
                            </button>
                            <p className="text-red-600">{error}</p>
                        </form>
                    </>
            }
        </div>
    );
};

export default CheckoutForm;