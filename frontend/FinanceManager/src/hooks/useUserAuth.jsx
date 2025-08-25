import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import axiosInstance from "../Utils/axiosInstance";
import axios from "axios";
import { API_PATHS } from "../Utils/apiPaths";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try{
                const response = await axiosInstance.get(API_PATHS.ATUH.GET_USER_INFO);

                if(isMounted && response.data){
                    updateUser(response.data);
                    console.log(response.data);
                }
            }
            catch(error){
                console.error("Failed to fetch user info:", error);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        }
    },[updateUser, clearUser, navigate]);
};