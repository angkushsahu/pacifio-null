import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiShow, BiHide } from "react-icons/bi";
import LoadingPage from "components/common/loading";
import { validateEmail } from "utils";
import routes from "components/app/routes";
import { useAppDispatch } from "store";
import { removeUser, setUser } from "store/slices";
import backgroundImage from "assets/formBackground.svg";
import { useLoginMutation } from "store/queries";

const Login = () => {
    const dispatch = useAppDispatch();
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [inputValues, setInputValues] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const onLogin = async (e: FormEvent) => {
        e.preventDefault();
        const { email, password } = inputValues;

        if (!email || !password) {
            toast.warn("Please validate all the fields");
            return;
        }
        if (!validateEmail(email)) {
            toast.warn("E-mail format is not correct");
            return;
        }

        try {
            const result = await login(inputValues).unwrap();
            if (result.success) {
                toast.success(result.message);
                dispatch(setUser({ user: result.user }));
                navigate("/", { replace: true });
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to login");
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error((error as any).data.message);
            dispatch(removeUser());
        }
    }, [isError, error, dispatch]);

    const validateInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const showPasswordFunctionality = () => setShowPassword(true);
    const hidePasswordFunctionality = () => setShowPassword(false);

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <main className="form-container">
                    <div className="image-container">
                        <img src={backgroundImage} alt="background" loading="lazy" />
                    </div>
                    <form onSubmit={onLogin}>
                        <h1>Login</h1>
                        <div className="input-container">
                            <label htmlFor="email">Enter your e-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="e.g. johndoe@gmail.com"
                                value={inputValues.email}
                                onChange={validateInput}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">Enter your password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter a strong password"
                                value={inputValues.password}
                                onChange={validateInput}
                            />
                            {showPassword ? <BiHide onClick={hidePasswordFunctionality} /> : <BiShow onClick={showPasswordFunctionality} />}
                        </div>
                        <div className="more-links--wrapper">
                            <Link to={routes.forgotPassword} className="more-links">
                                Forgot Password ?
                            </Link>
                        </div>
                        <button type="submit" disabled={isLoading}>
                            Login
                        </button>
                        <div className="more-links--wrapper">
                            <Link to={routes.signup} className="more-links">
                                Signup instead
                            </Link>
                        </div>
                    </form>
                </main>
            )}
        </>
    );
};

export default Login;
