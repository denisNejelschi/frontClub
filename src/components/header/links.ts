export interface ILink {
  pathname: string;
  title: string;
}

export const links = (isAuthenticated: boolean, isAdmin: boolean): ILink[] => {
  const baseLinks: ILink[] = [
    {
      pathname: '/',
      title: 'Home',
    },
    {
      pathname: '/activityList',
      title: 'Courses',
    },
  ];

  // Ссылки для аутентифицированных пользователей
  if (isAuthenticated) {
    baseLinks.push({
      pathname: '/school',
      title: 'School',
    }
  );


    // Если пользователь администратор, добавляем ссылку на панель администратора
    if (isAdmin) {
      baseLinks.push({
        pathname: '/admin',
        title: 'Admin Panel',
      });
    }
  }

  return baseLinks;
};
