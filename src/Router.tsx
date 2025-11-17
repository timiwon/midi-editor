import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PATH } from "@/lib/paths";

import Loading from "@/shared-components/Loading";
import MainLayout from "@/shared-components/layout/MainLayout";
import Home from "@/pages/home/page";
import SongPage from "@/pages/song/page";

const Router = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter basename={PATH.HOME}>
                <Routes>
                    <Route path={PATH.HOME} element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    } />
                    <Route path={PATH.SONG_DETAIL} element={
                        <MainLayout>
                            <SongPage />
                        </MainLayout>
                    } />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default Router