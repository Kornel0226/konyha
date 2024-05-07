import { useContext } from "react";
import { AppContext } from "../contexts/AppContex";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layouts/Layout";
import Login, { loginAction } from "../pages/LoginPage";
import Register, { regAction } from "../pages/RegisterPage";
import UserLayout from "../pages/Layouts/ProfileLayout";
import UserDetailsWrapper from "../components/User/UserDetailsWrapper";
import UserRecipesWrapper from "../components/User/UserRecipesWrapper";
import RecipeCreation from "../components/Recipes/RecipeCreation";
import EditRecipePage from "../pages/EditRecipePage";
import RecipeDetailsPage from "../pages/RecipeDetailsPage";
import Recipes from "../pages/RecipesPage";
import ErrorModal from "../components/ErrorModal";
import ErrorPage from "../pages/ErrorPage";


const AppRouter = () => {
    const { user, isModalOpen } = useContext(AppContext);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErrorPage />,
            action: loginAction,
            children: [
                { index: true, element: <h1>Start</h1> },
                { path: "login", element: <Login />, action: loginAction },
                { path: "register", element: <Register />, action: regAction },
                {
                    path: "profil",
                    element: <UserLayout />,
                    children: [
                        {
                            path: "adataim",
                            element: user ? <UserDetailsWrapper token={user.token} /> : null,
                        },
                        {
                            path: "recepteim",
                            element: user ? <UserRecipesWrapper token={user.token} /> : null,
                        },
                        {
                            path: "recepteim/új",
                            element: user ? <RecipeCreation token={user.token} /> : <h1>xdd</h1>,

                        },
                        {
                            path: "recepteim/modositas",
                            element: user ? <EditRecipePage token={user.token} /> : <h1>xdd</h1>,
                        }
                        // Add other routes for the profile page
                    ],
                },
                { path: "receptek/:recipeId", element: <RecipeDetailsPage /> },
                { path: "receptek", element: <Recipes /> }
            ],
        },
    ]);

    return (
        <>
            <RouterProvider router={router}>
            </RouterProvider>
            {isModalOpen && <ErrorModal />}
        </>
    );
};

export default AppRouter;
