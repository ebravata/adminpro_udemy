export class Usuario {

    constructor (  // Al final van los opcionales
        public nombre: string,
        public email: string,
        public password:string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {}
}