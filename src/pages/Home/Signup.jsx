import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import signUpImg from "../../assets/login.png";


const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data =>{
        console.log(data);
    } 

    return (
        <div className="max-w-6xl mx-auto">
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold mb-3">Sign Up now!</h1>
                        <img className="h-[400px] w-full" src={signUpImg} alt="" />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" required />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" name="photoURL" className="input input-bordered" required />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
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
                                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} name="password" placeholder="password" className="input input-bordered" required />
                                {errors.password?.type === "required" && (<p className="text-red-600">Password is required</p>)}
                                {errors.password?.type === "minLength" && (<p className="text-red-600">Password must be 6 characters</p>)}
                                {errors.password?.type === "maxLength" && (<p className="text-red-600">Password must be less than 20 characters</p>)}
                                {errors.password?.type === "pattern" && (<p className="text-red-600">Password must have one upper case, one lower case, one number and one special characters</p>)}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-[#118acb] text-white" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center mb-6'><small>Already Have an Account? <Link to="/login" className='text-sky-600 underline'>Please Login</Link></small></p>
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;