import React, {lazy, useCallback, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import {useRouter} from "next/router";

// @ts-ignore
const Posts = lazy(() => import('posts/FavoritePostsSurface'));

const auth = getAuth(firebase_app);

export default function FavPosts() {
    const router = useRouter();
    const [user, setUser] = React.useState(auth.currentUser);

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(user)
            }
            console.log(user)
        });
    }, [router]);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    if (user != null) {
        return (
            <>
                <Posts currentUserId={user.uid} />
            </>
        )
    } else {
        return (
            <div></div>
        )
    }
}