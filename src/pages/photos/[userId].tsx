import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import React, {lazy, useCallback, useEffect, useMemo} from "react";
import {useRouter} from "next/router";

// @ts-ignore
const PhotosSurface = lazy(() => import('profile/PhotosSurface'));

const auth = getAuth(firebase_app);

export default function ProfilePage() {
    //const currentUser = auth.currentUser;
    const [user, setUser] = React.useState(auth.currentUser);

    const router = useRouter();

    const { userId} = useMemo(() => ({
        userId: router.query?.userId?.toString() ?? "",
    }), [router.query?.userId]);

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(user)
            }
        });
    }, [router]);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    if (userId != "" && user != null) {
        return (
            <>
                <PhotosSurface id={userId} currentUserId={user.uid}/>
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}