const fullMenus = [
  // {
  //   title: 'Dashboard',
  //   key: 'Home',
  //   icon: 'icon-monitor',
  //   count: 1
  // },

  {
    title: '刀具管理',
    key: 'tablelist',
    icon: 'icon-cog',
    children: [
      {
        title: '机床列表',
        key: 'TableBasic',
        icon: 'icon-server',
        children: [
          {
            title: 'SPM1',
            key: 'View1',
            icon: 'icon-monitor',
            count: 0
          }, {
            title: 'SPM2',
            key: 'View2',
            icon: 'icon-monitor',
            count: 5
          }, {
            title: 'SPM3',
            key: 'View3',
            icon: 'icon-monitor',
            count: 1
          }, {
            title: 'SPM4',
            key: 'View4',
            icon: 'icon-monitor',
            count: 2
          }, {
            title: 'SPM5',
            key: 'View5',
            icon: 'icon-monitor',
            count: 2
          }, {
            title: 'SPM6',
            key: 'View6',
            icon: 'icon-monitor',
            count: 0
          }, {
            title: 'SPM7',
            key: 'View7',
            icon: 'icon-monitor',
            count: 0
          }, {
            title: 'SPM8',
            key: 'View8',
            icon: 'icon-monitor',
            count: 2
          }, {
            title: 'SPM9',
            key: 'View9',
            icon: 'icon-monitor',
            count: 2
          }, {
            title: 'SPM10',
            key: 'View10',
            icon: 'icon-monitor',
            count: 0
          }, {
            title: 'SPM11',
            key: 'View11',
            icon: 'icon-monitor',
            count: 5
          }, {
            title: 'SPM12',
            key: 'View12',
            icon: 'icon-monitor',
            count: 0
          }, {
            title: 'SPM13',
            key: 'View13',
            icon: 'icon-monitor',
            count: 2
          }, {
            title: 'SPM14',
            key: 'View14',
            icon: 'icon-monitor',
            count: 1
          }, {
            title: 'SPM15',
            key: 'View15',
            icon: 'icon-monitor',
            count: 0
          }
        ]
      }
    ]
  }
];

const getMenus = function (menuIdList = []) {
  return getAuthMenu(fullMenus, menuIdList);
};

let getAuthMenu = (menus, menuIdList) => {
  let configMenu = [];
  for (let menu of menus) {
    let m = Utils.copy(menu);
    if (menuIdList.indexOf(m.key) > -1) {
      configMenu.push(m);
    }
    if (menu.children && menu.children.length) {
      m.children = getAuthMenu(menu.children, menuIdList);
    }
  }
  return configMenu;
};

const getKeys = function (menus) {
  let keys = [];
  for (let menu of menus) {
    keys.push(menu.key);
    if (menu.children && menu.children.length) {
      keys.push(...getKeys(menu.children));
    }
  }
  return keys;
};

let fullMenuKeys = getKeys(fullMenus);

const isAuthPage = function (name) {
  let menus = G.get('SYS_MENUS') || [];
  if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
    return false;
  }
  return true;
};

export { getMenus, fullMenus, fullMenuKeys, isAuthPage };
