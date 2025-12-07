import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axiosConfig';

export const useDashboardData = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userProjects, setUserProjects] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fech dashboard data
    const fetchDashboardData = async () => {
        if (!user) {
            setIsLoading(false);
            return
        }

        try {
            setIsLoading(true);
            const userRole = user.role;

            // Profile check
            const userProfile = await api(`/profile/${userRole}/me`);
            if (!userProfile.data.exists) {
                navigate(`/${userRole}/profile-setup`);
                console.warn('Profile not setup');
                setIsLoading(false);
                return;
            }

            // Fetch dashboard data
            const res = await api.get(`/applications/${userRole}/dashboard`);
            const data = res.data;

            setUserData(data.userData);
            setUserProfile(data.userProfile);
            setUserProjects(data.projects || null);

        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    return {
        userData,
        userProfile,
        userProjects,
        isLoading,
        error,
        refreshData: fetchDashboardData // Export the function to refresh dashboard data
    }
}