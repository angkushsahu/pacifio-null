import styles from "./styles.module.scss";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { AiFillDelete } from "react-icons/ai";
import { reactStarsOptions } from "utils";
import { IReview } from "types";
import { useAppSelector } from "store";
import { useDeleteReviewMutation } from "store/queries";
import { toast } from "react-toastify";

const Review = ({ rating, comment, user, userName, productId }: IReview & { productId: string }) => {
    const [showLess, setShowLess] = useState(true);
    const { user: me } = useAppSelector((state) => state.authSlice);
    const [deleteReview] = useDeleteReviewMutation();

    const toggleReviewDescription = () => {
        setShowLess((prev) => !prev);
    };

    const getShortDescription = (description: string) => {
        if (showLess) {
            return description.length <= 100 ? (
                <p>{description}</p>
            ) : (
                <>
                    <p>{description.slice(0, 100) + "....."}</p>
                    <p className={styles.read_more} onClick={toggleReviewDescription}>
                        Read More
                    </p>
                </>
            );
        } else {
            return (
                <>
                    <p>{description}</p>
                    <span className={styles.read_less} onClick={toggleReviewDescription}>
                        Read Less
                    </span>
                </>
            );
        }
    };

    const onReviewDeletion = async () => {
        try {
            const response = await deleteReview({ productId }).unwrap();
            if (response.success) {
                toast.success("Your review was removed successfully");
            } else {
                toast.error(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to delete review");
        }
    };

    return (
        <article>
            {user === me?._id ? <AiFillDelete className={styles.delete_icon} title="Remove your review" onClick={onReviewDeletion} /> : null}
            <h3>{userName}</h3>
            <ReactStars {...reactStarsOptions(rating)} />
            {getShortDescription(comment)}
        </article>
    );
};

export default Review;
