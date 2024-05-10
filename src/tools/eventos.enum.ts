/* eslint-disable prettier/prettier */
export enum Eventos {

    ADMIN="Admin", //Envia Info al Admin
    CUSTOMER = "Customer", // Envia info al customer
    DELIVERY = "Delivery", // Envia info al Delivery
    UBICACION = "Ubicacion", // Envia coordenadas 
    DESCONECTAR ="disconnect", //SOLO SE USA EN BACK
    CONECTAR = "connect", // SOLO SE USA EN BACK
    CONFIGUSER ="salaRestaurant", //Configura al usuario en su sala (debe ir siempre en el evento connect) (debes mandar id del usuario dentro del payload) 



}

export enum Salas {

    ADMIN="salaRestaurant-Colaborador",
    DELIVERY ="salaRestaurant-Delivery",
    CUSTOMER = "salaRestaurant-Customer"
}

export enum Roles{
    ADMIN=0,
    GERENTE=1,
    COLABORADOR=2,
    USUARIO=3,
    EXTERNO=4
}

export enum Status{
    TOCONFIRM="TO CONFIRM",
    ACCEPTED = "ACCEPTED",
    CANCELLED = "CANCELLED",
    ONWALK="ON WALK",
    FINISHED="FINISHED",
    READY ="READY",
    PREPARING="PREPARING"
  }