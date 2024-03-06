import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = "https://fundoonotes.incubation.bridgelabz.com/api"
  private authHeader = new HttpHeaders({
    'Accept':"application/json",
    Authorization: localStorage.getItem('token') || ""
    
  })
  constructor(public http: HttpClient) {}
  
  loginApi(data:object){
  return this.http.post( `${this.baseUrl}/user/login`,data)

  }

  registerApi(data:object){
    return this.http.post(`${this.baseUrl}/user/userSignUp`,data);
  }

  getNoteList(){
    return this.http.get(`${this.baseUrl}/notes/getNotesList`,{headers:this.authHeader})
  }

  addNote(data: object){
    return this.http.post(`${this.baseUrl}/notes/addNotes`,data,{headers:this.authHeader})
  }

  archiveNote(requestBody: object) {
    return this.http.post(`${this.baseUrl}/notes/archiveNotes`, requestBody, { headers: this.authHeader });
  }

  // Add method to get archived notes
  getArchivedNotes() {
    return this.http.get(`${this.baseUrl}/notes/getArchiveNotesList`, { headers: this.authHeader });
  }

  deleteNote(requestBody: object) {
    return this.http.post(`${this.baseUrl}/notes/trashNotes`, requestBody, { headers: this.authHeader });
  }

  getDeletedNotes() {
    return this.http.get(`${this.baseUrl}/notes/getTrashNotesList`, { headers: this.authHeader });
  }
  
  deleteForever(delNote: object)
  {
    return this.http.post(`${this.baseUrl}/notes/deleteForeverNotes`,delNote,{headers: this.authHeader});    
  }
 
  changeColor(colNote: object)
  {
    return this.http.post(`${this.baseUrl}/notes/changesColorNotes`,colNote,{headers: this.authHeader});
  }
}