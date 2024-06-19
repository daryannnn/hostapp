import React, {lazy, useCallback, useEffect} from "react";
import {useRouter} from "next/router";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";

// @ts-ignore
const FavoritePrograms = lazy(() => import('programs/FavoriteProgramsSurface'));

const auth = getAuth(firebase_app);

export default function FavPrograms() {
    const [user, setUser] = React.useState(auth.currentUser);

    const router = useRouter();

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(user)
            }
            console.log(user)
        });
    }, []);
    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    if (user != null) {
        return (
            <>
                <FavoritePrograms currentUserId={user.uid} />
            </>
        )
    } else {
        return (
            <div></div>
        )
    }
}