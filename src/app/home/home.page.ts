
import { HomeService } from './home.service';
import { Produtos } from './produtos';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  serv: HomeService
  produtos = new Array<Produtos>()
  id!: number
  nome!: string
  img!: string
  V!: number
  dt!: string

  constructor(service : HomeService) {
    this.serv = service
    service.getProdutos().subscribe(response => (this.produtos = response))
  }

  //Botão salvar
  onClickSave(){
    let proxID = this.produtos.length+1
    let p = new Produtos(proxID, this.nome, this.V, this.dt)

    this.serv.addProdutos(p).subscribe(response =>{
      this.produtos=response
      this.serv.getProdutos().subscribe(response=>(this.produtos = response))
    })
  }

  //Botão atualizar
  onClickUpdate(id:number, nome: string, V: number, dt: string){
    let p = new Produtos(id, nome, V, dt);
    
    this.serv.updateProdutos(id, p).subscribe(response =>{
      this.produtos=response
      this.serv.getProdutos().subscribe(response=>(this.produtos = response))
    })
  }

  //Botão deletar
  onClickDelete(id: number){
    let p = this.produtos[id-1]
    
    this.serv.deleteProdutos(id).subscribe(response =>{
      this.serv.getProdutos().subscribe(response=>(this.produtos = response))
    })
  }

  idDelete= -1;
  //Alert do deletar
  public alertButtons = [
    {
      text: 'Não',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Sim',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.onClickDelete(this.idDelete)
      }
    },
  ];

}