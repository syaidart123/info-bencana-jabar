import Modal from '@/components/UI/Modal'
import Button from '@/components/UI/Button'
import submissionService from '@/services/pengajuan'
import { useSession } from 'next-auth/react'
import React from 'react'

const ModalDeletePengajuan = (props:any) => {
    const {deletedSubmission,setDeletedSubmission,setDataSubmission}=props;
    const session :any = useSession();
    const handleDelete = async()=>{
        submissionService.deleteSubmission(deletedSubmission.id,session.data?.accessToken);
        setDeletedSubmission({});
        const {data} = await submissionService.getSubmission();
        setDataSubmission(data.data)
    }
  return (
    <Modal onClose={() => setDeletedSubmission({})}>
      <div className='flex flex-col'>
        <p>Yakin Mau dihapus?</p>
        <Button type='button' onClick={()=> handleDelete()} className='bg-red-500 text-white mt-5 px-5 hover:bg-red-600'>Delete</Button>
        <Button type='button' onClick={()=> setDeletedSubmission({})} className='bg-slate-100 text-black mt-3 px-5 hover:bg-slate-200'>Cencel</Button>
      </div>
    </Modal>
  )
}

export default ModalDeletePengajuan;