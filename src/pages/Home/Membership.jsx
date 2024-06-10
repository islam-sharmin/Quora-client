import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Membership = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <SectionTitle heading="Payment" subHeading="Pay Here To Become a Member"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Membership;