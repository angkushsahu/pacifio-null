import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import AdminSidebar from "components/common/adminSidebar";
import { useGetUserForAdminQuery, useUpdateUserRoleMutation } from "store/queries";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IUserRole } from "types";
import LoadingComponent from "components/common/loading/component";

const AdminViewUser = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetUserForAdminQuery({ userId: id! });
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        if (data?.success) {
            setUserRole(data?.user.role);
        }
    }, [data]);

    const onRoleChange = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await updateUserRole({ role: userRole as IUserRole, userId: data?.user._id! }).unwrap();
            if (response.success) {
                toast.success(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.mesage || "Unable to update role");
        }
    };

    return (
        <section className="admin-pages">
            <AdminSidebar />
            {isLoading ? (
                <section className="admin-loading--section">
                    <LoadingComponent />
                </section>
            ) : data && data.success ? (
                <section className="admin-workspace">
                    <h2 className={styles.admin_workspace__title}>User # {data.user._id}</h2>
                    {data.user.pic ? (
                        <img src={data.user.pic} alt="user avatar" loading="lazy" title={data.user.name} />
                    ) : (
                        <FaUserCircle title={data.user.name} />
                    )}
                    <p>
                        <strong>Name</strong> : {data.user.name}
                    </p>
                    <p>
                        <strong>E-mail</strong> : {data.user.email}
                    </p>
                    <p>
                        <strong>Role</strong> : {data.user.role}
                    </p>
                    <form className={styles.user_role__container} onSubmit={onRoleChange}>
                        <label htmlFor="userRole">Change User Role</label>
                        <select name="userRole" id="userRole" value={userRole} onChange={(e) => setUserRole(e.target.value)} title="Change role">
                            <option value="" disabled={true}>
                                -- Select --
                            </option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="super-admin">Super Admin</option>
                        </select>
                        <button type="submit" title="Update User Role">
                            Update User Role
                        </button>
                    </form>
                </section>
            ) : null}
        </section>
    );
};

export default AdminViewUser;
