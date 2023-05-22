<style lang='less'>
</style>
<template>
  <div>
    <Layout class="app-frame" v-if="!loading" :siderCollapsed="siderCollapsed" :siderFixed="layoutConfig.siderFixed">
      <Sider :theme="layoutConfig.siderTheme">
        <appMenu :theme="layoutConfig.siderTheme"></appMenu>
      </Sider>
      <Layout :headerFixed="layoutConfig.headerFixed">
        <HHeader theme="white">
          <appHead @openSetting="openSetting=true" :layoutConfig="layoutConfig"></appHead>
        </HHeader>
        <SysTabs v-if="layoutConfig.showSystab" homePage="Home"></SysTabs>
        <Content>
          <div class="app-frame-content">
            <!-- <keep-alive> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
          </div>
          <HFooter>
            <appFooter></appFooter>
          </HFooter>
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="openSetting" type="drawer-right">
      <appLayoutSetting :layoutConfig="layoutConfig"></appLayoutSetting>
    </Modal>
  </div>
</template>
<script>
import appHead from './app-header';
import appMenu from './app-menu';
import appFooter from './app-footer';
import store from 'js/vuex/store';
import { mapState } from 'vuex';
import { fullMenuKeys, isAuthPage } from 'js/config/menu-config';

export default {
  data() {
    return {
      loading: true,
      openSetting: false,
      layoutConfig: {
        siderTheme: 'white',
        showSystab: false,
        headerFixed: true,
        siderFixed: true
      }
    };
  },
  mounted() {
    // 如果无后台数据，将此处屏蔽
    this.init();

    // 如果无后台数据，将此处打开
    // this.loading = false;

    const listener = G.addlistener('SYS_MENU_REFRESH', () => {
      this.initMenu();
    });
    this.$once('hook:beforeDestroy', function () {
      G.removelistener(listener);
    });
  },
  methods: {
    init() {
      // 通知这里
      this.$Notice({
        type: 'error',
        icon: 'h-icon-bell',
        title: '刀具超限提醒',
        content: `机床SPM2，1把刀具寿命超限，请及时处理！`
      });

      // this.$Notice({
      //   type: 'error',
      //   icon: 'h-icon-bell',
      //   title: '刀具过寿提醒',
      //   content: `机床SPM5，存在3把刀具异常，请及时处理！`
      // });

      // this.$Notice({
      //   type: 'error',
      //   icon: 'h-icon-bell',
      //   title: '刀具过寿提醒',
      //   content: `机床SPM11，存在3把刀具异常，请及时处理！`
      // });

      // this.$Notice({
      //   type: 'error',
      //   icon: 'h-icon-bell',
      //   title: '刀具过寿提醒',
      //   content: `机床SPM3，存在5把刀具异常，请及时处理！`
      // });

      

      this.$Loading('加载中');
      R.User.info().then(resp => {
        if (resp.ok) {
          G.set('account', resp.body);
          store.dispatch('updateAccount', resp.body);
          this.initDict();
          this.initMenu();
        }
      });
    },
    initDict() {
      R.Dict.get().then(resp => {
        if (resp.ok) {
          let dicts = resp.body;
          for (let dict of dicts) {
            HeyUI.addDict(dict.name, dict.data);
          }
        }
        this.loading = false;
        this.$Loading.close();
      });
    },
    updateLayoutConfig({ key, value }) {
      this.layoutConfig[key] = value;
    },
    initMenu() {
      // 如果使用权限配置，配合后端获取请求的数据
      // R.Account.menus().then(resp => {
      //   if (resp.ok) {
      //     this.menus = getMenus(resp.body);
      //     this.menuSelect();
      //   }
      // });
      let menus = Utils.getLocal2Json('SYS_CONFIG_MENU') || fullMenuKeys;
      G.set('SYS_MENUS', menus);
      G.trigger('SYS_MENU_UPDATE');
      if (!isAuthPage(this.$route.name)) {
        this.$router.replace({ name: 'PermissionError' });
      }
    }
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  components: {
    appHead,
    appMenu,
    appFooter
  }
};
</script>
