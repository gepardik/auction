import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

Vue.component('loader', {
    template:
        `<div style="display: flex; justify-content: center; align-items: center;">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
        </div>`
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            currentProduct: {},
            products: []
        }
    },
    methods: {
        async changeProduct(event) {
            this.loading = true
            const id = event.target.value
            this.currentProduct = await request('https://api.osta.ee/api/items/active/' + id)
            this.loading = false
        },
    },
    async mounted() {
        this.loading = true
        this.products = await request('https://api.osta.ee/api/items/active')
        this.currentProduct = await request('https://api.osta.ee/api/items/active/' + this.products[0].itemId)
        this.loading = false
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })

        return await response.json()
    } catch (e) {
        console.warn('Error: ', e.message)
    }
}