import { mapGetters } from 'vuex'
const fs = require('fs')
export default {
  computed: {
    ...mapGetters({
      'config': "Config/config"
    }),
    getPhoto () {
      let { photoPic, path } = this.config
      let url = require('../assets/images/icon.png')
      if (photoPic) {
        let data = fs.readFileSync(path + '/source' + photoPic)
        let base64 = data.toString('base64')
        url = 'data:image/jpg;base64,' + base64
      }
      return url
    }
  }
}