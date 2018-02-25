import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    // get ID from URL
    this.id = this.route.snapshot.params['id'];

    // get Client from service(firebase) by ID
    this.clientService.getClient(this.id).subscribe(client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }

      this.client = client;
    });
  }

  updateBalance(id:string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance Updated!', {
      cssClass: 'alert-success',
      timeout: 4000
    });
    this.router.navigate([`/client/${this.id}`]);
  }

  onDeleteClick() {
    if (confirm('Are you sure you wish to delete client?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted!', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }
}
