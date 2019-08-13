import { mapGetters } from 'vuex'
const path = require('path')
const fs = require('fs')
export default {
  computed: {
    ...mapGetters({
      'config': 'Config/config'
    }),
    getPhoto () {
      let { photoPic } = this.config
      let currentPath = path.join(this.config.path, `/source/_posts/${photoPic}`)
      let url = require('../assets/images/icon.png')
      if (photoPic) {
        let data = fs.readFileSync(currentPath)
        let base64 = data.toString('base64')
        url = 'data:image/jpg;base64,' + base64
      }
      return url
    }
  }
}
