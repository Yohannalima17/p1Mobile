export class Produtos{
    id: number;
    nome: string;
    img: string;
    V: number;
    dt: string;

    constructor(id:number, nome:string, V:number, dt:string){
        this.id = id;
        this.nome = nome;
        this.img = 'https://www.aalpha.net/wp-content/uploads/2020/01/ionic.png';
        this.V = V;
        this.dt = dt;
    }
}