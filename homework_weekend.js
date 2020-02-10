
class Produk{
    constructor(nama,harga,gambar,stok){
        this.nama=nama,
        this.harga=harga,
        this.gambar=gambar,
        this.stok=stok
    }
}

var produkList=[
    new Produk('Chitato',10000,'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-3982346/chitato_chitato_sapi_panggang_35_gr_bks_snack_pabrikan_____full02.jpg',100),
    new Produk('Chitos',8000,'https://jorgemariouribe.com/tienda/image/cache/data/CHITOS%20TICOS%20PQTE%20X%2012-500x500.jpg',100),
    new Produk('Taro',9000,'https://cdn.kmall.id/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/t/a/taro_taro-net-seaweed-snack--40-g-_full02.jpg',100),
    new Produk('Lays',12000,'https://cf.shopee.co.id/file/f6acdc2c73b26b46087c1a50ad738aff',100),
    new Produk('Mr Potato',11000,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTV_snJZYPSaGKeQ-yqIWS7JXMWfnSZ5qIxX5kZJXKqbW104t8Q',100)
]

class CartProduk extends Produk{
    constructor(nama,harga,gambar,stok,jumlah){
        super(nama,harga,gambar,stok),
        this.jumlah=jumlah
    }
}


var cartList=[]
var timer
var totalHarga=0
var totalJumlah=0


function printTokoList(list){
    var listText=''
    list.forEach((val,index)=>{
        listText+=`<tr> 
        <td>${index+1}</td>
        <td>${val.nama}</td>
        <td>Rp${val.harga},00</td>
        <td><img src="${val.gambar}"></td>
        <td>${val.stok}</td>
        <td><button onclick="addProduk(${index})">add to cart</button></td>
    </tr>`
    })
    document.getElementById('tableProduk').innerHTML=listText
}

printTokoList(produkList)

function addProduk(produkindex){
    var check=false
    // menambah produk yang sudah di cart
    cartList.forEach((val,index)=>{
        if(val.nama==produkList[produkindex].nama){
            val.jumlah+=1
            check=true
        }
    })
    // produk baru ditambah
    if(check==false){
        cartList.push(produkList[produkindex])
        cartList[cartList.length-1].jumlah=1
    }
    hitungJumlah()
    printCartList(cartList)
    produkList[produkindex].stok-=1
    printTokoList(produkList)

    clearInterval(timer)
    startTimer(30)
}

function printCartList(list){
    var listText=''
    list.forEach((val,index)=>{
        listText+=`<tr>
        <td>${val.nama}</td>
        <td>${val.harga}</td>
        <td><img src="${val.gambar}"></td>
        <td>${val.jumlah}</td>
        <td>Rp${val.jumlah*val.harga}</td>
        <td><button onclick="deleteCartProduk(${index})">delete</button></td>
    </tr>`
    })
    document.getElementById('tableCart').innerHTML=listText
    if(totalJumlah==0){
        document.getElementById('totalJumlah').innerHTML=``
    }else{
        document.getElementById('totalJumlah').innerHTML=`Belanjaan Kamu ${totalJumlah}`
    }
    if(totalHarga==0){
        document.getElementById('totalHarga').innerHTML=``
    }else{
        document.getElementById('totalHarga').innerHTML=`Total yang Kamu Harus Bayar Rp${totalHarga},00<br>`
    }
    console.log(totalJumlah)
    if(totalJumlah==0){
        document.getElementById('pembayaran').innerHTML=``
    }else{
        // document.getElementById('pembayaran').style.display=""
        console.log('test')
        document.getElementById('pembayaran').innerHTML=`<h5 id="pembayaran">Rp<input type="text" id="uangMasuk" onchange="bayarCart()"> <button onclick="bayarCart()">Bayar</button></h5>`
    }

}

function deleteCartProduk(index){
    // add stok back to store
    produkList.forEach((val,i)=>{
        if(val.nama==cartList[index].nama){
            val.stok+=1
        }
    })
    // substract produk cart by 1
    cartList[index].jumlah-=1
    if(cartList[index].jumlah==0){
        cartList.splice(index,1)
    }
    // now that cost is changed
    hitungJumlah()
    printTokoList(produkList)
    printCartList(cartList)
    if(totalJumlah==0){
        clearInterval(timer)
        document.getElementById('sisaWaktu').innerHTML=``
    }
}

function hitungJumlah(){
    // total jumlah belanja
    totalJumlah=0
    totalHarga=0
    cartList.forEach((val)=>{
        totalJumlah+=val.jumlah
        totalHarga+=val.jumlah*val.harga
    })
}

function startTimer(t){
    if(t==0){
        // add stok back to store
        cartList.forEach((val,index)=>{
            produkList.forEach((arr,i)=>{
                if(arr.nama==val.nama){
                    arr.stok+=val.jumlah
                }
            })
        })
        // empty the cart
        cartList=[]
        totalHarga=0
        totalJumlah=0
        printCartList(cartList)
        printTokoList(produkList)
        clearInterval(timer)
        document.getElementById('sisaWaktu').innerHTML=``
    }else{
        document.getElementById('sisaWaktu').innerHTML=`Waktu Tersisa ${t} detik`
        timer=setTimeout(function (){
            startTimer(t-1)
        },1000)
    }
}

function bayarCart(){
    var uang=document.getElementById('uangMasuk').value
    if(totalHarga<=uang){
        // printTokoList(produkList) // no need
        clearInterval(timer)
        cartList=[]
        totalJumlah=0
        printCartList(cartList)
        document.getElementById('totalHarga').innerHTML=`Kembalian Anda Rp${uang-totalHarga}<br><br><span style="color: green;">Terimakasih</span>`
        document.getElementById('sisaWaktu').innerHTML=``
        totalHarga=0

    }else{
        document.getElementById('totalHarga').innerHTML=`Total yang Kamu Harus Bayar Rp${totalHarga},00
        <br><br><span style="color: Red;">Pembayaran masih kurang</br>`
    }
}

