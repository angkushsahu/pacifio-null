import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import routes from "components/app/routes";
import { useAppDispatch, useAppSelector } from "store";
import { useDeleteAccountMutation, useLogoutMutation } from "store/queries";
import { toast } from "react-toastify";
import { removeUser } from "store/slices";

const UserProfile = () => {
    const [logout] = useLogoutMutation();
    const [deleteAccount] = useDeleteAccountMutation();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.authSlice);
    const navigate = useNavigate();

    const onLogout = async () => {
        const reAssureAction = window.confirm("Are you sure you want to logout ?");
        if (!reAssureAction) {
            return;
        }

        try {
            const result = await logout().unwrap();
            if (result.success) {
                toast.success(result.message);
                dispatch(removeUser());
                navigate(routes.login, { replace: true });
            } else {
                toast.error(result.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to logout");
        }
    };

    const onAccountDelete = async () => {
        const reAssureAction = window.confirm("Are you sure you want to delete your account ?");
        if (!reAssureAction) {
            return;
        }

        try {
            const result = await deleteAccount().unwrap();
            if (result.success) {
                toast.success(result.message);
                dispatch(removeUser());
                navigate(routes.signup, { replace: true });
            } else {
                toast.error(result.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to delete account");
        }
    };

    return (
        <section className={styles.user}>
            <div className={styles.user_profile}>
                {user?.pic ? <img src={user?.pic} alt="user avatar" loading="lazy" title={user.name} /> : <FaUserCircle title={user?.name} />}
                <div className={styles.user_profile__info}>
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                    <Link to={routes.updateProfile}>
                        <button type="button" title="Update Profile" className={styles.update_profile}>
                            Update Profile
                        </button>
                    </Link>
                    <Link to={routes.changePassword}>
                        <button type="button" title="Change Password">
                            Change Password
                        </button>
                    </Link>
                </div>
            </div>
            <div className={styles.quick_links}>
                <h2 className="text-center">Quick Links</h2>
                <div className={styles.button_group}>
                    <Link to={routes.orders}>
                        <button type="button" title="Browse Order History">
                            Order History
                        </button>
                    </Link>
                    <Link to={routes.cart}>
                        <button type="button" title="Go To Cart">
                            Cart
                        </button>
                    </Link>
                    <button type="button" title="Log Out" onClick={onLogout}>
                        Log out
                    </button>
                    <button type="button" title="Delete This Account" onClick={onAccountDelete}>
                        Delete Account
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
