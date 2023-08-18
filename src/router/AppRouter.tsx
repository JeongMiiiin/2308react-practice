import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppTest from "@/pages/AppTest";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppTest />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;