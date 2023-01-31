import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BiShow, BiHide } from "react-icons/bi";
import backgroundImage from "assets/formBackground.svg";
import LoadingPage from "components/common/loading";
import { useResetPasswordMutation } from "store/queries";
import routes from "components/app/routes";

const ResetPassword = () => {
    const [resetPassword, { isLoading, isError, error }] = useResetPasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputValues, setInputValues] = useState({ password: "", confirmPassword: "" });
    const { id } = useParams();
    const navigate = useNavigate();

    const onResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        if (!inputValues.password || !inputValues.confirmPassword) {
            toast.warn("Please validate all the fields");
            return;
        }
        if (inputValues.confirmPassword !== inputValues.password) {
            toast.warn("Password fields are not matching");
            return;
        }

        try {
            const result = await resetPassword({ password: inputValues.password, resetId: id! }).unwrap();
            if (result.success) {
                toast.success(result.message);
                navigate(routes.login, { replace: true });
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to update password");
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error((error as any).data.message);
        }
    }, [isError, error]);

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
                    <form onSubmit={onResetPassword}>
                        <h1>Reset Password</h1>
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
                        <button type="submit" disabled={isLoading}>
                            Change Password
                        </button>
                    </form>
                </main>
            )}
        </>
    );
};

export default ResetPassword;
