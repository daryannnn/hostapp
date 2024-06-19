import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import React, {lazy, useCallback, useEffect, useMemo} from "react";
import {useRouter} from "next/router";

// @ts-ignore
const ProfileUpper = lazy(() => import('profile/ProfileUpper'));
// @ts-ignore
const UserPosts = lazy(() => import('posts/UserPosts'));

const auth = getAuth(firebase_app);

export default function ProfilePage(props: any) {
    //const currentUser = auth.currentUser;
    //const [user, setUser] = React.useState(auth.currentUser);
    const user = props.user;

    const router = useRouter();

    const { userId} = useMemo(() => ({
        userId: router.query?.userId?.toString() ?? "",
    }), [router.query?.userId]);

    /*const isUserLoggedIn = useCallback(() => {
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
    }, [isUserLoggedIn]);*/
    /*useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(auth.currentUser)
            }
        });
        console.log(user)
        console.log(userId)
    }, []);*/

    //<ProfileUpper id="uwQpIREuHGY1b2Mu4EjXfEDw6eW2" />
    //<ProfileUpper id="u7bg33K1sJT7vTjzrlSi3SKQbcA3" />
    /*return (
        <>
            <ProfileUpper id="u7bg33K1sJT7vTjzrlSi3SKQbcA3" />
        </>
    )*/
    if (userId != "" && user != null) {
        return (
            <>
                <ProfileUpper id={userId} currentUserId={user.uid} currentUserName={user.displayName!}/>
                <UserPosts id={userId} currentUserId={user.uid} />
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}