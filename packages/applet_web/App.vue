<script>
import { isNumber } from '@hotel/utils'
import { CBtn } from '@hotel/components'
import { fetchUsersList } from '@hotel/apis'
console.log(isNumber('11sda'), 'isNumber========');
const res = fetchUsersList()
console.log('res========', res);

	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
