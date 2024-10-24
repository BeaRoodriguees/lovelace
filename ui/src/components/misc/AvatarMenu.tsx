import { Menu, rem, Avatar, MenuDivider } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';

export default function AvatarMenu() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Menu
      trigger="click-hover"
      openDelay={100}
      closeDelay={350}
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Avatar name={user?.username ?? undefined} color="initials"></Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Meu Perfil</Menu.Label>
        <MenuDivider />
        <Menu.Item
          onClick={() => signOut()}
          color="red"
          leftSection={
            <IconLogout2 style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Sair da Conta
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
