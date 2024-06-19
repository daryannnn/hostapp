import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import React, {lazy, useCallback, useEffect, useMemo} from "react";
import {useRouter} from "next/router";

// @ts-ignore
const EventsFeed = lazy(() => import('events/UserEventsFeed'));

const auth = getAuth(firebase_app);

export default function UserEventsFeed() {
    const [user, setUser] = React.useState(auth.currentUser);

    const router = useRouter();

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(auth.currentUser)
            }
        });
    }, [router]);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    if (user != null) {
        return (
            <>
                <EventsFeed id={user.uid}/>
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}