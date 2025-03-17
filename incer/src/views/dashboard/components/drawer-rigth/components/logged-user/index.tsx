import {
  Avatar,
  Box,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';

import GenericModal from '../../../../../../components/generic-modal';
import SvgProducer from '../../../../../../components/svg/producer';
import { User } from '../../../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../../../context/auth';
import { UserRole } from '../../../../../../types/user';
import UpdateUserInfo from './update-user';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    width: '100%',
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    fontSize: '1rem',
    cursor: 'pointer',
  },
  userInfo: {
    textAlign: 'right',
    width: '100%',
  },
  userName: {
    fontWeight: 700,
    color: theme.palette.common.white,
    fontSize: '1rem',
    letterSpacing: 0.5,
  },
  userRole: {
    fontSize: '0.85rem',
    color: theme.palette.grey[300],
    marginBottom: theme.spacing(0.5),
  },
}));

const LoggedUser: React.FC = () => {
  const classes = useStyles();
  const { user, handleLogout } = useContext(AuthContext) as AuthContextData;

  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Obter o papel do usuário
  const getRole = (role: UserRole): string => {
    const rolesMap: Record<UserRole, string> = {
      [UserRole.Admin]: 'Administrador',
      [UserRole.Cooperative]: 'Cooperativa',
      [UserRole.GeneralAnalitic]: 'Consultor de dados',
      [UserRole.Producer]: 'Produtor',
      [UserRole.Technician]: 'Técnico',
      [UserRole.Root]: 'Super administrador',
    };
    return rolesMap[role] || 'Perfil desconhecido';
  };

  // Papel e tipo do usuário
  const getUserRoleDisplay = (): string => {
    if (!user) return 'Sem função';

    const role = getRole(user[User.Role]);
    if (role === 'Cooperativa') {
      return user.is_cooperative ? 'Cooperativa' : 'Associação';
    }

    return role;
  };

  // Handlers do Modal e Menu
  const handleModalOpen = () => {
    setModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => setModalOpen(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      {/* Modal de informações do usuário */}
      <GenericModal
        title="Minhas informações"
        onClose={handleModalClose}
        open={modalOpen}
      >
        <UpdateUserInfo modalHandleClose={handleModalClose} />
      </GenericModal>

      {/* Informações e avatar do usuário */}
      <Box className={classes.root}>
        <Box className={classes.userInfo}>
          <Typography className={classes.userName}>
            {user ? user[User.FirstName] : 'Usuário não identificado'}
          </Typography>
          <Typography className={classes.userRole}>
            {getUserRoleDisplay()}
          </Typography>
        </Box>

        <Avatar
          className={classes.avatar}
          src={user?.image_url || ''}
          alt={user ? user[User.FirstName] : 'Usuário'}
          onClick={handleMenuOpen}
        >
          {user && !user.image_url ? (
            `${user[User.FirstName][0]}${user[User.LastName]?.[0] || ''}`
          ) : (
            <SvgProducer style={{ width: '70%' }} />
          )}
        </Avatar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          keepMounted
        >
          <MenuItem onClick={handleModalOpen}>Ver perfil</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default LoggedUser;
