import { useNavigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/user/userSlice';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      });
  };

  return (
    <ProfileMenuUI handleLogout={handleLogout} pathname={location.pathname} />
  );
};
