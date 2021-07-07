import { Component, OnInit, OnDestroy } from '@angular/core';
import{DataService} from '../data.service';
import { Router } from '@angular/router';
import{WebsocketService} from '../websocket.service'
// import  io from 'socket.io-client';
import { JsonPipe } from '@angular/common';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private socket: any;
  

username =''
selectedUser=''
convdata=[{
  _id:'',
  senderid:'',
  recid:'',
 
  createdAt:'',
  updatedAt:''
}]
conversationid:any
msg=''
// msgdisplay : string[] = [];
sendmsg={
 
  from:"",
  to:'',
  msg:""
}
frnd={
  name:''
  
}
allfrnds={
  id:'',
  name:''
}
members={
  senderId:'',
  receiverId:''
}
checkconv={
  
  recid:'',
  userid:''
}

msgkittis ={
  to:'',
  msg:'',
  from:''
}

 
websocketfrom=''
websockettos=''
webscoketmsg=''
tomsg={
  to:""
}
msgarraysstore :any = []
msgstore :any = []
// msgsendarray :any = []
prvmsg=[{
  to :'',
  msg:'',
  from:''
}]
prvms=""
prvmsto=""
count: number = 0
  constructor(private dataservice:DataService , private router:Router, private websocket:WebsocketService) {
  
   }
   showcontent: Boolean = true;
   
  ngOnInit(): void {
    let id= localStorage.getItem("token")
    this.dataservice.getUserName(id).subscribe((data)=>{
      this.username=JSON.parse(JSON.stringify(data));
   
    this.websocket.sendweb(this.username)
      
      console.log(this.username)
   this.dataservice.getallfrnds(this.username).subscribe((data)=>{
     this.allfrnds =JSON.parse(JSON.stringify(data))

   })
 
  })



  this.showcontent = this.showcontent ? false : true

 
  this.websocket.prvmsg(this.username).subscribe((data:any)=>{
    this.prvmsg= data
    console.log(this.prvmsg)
    
    //  let obj = this.prvmsg.find((o, i) => {
    //   return o
    // })
    for (var i = 0; i < this.prvmsg.length; i++) {
      
      this.prvmsg[i];
      console.log(this.prvmsg[i])
     
     
      this.msgarraysstore.push(this.prvmsg[i] )
      if(this.prvmsg[i] != null){
        this.msgstore.push(this.prvmsg[i])
        this.websocket.recmsg(this.prvmsg[i])

      }
  }
    // for (var index in this.prvmsg){

    //   this.msgarraysstore.push({"msg" : obj?.msg , "from" : obj?.from} )
    //   console.log(this.msgarraysstore)
    // index=index+1
    // }
    // console.log(this.prvmsg.from+ "prvfrom")
   
         })

  this.websocket.getmsg().subscribe((data:any)=>{
    this.msgkittis = data
    
    this.websocket.recmsg(this.msgkittis)
    console.log(this.msgkittis)
    this.webscoketmsg= this.msgkittis.msg
    this.websocketfrom= this.msgkittis.from
    this.websockettos =this.msgkittis.to
    console.log(this.websocketfrom)
    this.msgarraysstore.push({"msg" : this.webscoketmsg , "from" : this.websocketfrom, "to" : this.websockettos} )
    console.log(this.webscoketmsg + "msg")
    console.log(this.msgarraysstore)
   

  })

  }



frnds={
  id:'',
  name:''
}

// dismsg(to:any,from:any){
  
//   console.log(to)
//   console.log(from)
//   console.log(this.websocketfrom + "fromweew")
//   console.log(this.websocketto+"werto")
  
// }

  frndata(){

    this.dataservice.getfrnds(this.frnd.name).subscribe((data)=>{
      this.frnds=JSON.parse(JSON.stringify(data));
      // console.log(this.frnds)
   })
  }
recmsgs={
  convid:'',
  from:'',
  to:'',
  msg:''
}
data2:any

  frndchat(allfrnd:any){// when clicked on specific user a conversation db is formed with that specific user s id and senders s id 
    this.count++
    this.members.receiverId = allfrnd._id
    this.tomsg.to = allfrnd._id
    this.members.senderId =this.username
  this.checkconv.recid = this.members.receiverId

    // creatiing chatconvo with specific frnds with unique conv id to all frnds praanth aayi 
   
   console.log(this.tomsg.to + "to?")
   
   
 this.dataservice.getrecmsg({"from":allfrnd._id ,"to": this.username}).subscribe((data)=>{
   console.log(data)
  this.data2  = JSON.parse(JSON.stringify(data))
   for (var i = 0; i < this.data2.length; i++) {
      
    console.log(this.data2[i]);
    
   
   
    this.msgarraysstore.push(this.data2[i] )
   }
 
}) 

if(this.count%2 ==0){
this.msgarraysstore.splice(0, this.msgarraysstore.length)
}

 this.checkconv.userid = this.username
  this.disp() // retreive previously send msgss

  
    
    // console.log(this.members)
    this.selectedUser =allfrnd.name
   
    this.showcontent = this.showcontent ? true: true
    // this.dismsg(allfrnd._id , this.username)

     
    
      
}
// after entering the data and hitting the sumbit then only send msg would be displayed
Mgstype(event: { key: string; }){
    

  if (event.key=="Enter"){
    this.send()
      
  }
}


sendmsgdetails={ // array for storing user specific details and sending to server 
  convid:'',
  from:'',
  msg:''
}

send(){
this.sendmsg.from =this.username
this.sendmsg.msg=this.msg
this.sendmsg.to =this.checkconv.recid
this.websocket.sendmsg(this.sendmsg) // sending data to websocket 
  this.dataservice.msgdet(this.sendmsg).subscribe((data)=>{
    
    this.sendmsgdetails =JSON.parse(JSON.stringify(data))
    
    this.disp() // to display msg after sending it 
  
  })
  
 
}
recmsgstatus={
  convid:'',
  from:'',
  to:'',
  msg:''
  
}
disp(){
 
  this.dataservice.getmsg(this.checkconv).subscribe((data)=>{
    // console.log(data)
    this.recmsgstatus =JSON.parse(JSON.stringify(data))
 
    if(this.recmsgstatus.msg =="null"){
    
      this.recmsgs=JSON.parse(JSON.stringify(data))
    
    }else{
    this.recmsgs=JSON.parse(JSON.stringify(data));
    }
    
  })
}

}
// console.log("herer")
// let msg :any   = this.msgkittis.filter(x => x.includes(this.tommsg))
// this.msgarraysstore.push(msg)
// console.log(this.msgarraysstore)
// let dispmsg :any   = this.msgarraysstore.filter(x => x.includes(this.username))
// if(dispmsg !=""){
// this.msgarraysdisp.push(dispmsg)
// console.log(this.msgarraysdisp)
// }

// else{
//  this.msgarraysstore.splice(0, this.msgarraysstore.length)
//  console.log("no push")
// }
