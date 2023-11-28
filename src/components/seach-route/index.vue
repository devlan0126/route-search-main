<template>
  <div id="searchRouteDialog" class="search-route-wrap" v-if="showSeach">
    <div class="search-route-dialog">
      <div class="search-route-input">
        <input
          ref="inputRef"
          type="text"
          class="search-input"
          v-model="keywords"
          @input.prevent="searchHandle"
          placeholder="请输入关键字"
        />
      </div>
      <div class="search-route-result">
        <template v-if="result.length > 0">
          <div
            class="result-item"
            v-for="(item, index) in result"
            :key="index"
            @click="link(item)"
            :class="{ high: index === highIndex }"
          >
            <div>
              {{ index + 1 }}. {{ (item.meta && item.meta.title) || "-" }}
            </div>
            <div style="margin-left: 20px; margin-top: 8px; font-size: 15px">
              {{ item.path }}
            </div>
          </div>
        </template>
        <div class="no-result" v-else>No Result</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchRoute",
  data() {
    return {
      result: [],
      keywords: "",
      flatRoutes: [],
      showSeach: false,
      highIndex: 0,
    };
  },
  computed: {
    routes() {
      return JSON.stringify(this.$router.options.routes);
    },
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        this.open();
        e.stopPropagation();
        e.preventDefault();
        this.$nextTick(() => {
          this.$refs.inputRef.focus();
        });
        return false;
      }

      if (e.key === "ArrowDown") {
        this.highIndex++;
        if (this.highIndex > this.result.length - 1) {
          this.highIndex = 0;
        }
        return false;
      }
      if (e.key === "ArrowUp") {
        this.highIndex--;
        if (this.highIndex < 0) {
          this.highIndex = 0;
        }
        return false;
      }
      if (e.key === "Enter") {
        if (this.highIndex > -1 && this.result.length > 0) {
          this.link(this.result[this.highIndex]);
        }
        return false;
      }
    });
    window.addEventListener("click", (e) => {
      if (
        document.querySelector("#searchRouteDialog") &&
        !document.querySelector("#searchRouteDialog").contains(e.target)
      ) {
        this.showSeach = false;
      }
    });
  },
  methods: {
    open() {
      this.showSeach = true;
      this.keywords = "";
      this.result = [];
    },
    traverseRoutes(routes) {
      if (routes && routes.length > 0) {
        routes.forEach((r) => {
          if (r.children && r.children.length > 0) {
            this.traverseRoutes(r.children);
          } else {
            this.flatRoutes.push(r);
          }
        });
      }
    },
    findRoutesByKeys(keywords) {
      this.flatRoutes = [];
      this.traverseRoutes(this.$router.options.routes);
      const target = this.flatRoutes.filter((fr) => {
        return (
          (fr.path && fr.path.includes(keywords)) ||
          (fr.name && fr.name.includes(keywords)) ||
          (fr.meta && fr.meta.title && fr.meta.title.includes(keywords))
        );
      });
      this.result = target.map((ele) => {
        const rs = this.$router.resolve({
          name: ele.name,
        });
        return {
          ...ele,
          path: rs.href,
        };
      });
      this.highIndex = 0;
    },
    searchHandle() {
      if (this.keywords) {
        this.findRoutesByKeys(this.keywords);
      }
    },
    link(route) {
      this.$router.push({
        name: route.name,
      });
      this.showSeach = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-route-wrap {
  width: 600px;
  min-height: 300px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  background: #242424;
  border-radius: 6px;
  padding: 12px;
  z-index: 100; /*优先*/
  /* 实现对浏览器窗口的垂直居中 */
  position: fixed;
  left: 50%;
  top: 200px;
  transform: translate(-50%);
}
.search-route-wrap .search-route-dialog {
}
.search-route-input {
  display: flex;
  width: 100%;
}
.search-route-input {
}
.search-input {
  -web-kit-appearance: none;
  -moz-appearance: none;
  align-items: center;
  background: transparent;
  border-radius: 4px;
  box-shadow: none;
  display: flex;
  height: 56px;
  margin: 0;
  padding: 0 12px;
  position: relative;
  width: 100%;
  border: 0;
  color: #fff;
  font-size: 17px;
}
.search-route-result {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  color: #fff;
}
.result-item {
  font-size: 18px;
  color: blue;
  cursor: pointer;
  color: #fff;
  background: #2f2f2f;
  width: 100%;
  text-align: left;
  padding: 12px;
  border-radius: 6px;
}
.result-item:hover {
  /* color: #fff;
  background: #42b883; */
}
.result-item.high {
  color: #fff;
  background: #42b883;
}
.result-item div {
  line-height: 25px;
  height: 25px;
}

input[type="text"] {
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #c8cccf;
  color: #fff;
  -web-kit-appearance: none;
  -moz-appearance: none;
  display: block;
  outline: 0;
  padding: 0 1em;
  text-decoration: none;
  width: 100%;
}
input[type="text"]:focus {
  border: 1px solid #42b883;
}

.no-result {
  color: rgba(231, 229, 229, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
  padding: 18px;
}
</style>
