import Tabel from '@/components/UI/Tabel'
import submissionService from '@/services/pengajuan';
import React, { useEffect, useState } from 'react'

const PageDataBencana = () => {
  const [submission, setSubmission] = useState([]);
  useEffect(() => {
    const getSubmissions = async () => {
      if (Object.keys(submission).length === 0) {
        const { data } = await submissionService.getSubmission();
        setSubmission(data.data);
      }
    };
    getSubmissions();
  }, [submission]);
  return (
    <Tabel dataSubmission={submission} />
  )
}

export default PageDataBencana