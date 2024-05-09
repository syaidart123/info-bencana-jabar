import PengajuanView from '@/components/Page/Admin/PengajuanView'
import submissionService from '@/services/pengajuan'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const PengajuanPage = () => {
  const [submission,setSubmission]=useState([])  
  const session : any= useSession()
  useEffect(()=>{
    const getSubmissions=async()=>{
      if(session.data?.accessToken && Object.keys(submission).length === 0){
        const {data} = await submissionService.getSubmission();  
        setSubmission(data.data)
      }
    }
    getSubmissions();
  }, [session, submission])
  return (
    <PengajuanView submission={submission} />
  )
}

export default PengajuanPage