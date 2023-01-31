import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiShow, BiHide } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import LoadingPage from "components/common/loading";
import { validateEmail } from "utils";
import backgroundImage from "assets/formBackground.svg";
import { useSignupMutation } from "store/queries";
import routes from "components/app/routes";
import { useAppDispatch } from "store";
import { removeUser, setUser } from "store/slices";

const Signup = () => {
    const dispatch = useAppDispatch();
    const [signup, { isLoading, isError, error }] = useSignupMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
    });
    const avatarRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const onSignup = async (e: FormEvent) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = inputValues;

        if (!name || !email || !password || !confirmPassword) {
            toast.warn("Please validate all the fields");
            return;
        }
        if (!validateEmail(email)) {
            toast.warn("E-mail format is not correct");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password fields are not matching");
            return;
        }

        try {
            const result = await signup(inputValues).unwrap();
            if (result.success) {
                toast.success(result.message);
                dispatch(setUser({ user: result.user }));
                navigate("/", { replace: true });
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to signup");
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error((error as any).data.message);
            dispatch(removeUser());
        }
    }, [isError, error, dispatch]);

    const updateAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files![0];
        if (!image) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            setInputValues({ ...inputValues, avatar: String(reader.result) });
        };
    };

    const validateInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const showPasswordFunctionality = () => setShowPassword(true);
    const hidePasswordFunctionality = () => setShowPassword(false);
    const showConfirmPasswordFunctionality = () => setShowConfirmPassword(true);
    const hideConfirmPasswordFunctionality = () => setShowConfirmPassword(false);

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <main className="form-container">
                    <div className="image-container">
                        <img src={backgroundImage} alt="background" loading="lazy" />
                    </div>
                    <form onSubmit={onSignup}>
                        <h1 className="text-center">Signup</h1>
                        <label htmlFor="avatar" className="avatar-image--container">
                            {inputValues.avatar.length ? (
                                <img src={inputValues.avatar} alt="avatar" loading="lazy" title="Select an avatar" className="avatar-image" />
                            ) : (
                                <FaUserCircle title="Select an avatar" className="avatar-image" />
                            )}
                        </label>
                        <div className="input-container">
                            <label htmlFor="name">Enter your name</label>
                            <input type="text" name="name" id="name" placeholder="e.g. John Doe" value={inputValues.name} onChange={validateInput} />
                        </div>
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
                        <div className="input-container">
                            <label htmlFor="confirmPassword">Re-enter your password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Re-enter your password"
                                value={inputValues.confirmPassword}
                                onChange={validateInput}
                            />
                            {showConfirmPassword ? (
                                <BiHide onClick={hideConfirmPasswordFunctionality} />
                            ) : (
                                <BiShow onClick={showConfirmPasswordFunctionality} />
                            )}
                        </div>
                        <div className="input-container avatar-container" onClick={() => avatarRef.current?.click()}>
                            <label htmlFor="avatar">Choose an avatar (optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                name="avatar"
                                id="avatar"
                                placeholder="choose from your device"
                                onChange={updateAvatar}
                                ref={avatarRef}
                            />
                        </div>
                        <button type="submit" disabled={isLoading}>
                            Register
                        </button>
                        <div className="more-links--wrapper">
                            <Link to={routes.login} className="more-links">
                                Login instead
                            </Link>
                        </div>
                    </form>
                </main>
            )}
        </>
    );
};

export default Signup;
