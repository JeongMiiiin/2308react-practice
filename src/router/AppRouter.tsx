import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import AppMain from "@/pages/AppMain";
import AppLogin from "@/pages/AppLogin";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthRoute authentication="User"/>}>
                    <Route path="/" element={<AppMain />} />
                </Route>
                <Route element={<AuthRoute authentication="NotUser"/>}>
                    <Route path="/login" element={<AppLogin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;