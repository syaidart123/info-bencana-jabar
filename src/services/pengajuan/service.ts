import { addData } from "@/lib/firebase/service";

export async function addSubmission(dataSubmission:{
    user:any;
    jenisBencana:string;
    lokasi:string;
    kebutuhan:{
        pangan?:number;
        pakaian?:number;
        keterangan?:string;
    }
    created_at?:Date;
    updated_at?:Date;
    dikelola?:any;
    status?:string;
    image?:string;
},callback:Function){
    dataSubmission.dikelola=""
    dataSubmission.status="Terkirim"
    dataSubmission.created_at= new Date();
    dataSubmission.updated_at= new Date();
    addData("submissions",dataSubmission,(result:boolean)=>{
        callback(result)
    })
}