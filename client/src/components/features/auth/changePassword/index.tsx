import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiShow, BiHide } from "react-icons/bi";
import backgroundImage from "assets/formBackground.svg";
import LoadingPage from "components/common/loading";
import { useChangePasswordMutation } from "store/queries";

const ChangePassword = () => {
    const [changePassword, { isLoading, isError, error }] = useChangePasswordMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [inputValues, setInputValues] = useState({ password: "", confirmPassword: "" });

    const onChangePassword = async (e: FormEvent) => {
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
            const result = await changePassword({ password: inputValues.password }).unwrap();
            if (result.success) {
                toast.success(result.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to change password");
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
                    <form onSubmit={onChangePassword}>
                        <h1>Change Password</h1>
                        <div className="input-container">
                            <label htmlFor="password">Enter new password</label>
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
                            <label htmlFor="confirmPassword">Re-enter new password</label>
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

export default ChangePassword;
