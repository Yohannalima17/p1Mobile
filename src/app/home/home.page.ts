
import { Form } from '@angular/forms';
import { HomeService } from './home.service';
import { Produtos } from './produtos';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { max } from 'rxjs';

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
    let maxID = 0
    this.produtos.forEach(function(prod:Produtos){
      if(maxID<prod.id){
        maxID = prod.id
      }
    })
    maxID++
    let p = new Produtos(maxID, this.nome, this.V, this.dt)

    this.serv.addProdutos(p).subscribe(response =>{
      this.serv.getProdutos().subscribe(response=>(this.produtos = response))
    })
    
    this.nome ='';
    this.V = 0;
    this.dt = '';
  }

  //Botão atualizar
  onClickUpdate(p: Produtos){
    this.id = p.id;
    this.nome = p.nome;
    this.V = p.V;
    this.dt = p.dt;
  }

  onClickSaveUpdate(id: number){
    let p = new Produtos(id, this.nome, this.V, this.dt)

    this.serv.updateProdutos(id, p).subscribe(response =>{
      this.produtos=response
      this.serv.getProdutos().subscribe(response=>(this.produtos = response))
    })
    this.nome ='';
    this.V = 0;
    this.dt = '';
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