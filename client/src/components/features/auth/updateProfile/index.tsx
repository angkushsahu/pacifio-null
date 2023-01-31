import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import LoadingPage from "components/common/loading";
import { validateEmail } from "utils";
import backgroundImage from "assets/formBackground.svg";
import { useUpdateAccountMutation } from "store/queries";
import { useAppDispatch, useAppSelector } from "store";
import { setUser } from "store/slices";

const UpdateProfile = () => {
    const { user } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    const [updateAccount, { isLoading, isError, error }] = useUpdateAccountMutation();
    const [inputValues, setInputValues] = useState({
        avatar: "",
        email: "",
        name: "",
        deleteAvatar: false,
    });
    const avatarRef = useRef<HTMLInputElement | null>(null);

    const onProfileUpdate = async (e: FormEvent) => {
        e.preventDefault();
        const { avatar, email, name, deleteAvatar } = inputValues;

        if (!email || !name) {
            toast.warn("Please validate all the fields");
            return;
        }
        if (!validateEmail(email)) {
            toast.warn("E-mail format is not correct");
            return;
        }

        try {
            if (user?.name !== name || user?.email !== email || (user?.pic && deleteAvatar) || avatar) {
                const result = await updateAccount(inputValues).unwrap();
                if (result.success) {
                    toast.success(result.message);
                    dispatch(setUser({ user: result.user }));
                }
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to update your account");
        }
    };

    useEffect(() => {
        if (isError) {
            toast.error((error as any).data.message);
        }
    }, [isError, error]);

    useEffect(() => {
        setInputValues({ avatar: "", deleteAvatar: false, email: user?.email || "", name: user?.name || "" });
    }, [user]);

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

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <main className="form-container">
                    <div className="image-container">
                        <img src={backgroundImage} alt="background" loading="lazy" />
                    </div>
                    <form onSubmit={onProfileUpdate}>
                        <h1>Update Profile</h1>
                        <label htmlFor="avatar" className="avatar-image--container">
                            {inputValues.avatar || user?.pic ? (
                                <img
                                    src={inputValues.avatar ? inputValues.avatar : user?.pic}
                                    alt="avatar"
                                    loading="lazy"
                                    title="Change avatar"
                                    className="avatar-image"
                                />
                            ) : (
                                <FaUserCircle title="Change avatar" className="avatar-image" />
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
                        <div className="input-container checkbox-container">
                            <label htmlFor="deleteAvatar">Delete Avatar</label>
                            <input
                                type="checkbox"
                                name="deleteAvatar"
                                id="deleteAvatar"
                                onChange={(e) => setInputValues({ ...inputValues, deleteAvatar: e.target.checked })}
                            />
                        </div>
                        <div className="input-container avatar-container" onClick={() => avatarRef.current?.click()}>
                            <label htmlFor="avatar">Change avatar</label>
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
                            Update
                        </button>
                    </form>
                </main>
            )}
        </>
    );
};

export default UpdateProfile;
