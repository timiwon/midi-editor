import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATH } from "@/lib/paths";
import Loading from "@/shared-components/Loading";
import Home from "@/pages/home/index";

const Router = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter basename={PATH.HOME}>
                <Routes>
                    <Route path={PATH.HOME} element={<Home />}/>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default Router