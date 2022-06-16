<template>
  <nav>
    <div class="logo" @click="move('/')">
      <div class="logo-text">WMS</div>
      <div class="logo-description">by Lee Keun Ho</div>
    </div>

    <div class="nav-item" @click="move('/')">
      API리스트
    </div>

    <div class="description">
      Web-tech-team<br>
      Mock<br>
      Service
    </div>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    move(url){
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/var.scss';

nav {
  position: fixed;
  background-color: $SidebarBgColor;
  width: $SidebarWidth;
  min-width: $SidebarWidth;
  height: 100vh;
  top: -1px;
  user-select: none;
}
.logo {
  width: 180px;
  height: 100px;
  margin: 10px 10px 30px 10px;
}
.logo-text {
  text-align: center;
  font-size: 40px;
  color: white;
}
.logo-description {
  text-align: center;
  font-size: 20px;
  color: white;
  font-style: italic;
}
.nav-item {
  background-color: white;
  min-width: 180px;
  height: 50px;
  text-align: center;
  margin: 10px 10px;
  line-height: 50px;
}
.description {
  position: fixed;
  color: white;
  bottom: 30px;
  margin-left: 15px;
  font-style: italic;
}
</style>
