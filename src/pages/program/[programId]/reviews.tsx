import React, {lazy, useCallback, useEffect, useMemo} from "react";
import {useRouter} from "next/router";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";

// @ts-ignore
const ReviewSurface = lazy(() => import('programs/ReviewSurface'));

const auth = getAuth(firebase_app);

export default function Review() {
    const [user, setUser] = React.useState(auth.currentUser);

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(auth.currentUser)
            }
        });
    }, []);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    const router = useRouter()
    const { programId} = useMemo(() => ({
        programId: router.query?.programId?.toString() ?? "",
    }), [router.query?.programId]);

    if (programId != "" && user != null) {
        return (
            <>
                <ReviewSurface programId={programId} currentUserId={user.uid} currentUserName={user.displayName}/>
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}