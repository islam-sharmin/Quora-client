import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/error.png";


const ErrorPage = () => {

    const error = useRouteError();

    return (
        <div className="text-center mt-14">
            <h2>Oops!!!</h2>
            <p>{error.statusText || error.message}</p>
            {
                error.status === 404 && <div>
                    <div className="flex flex-col items-center justify-center">
                    <img src={errorImg} alt=""  />
                    <div>
                    <h3>Page not found</h3>
                    <Link to="/"><button className="btn bg-sky-600">Go Back</button></Link>
                    </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ErrorPage;