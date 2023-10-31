import { Injectable } from '@angular/core';
import { IClient } from '../IClient';
import { CapacitorHttp } from '@capacitor/core';
import { HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class DbmanagerService {

  constructor() { }

  async addClient(client:IClient)
  {
	  const options = {
		  url: 'http://localhost:5000/client/add/',
		  headers: { 'Content-Type': 'application/json' },
		  data:client
	  };
	  const response: HttpResponse = await CapacitorHttp.post(options);

	  return response;
  }

  async getClients()
  {
	  const options = {
		  url: 'http://localhost:5000/client/get'
	  };

	  const response: HttpResponse = await CapacitorHttp.get(options);
	  return response.data;
  }

  async getClientbyID(id:any)
  {
	  const options = {
		  url: 'http://localhost:5000/client/'+id
	  };

	  const response: HttpResponse = await CapacitorHttp.get(options);
	  return response.data;
  }

  async updateClient(client:IClient)
  { 
	  const options = {
		  url: 'http://localhost:5000/client/update/'+ client.id,
		  headers: { 'Content-Type': 'application/json' },
		  data:client
	  };

	  const response: HttpResponse = await CapacitorHttp.put(options);
	  return response.data;
  }  

  async deleteClient(id:any)
  {
	  const options = {
		  url: 'http://localhost:5000/client/delete/'+id,
		  headers: { 'Content-Type': 'application/json' },

	  };
	
	  const response: HttpResponse = await CapacitorHttp.delete(options);
	  return response;
  }

}
