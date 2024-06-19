import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import React, {lazy, useCallback, useEffect, useMemo} from "react";
import {useRouter} from "next/router";

// @ts-ignore
const EventsSurface = lazy(() => import('events/UserEventsSurface'));

const auth = getAuth(firebase_app);

export default function UserEventsPage() {
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
                setUser(auth.currentUser)
            }
        });
    }, [router]);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    if (userId != "" && user != null) {
        return (
            <>
                <EventsSurface id={userId} currentUserId={user.uid} currentUserName={user.displayName}/>
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}