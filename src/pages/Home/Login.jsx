import { useForm } from "react-hook-form";
import signUpImg from "../../assets/login.png";
import { Link } from "react-router-dom";


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data =>{
        console.log(data);
    } 

    return (
        <div className="max-w-6xl mx-auto">
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold mb-3">Login now!</h1>
                        <img className="h-[400px] w-full" src={signUpImg} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
                                {errors.name && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true})} name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-[#118acb] text-white" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center mb-6'><small>New here? <Link to="/signup" className='text-sky-600 underline'>Please Register</Link></small></p>
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;