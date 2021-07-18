import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from  '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,  private router:Router) { }
  
//  params = new HttpParams();
  registerdata(item:any)
  {   
    return this.http.post("http://localhost:2222/register",{"data":item})
    
    
  }

  login(item:any)
  {   
    return this.http.post("http://localhost:2222/login",{"data":item})
    
}
   
  getUserName(id:any) {
    return this.http.get("http://localhost:2222/username",{
    params: new HttpParams().append('token', id)
  })
  
  }

  getfrnds(id:any) {
    return this.http.get('http://localhost:2222/frnds/'+id);

  }
  getallfrnds(id:any) {
    return this.http.get('http://localhost:2222/allfrnds/'+id);

  }
sendid(item:any){
  return this.http.post("http://localhost:2222/conversation",{"members":item})
}
msgdet(item:any){
  return this.http.post("http://localhost:2222/messages" , {"msgdet":item} )
}
getmsg(item:any) {
  return this.http.post('http://localhost:2222/convid',{"checkconv":item});

}
// getrecmsg(id1:any , id2:any) {
//   return this.http.get("http://localhost:2222/find/",{
//     // params: new HttpParams().append("id", id1 )
//      params : new HttpParams()
//     .set('id1', id1)
//     .set('id2', id2)
//   })

// }
getrecmsg(item:any){
  return this.http.post('http://localhost:2222/find',{"data":item})
}
name(id:any){
  return  this.http.get('http://localhost:2222/name/'+id)
}
loggedin(){
   
  return !!localStorage.getItem('token')
}

}
