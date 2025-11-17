import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATH } from "@/lib/paths";
import Loading from "@/shared-components/Loading";
import Home from "@/pages/home/page";
import SongPage from "@/pages/song/page";

const Router = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter basename={PATH.HOME}>
                <Routes>
                    <Route path={PATH.HOME} element={<Home />}/>
                    <Route path={PATH.SONG_DETAIL} element={<SongPage />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default Router