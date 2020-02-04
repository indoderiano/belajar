class Orang{
    constructor(nama,usia){
        this.nama=nama
        this.usia=usia
    }
}


// class Pegawai{
//     constructor(nip,nama,usia,jabatan){
//         this.nip=nip
//         this.nama=nama
//         this.usia=usia
//         this.jabatan=jabatan
//     }
// }


class Pegawai extends Orang{
    constructor(nip,nama,usia,jabatan){
        super(nama,usia)
        this.nip=nip
        this.jabatan=jabatan
    }
    static test(){
        console.log('test')
        return 'terserah'
    }

    
}


var obj=new Pegawai(2,'testnama',18,'Pegawai')

// console.log(Pegawai.test())




var janji=new Promise((tepati,ingkari)=>{

    let dipenuhi=true
    if(dipenuhi){
        tepati('Janji ditepati')
    }else{
        ingkari('Janji diingkari')
    }
})

console.log(janji)

janji.then(janjikutepati=>{
    console.log(janjikutepati)
}).catch(janjikuingkari=>{
    console.log(janjikuingkari)
})

console.log(janji.then)