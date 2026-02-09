import { logout } from '@/features/auth/authSlice';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/api/loaderControl';
import { logout as userLogout } from '@/shared/api/login.api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export function useHeader() {
  const dispatch = useDispatch();
  const onClickLogout = async () => {
    startScreenLoader();
    try {
      await userLogout();
      dispatch(logout());
      toast.success('Successfully logged out');
    } catch (error) {
      console.log('error', error);
    } finally {
      stopScreenLoader();
    }
  };

  return {
    onClickLogout,
  };
}
