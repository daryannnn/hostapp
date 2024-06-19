import {useRouter} from "next/router";

import React, {lazy} from "react";

// @ts-ignore
const UserFeed = lazy(() => import('posts/UserFeed'));

export default function Home(props: any) {
  const router = useRouter();

  //const [user, setUser] = React.useState(auth.currentUser);
  const user = props.user;

  /*const isUserLoggedIn = useCallback(() => {
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
  }, [isUserLoggedIn]);*/

  /*useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return router.push("/login");
      } else {
        setUser(user)
      }
    });
  }, []);*/

  if (user != null) {
    return (
        <>
          <UserFeed id={user.uid}/>
        </>
    )
  } else {
    return (
        <div>

        </div>
    )
  }
}
