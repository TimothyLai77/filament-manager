import React from "react";
import { useParams } from "react-router-dom";



const CommitStagedJobPage = () => {
    const { jobId } = useParams();
    //todo: probably some check to see if jobid is a staged job or not.
    // just check if it has a spoolId property or somethign
    return <h1>commit page for {jobId}</h1>
}

export default CommitStagedJobPage;