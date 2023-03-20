import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userService } from "../services/user.service"; 
import Navbar  from "../components/navbar2";
export default App;
import { Alert } from "../components/Alerts";

function App({ Component, pageProps }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);


    useEffect(() => {
        authCheck(router.asPath);
        const hideContent = () => setAuthorized(false);
        router.events.on("routeChangeStart", hideContent);
        router.events.on("routeChangeComplete", authCheck);
        return () => {
            router.events.off("routeChangeStart", hideContent);
            router.events.off("routeChangeComplete", authCheck);
        };
    }, []);

    function authCheck(url) {
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath },
            });

        } else {
            setAuthorized(true);
        }
    }

    return (
        <>

            <Head>
                <title>Payments Dash</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid grid-cols-12 gap-2 h-full">
                <div className="col-span-1">
                    <div className="flex flex-col fixed">
                    {authorized && <Navbar />}
                    </div>
                </div>

                <div className="col-span-11">
                <div className="container mx-auto border-2 shadow-lg">
                <Alert />
                {authorized && <Component {...pageProps} />}

                    
                </div>
                </div>
            </div>
            </>
    );
}
