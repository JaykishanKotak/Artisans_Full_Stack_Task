import { useAppDispatch } from '@/app/hooks';
import { logout } from '@/features/auth/authSlice';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/api/loaderControl';
import type { User } from '@/shared/api/types';
import { getMyProfile } from '@/shared/api/user.api';
import { useEffect, useState } from 'react';

export function useProfile() {
  const dispatch = useAppDispatch();
  const onClickLogout = () => {
    dispatch(logout());
  };
  const [userDetails, setUserDetails] = useState<User | null>(null);

  const getProfileDetails = async () => {
    startScreenLoader();

    try {
      const { user } = await getMyProfile();
      setUserDetails(user);
    } catch (error) {
      console.log('error', error);
    } finally {
      stopScreenLoader();
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return {
    onClickLogout,
    getProfileDetails,
    userDetails,
  };
}
