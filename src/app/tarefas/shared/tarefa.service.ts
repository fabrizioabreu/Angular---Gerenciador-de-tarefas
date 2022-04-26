import { Injectable } from '@angular/core';
import { Tarefa } from './tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() { }

  // Retorna a lista
  listarTodos(): Tarefa[] {
    const tarefas = localStorage['tarefas'];
    return tarefas ? JSON.parse(tarefas) : [];
  }

  // Inserir
  cadastrar(tarefa: Tarefa): void {
    const tarefas = this.listarTodos();
    tarefa.id = new Date().getTime();
    tarefas.push(tarefa);
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  // Buscar por ID
  buscarPorId(id: number): Tarefa {
    const tarefas: Tarefa[] = this.listarTodos();
    return tarefas.find(tarefa => tarefa.id === id);
  }

  // Update
  atualizar(tarefa: Tarefa): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach((objDaLista, index, lista) => {
      if (tarefa.id === objDaLista.id) {
        lista[index] = tarefa;
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  // Delete
  remover(id: number): void {
    let tarefas: Tarefa[] = this.listarTodos();
    tarefas = tarefas.filter( tarefa => tarefa.id !== id );
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

  // Update de único campo
  alterarStatus(id: number): void {
    const tarefas: Tarefa[] = this.listarTodos();
    tarefas.forEach((objDaLista, index, lista) => {
      if (id === objDaLista.id) {
        // Inverto a opção Boolean para True ou False
        lista[index].concluida = !objDaLista.concluida;
      }
    });
    localStorage['tarefas'] = JSON.stringify(tarefas);
  }

}
