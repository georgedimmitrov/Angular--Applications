import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[];
  totalOwed: number;

  constructor(public clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;

      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce(
      (acc, curr) => acc + parseFloat(curr.balance),
      0
    );
  }
}
