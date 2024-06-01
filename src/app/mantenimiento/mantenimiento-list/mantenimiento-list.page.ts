import { Component, OnInit } from '@angular/core';
import { Firestore, query, startAfter, limit, collection, getDocs, where, doc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-mantenimiento-list',
  templateUrl: './mantenimiento-list.page.html',
  styleUrls: ['./mantenimiento-list.page.scss'],
})
export class MantenimientoListPage implements OnInit {

  constructor(
    private readonly firestore: Firestore,
    private router: Router,
    private alertController: AlertController, 
  ) { }

  listaMantenimiento = new Array();
  lastVisible: any = null;
  results: any[] = [];
  isSearch: boolean=false;
  query="";
  li=10;
  id:any;

  ngOnInit() {
    this.listarMantenimiento();
  }

  ionViewWillEnter() {
    console.log("gfsgfdsfds");
    this.listaMantenimiento = [];
    this.lastVisible = null;
    this.listarMantenimiento();
  }

listarMantenimientoSinFiltro = () =>{
  console.log("listar mantenimiento");
const MantenimientoRef = collection(this.firestore, 'mantenimiento');

let q;
if (this.lastVisible) {
  q = query(MantenimientoRef, limit(this.li), startAfter(this.lastVisible));
} else {
  q = query(MantenimientoRef, limit(this.li));
}

getDocs(q).then(re => {
if (!re.empty){
  this.lastVisible = re.docs[re.docs.length - 1];
  re.forEach(doc => {
    let mantenimiento: any = doc.data();
    mantenimiento.id = doc.id;
    this.listaMantenimiento.push(mantenimiento);
  });
 }
});

}

listarMantenimiento = () => {
  console.log("Listar mantenimiento");
  const mantenimientoRef = collection(this.firestore, 'mantenimiento');
  if ((this.query + "").length > 0) {
    let q = undefined;
    if(this.lastVisible){
      q = query(mantenimientoRef, 
        where("nombre", ">=", this.query.toUpperCase()),
        where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
        limit(this.li),
        startAfter(this.lastVisible));

    }else{
      q = query(mantenimientoRef, 
        where("nombre", ">=", this.query.toUpperCase()),
        where("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
        limit(this.li));
    }

    getDocs(q).then(re => {
      if (!re.empty) {
        this.listaMantenimiento = []; // Limpiar la lista antes de agregar los resultados de la búsqueda

        let nuevoArray = new Array();
        for(let i=0; i< re.docs.length; i++){
          const doc : any = re.docs[i].data();

          if(doc.nombre.toUpperCase().startsWith(this.query.toUpperCase().charAt(0)
          )
          ){
          nuevoArray.push(re.docs[i])
          }
        }

        this.lastVisible = re.docs[nuevoArray.length-1];
        for (let i = 0; i < nuevoArray.length; i++) {
          const doc : any = nuevoArray[i];
          let mantenimiento : any = doc.data();
          mantenimiento.id = doc.id;
          this.listaMantenimiento.push(mantenimiento); 
        }
      }
    });
  } else {
    this.listarMantenimientoSinFiltro(); // Llamar a la función sin filtro cuando no hay cadena de búsqueda
  }
}

  onIonInfinite(ev: any){
    this.listarMantenimiento();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  clickSearch = () => {
    this.isSearch = true;
  }

  clearSearch = () =>{
    this.isSearch = false;
    this.query = "";

    this.listaMantenimiento = new Array();
    this.lastVisible = null;
    this.listarMantenimiento();
  }

  buscarSearch = (e:any) =>{
    this.isSearch = false;
    this.query = e.target.value;

    this.listaMantenimiento  = new Array();
    this,this.lastVisible = null;
    this.listarMantenimiento();
  }

  async eliminarMantenimiento(id: string) {
    const alert = await this.alertController.create({
      header: 'Seguro deseas eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            console.log('Alert confirmed');
            const documentRef = doc(this.firestore, "mantenimiento", id);
            try {
              await deleteDoc(documentRef);
              console.log("Registro Eliminado");
              this.resetList(); // Resetea la lista y vuelve a cargar los doctores
            } catch (error) {
              console.error("Error al eliminar el registro:", error);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  resetList() {
    this.listaMantenimiento = [];
    this.lastVisible = null;
    this.listarMantenimiento
    ();
  }


}


