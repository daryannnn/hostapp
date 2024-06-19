import React, {lazy, useCallback, useEffect} from "react";
import {useRouter} from "next/router";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";

// @ts-ignore
const Events = lazy(() => import('events/FavoriteEventsSurface'));

const auth = getAuth(firebase_app);

export default function FavEvents() {
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
                <Events currentUserId={user.uid} />
            </>
        )
    } else {
        return (
            <div></div>
        )
    }
}