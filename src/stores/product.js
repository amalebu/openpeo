import { defineStore } from "pinia";

export const ProductStore = defineStore('products', {
    state: () => ({
        products:[], 
        cart:[],
        tip: 0,
        uniqueCode: 0,
    }),
    getters: {
        getTotalinCart(state){
            return this.toCurrencyFormat(state.countTotalInCart);
        },
        getCountinCart(state){
            return state.cart.reduce((acc,cart) => acc + cart.quantity, 0);
        },
        getCountinCartPerItem(state){
            return (id) => state.cart.filter((item) => item.id === id).reduce((acc,item) => acc + item.quantity, 0);
        },
        getBiayaLayanan(state){
            return this.toCurrencyFormat(this.countBiayaLayanan);
        },
        countBiayaLayanan(){
            let biaya = 2000;
            if(this.countTotalInCart > 50000) biaya = 5000;
            
            let hitungan = this.countTotalInCart / 50;
            if(hitungan > biaya)
                biaya = hitungan;
            return biaya;
        },
        countTotalInCart(state){
            return state.cart.reduce((acc,cart) => acc + (cart.quantity * cart.price), 0);
        },
        getTipValue(state){
            return this.toCurrencyFormat(state.tip);
        },
        getTotalBelanja(){
            return this.toCurrencyFormat(this.countTotalInCart + Number(this.tip) + this.countBiayaLayanan + this.uniqueCode);
        }
    },
    actions: {
        async fetchProductList(){
            // if (localStorage.getItem("list_product")) {
                // this.products = JSON.parse(localStorage.getItem("list_product"));
            // }else{
                this.products = [
                    {
                        "category" : "Se'i Babi",
                        "lists" : [
                            {
                                "id": 1,
                                "title": "Seí Babi Asli Kupang 1 KG",
                                "description": "Sei babi asap aroma adalah makanan khas ASLI dari Kupang NTT.",
                                "category": "Se'i Babi",
                                "price": 300000,
                                "discountPercentage": 6.25,
                                "basePrice": 320000,
                                "tags": [
                                "non-halal",
                                "vakum",
                                ],
                                "weight": 1,
                                "thumbnail": "https://assets.promediateknologi.id/crop/36x715:681x1116/750x500/webp/photo/2022/12/15/3210744714.jpg"
                            },
                            {
                                "id": 2,
                                "title": "Seí Babi Asli Kupang 1/2 KG",
                                "description": "Sei babi asap aroma adalah makanan khas ASLI dari Kupang NTT.",
                                "category": "Se'i Babi",
                                "price": 160000,
                                "discountPercentage": 0,
                                "basePrice" : 160000,
                                "tags": [
                                "non-halal",
                                "vakum",
                                "setengah"
                                ],
                                "weight": 0.5,
                                "thumbnail": "https://assets.promediateknologi.id/crop/36x715:681x1116/750x500/webp/photo/2022/12/15/3210744714.jpg"
                            },
                            {
                                "id": 3,
                                "title": "Seí Babi Asli Kupang 1/4 KG",
                                "description": "Sei babi asap aroma adalah makanan khas ASLI dari Kupang NTT.",
                                "category": "Se'i Babi",
                                "price": 90000,
                                "discountPercentage": 0,
                                "basePrice" : 90000,
                                "tags": [
                                "non-halal",
                                "non-vakum",
                                ],
                                "weight": 0.5,
                                "thumbnail": "https://assets.promediateknologi.id/crop/36x715:681x1116/750x500/webp/photo/2022/12/15/3210744714.jpg"
                            },
                        ]
                    },
                    {
                        "category" : "Sambal Luat",
                        "lists" : [
                            {
                                "id": 4,
                                "title": "Sambal Luat Pedes Unik 300gr",
                                "description": "Sei babi asap aroma adalah makanan khas ASLI dari Kupang NTT.",
                                "category": "Sambal Luat",
                                "price": 30000,
                                "discountPercentage": 0,
                                "basePrice": 300000,
                                "tags": [
                                    "pedes maksimal"
                                ],
                                "weight": 1,
                                "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
                            },
                            {
                                "id": 5,
                                "title": "Seí Babi Asli Kupang 1/2 KG",
                                "description": "Sei babi asap aroma adalah makanan khas ASLI dari Kupang NTT.",
                                "category": "Sambal Luat",
                                "price": 16000,
                                "discountPercentage": 0,
                                "basePrice" : 160000,
                                "tags": [
                                    "pedes asik",
                                    "ukuran kecil",
                                ],
                                "weight": 0.5,
                                "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
                            },
                        ]
                    }
                ];
                // await fetch('https://dummyjson.com/products?limit=5')
                // .then(res => res.json())
                // .then(json => {
                //     console.log(json.products)
                //     this.products = json.products;
                // })
                // localStorage.setItem('list_product', JSON.stringify(this.products));
            // }
        },
        setCartItem(){
            localStorage.setItem('cart_list', JSON.stringify(this.cart));            
        },
        getCartItem(){
            if(localStorage.getItem("cart_list")){            
                this.cart = JSON.parse(localStorage.getItem("cart_list"));
            };
            if(localStorage.getItem("tip")){            
                this.tip = JSON.parse(localStorage.getItem("tip"));
            };
            this.generateRandomNumber();
        },
        addToCart(itemId){
            let index = this.cart.findIndex(product => product.id === itemId);
            if(index !== -1){
                this.cart[index].quantity += 1;                
            }else{
                let item = this.findById(itemId, this.products);
                if(item){
                    item.quantity = 1;
                    this.cart.push(item);
                }
            }
            this.setCartItem();
        },
        setTipValue(value){
            if(value == this.tip)
                this.tip = 0;
            else
                this.tip = value;
            localStorage.setItem('tip', JSON.stringify(this.tip));
        },
        findById (id, product, idx = 0){
            const item = product[idx].lists;
            if (!item) return null;
            let check = item.find(item => item.id === id);
            if(check != null){
                return check;
            }
            return this.findById(id, product, idx + 1);
        },
        removeFromCart(itemId){
            let index = this.cart.findIndex(product => product.id === itemId);
            if(index !== -1){
                this.cart[index].quantity -= 1;
                if(this.cart[index].quantity == 0){
                    this.cart = this.cart.filter(product => product.id !== itemId);
                }
            }
            this.setCartItem();
        },
        toCurrencyFormat(number){
            return new Intl.NumberFormat('id-ID').format(number);
        },
        generateRandomNumber(){
            this.uniqueCode = Math.floor((Math.random()*99) + 1);
        },

    }
});