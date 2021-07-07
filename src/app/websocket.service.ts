import { Injectable } from '@angular/core';
import  {io, Socket} from 'socket.io-client';
import { Observable, observable, Subscriber } from 'rxjs';
import { HttpClient, HttpParams } from  '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket:Socket

  // readonly url:string="http://localhost:3333"
  constructor(private http:HttpClient,) {
    this.socket=io("http://localhost:3333");
   }

   sendweb(data:any){
    this.socket.emit("addUser" , data)  //to send user id which is logged in 

      // this.socket.on("prvmsgs" , (msgs)=>{
      //       console.log(msgs)
            
      // }) 
      // this.socket.on("getMessage", (msg2)=>{
      //   console.log(msg2)
      //   })

    

} 
 getmsg(){
     
  return new Observable((Subscriber)=>{
    this.socket.on("getMessage"
      ,
      (data)=>{
        
      
      Subscriber.next(data)

    }
    )

  })
 }

 prvmsg(data:any){
  return new Observable((Subscriber)=>{
    this.socket.on("prvmsgs"
      ,
      (data)=>{
        
      
      Subscriber.next(data)

    }
    )

  })
 }


  
sendmsg(data:any){ // to send msg
  this.socket.emit("sendMessage", data );

}

recmsg(data:any){ 
  this.socket.emit("recmsg" , data)
  
}

}






  
