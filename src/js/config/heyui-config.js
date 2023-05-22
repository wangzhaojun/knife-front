
const heyuiConfig = () => {
  HeyUI.config('dict.keyName', 'key');
  HeyUI.config('dict.titleName', 'title');

  HeyUI.config('menu', {
    keyName: 'key',
    titleName: 'title',
    childrenName: 'children'
  });
};

export default heyuiConfig;
