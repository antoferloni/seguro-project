import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mantenimiento-edit',
  templateUrl: './mantenimiento-edit.page.html',
  styleUrls: ['./mantenimiento-edit.page.scss'],
})
export class MantenimientoEditPage implements OnInit {

  mantenimiento: any = {};
  id: any;
  isNew: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private readonly firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log('params', params);
      this.id = params.id;

      if(params.id=='new'){
        this.isNew=true;
      }else{
        this.obtenerMantenimiento(this.id);
      }
    });
  }

  incluirMantenimiento = () => {
    console.log("Aqui incluir en firebase");
    let mantenimientoRef = collection(this.firestore, "mantenimiento");

    addDoc(mantenimientoRef, {
      codigo : this.mantenimiento.codigo,
      nombre : this.mantenimiento.nombre,
      apellido : this.mantenimiento.apellido,
      fecha: new Date(this.mantenimiento.fecha),
      asegurado: this.mantenimiento.asegurado,
      monto: this.mantenimiento.monto,
    }).then(doc => {
      console.log("Registro Incluido");
      this.router.navigate(['/mantenimiento-list']);
    }).catch(error => {
      console.error("Error:", error);
    });
  }

  guardarMantenimiento = () => {
    if (this.isNew) {
      this.incluirMantenimiento();
    }else{
      this.editarMantenimiento();
    }
  }

  editarMantenimiento = () =>{
    console.log("Aqui editar firebase");
    const document = doc(this.firestore, "mantenimiento", this.id);
    updateDoc(document, {
      codigo : this.mantenimiento.codigo,
      nombre : this.mantenimiento.nombre,
      apellido : this.mantenimiento.apellido,
      fecha: new Date(this.mantenimiento.fecha),
      asegurado: this.mantenimiento.asegurado,
      monto: this.mantenimiento.monto,
    }).then(doc => {
      console.log("Registro Editado");
      this.mostrarMensajeExito(); // Llama a la función para mostrar el mensaje de éxito
      this.router.navigate(['/mantenimiento-list']);
    }).catch(error => {
      console.error("Error al editar doctor:", error);
    });
  }

  // Función para mostrar el mensaje de éxito
  async mostrarMensajeExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se ha modificado con éxito!!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  obtenerMantenimiento = async (id: string) =>{
    console.log("Aqui editar firebase");
    const document = doc(this.firestore, "mantenimiento", id);
    getDoc(document).then(doc => {
      console.log("Registro a editar", doc.data());

      if(doc.data()){
        this.mantenimiento = doc.data();
        this.mantenimiento.fecha = this.mantenimiento.fecha.toDate().toISOString().substring(0,10)+"";
      }
    }) 
  }

}
