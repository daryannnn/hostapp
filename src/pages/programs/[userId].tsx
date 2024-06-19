import React, {lazy, useCallback, useEffect, useMemo} from "react";
import {useRouter} from "next/router";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

// @ts-ignore
const UserProgramsSurface = lazy(() => import('programs/UserProgramsSurface'));

export default function UserPrograms() {
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
        console.log(userId)
    }, [isUserLoggedIn]);

    const router = useRouter()

    const { userId} = useMemo(() => ({
        userId: router.query?.userId?.toString() ?? "",
    }), [router.query?.userId]);

    if (userId != "" && user != null) {
        return (
            <>
                <UserProgramsSurface id={userId} currentUserId={user.uid} currentUserName={user.displayName}/>
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}