import {getProdOrders} from "../http/api";

class ProdOrdersStore {
    #setProdOrders(prodOrders) {
        sessionStorage.setItem('ProdOrders', JSON.stringify(prodOrders))
    }

    getProdOrders() {
        return sessionStorage.getItem('ProdOrders') ?
            JSON.parse(sessionStorage.getItem('ProdOrders')) : []
    }

    getProdOrder(id) {
        const prodOrders = sessionStorage.getItem('ProdOrders') ?
            JSON.parse(sessionStorage.getItem('ProdOrders')) : []
        return prodOrders.find(prodOrder => prodOrder.ord_no === id)
    }

    updateProdOrders(mach_no) {
        return getProdOrders(mach_no).then(response => {
            this.#setProdOrders(response)
        }).catch(error => {
            console.log(error)
        })
    }

    needUpdate: false
}

export default new ProdOrdersStore()