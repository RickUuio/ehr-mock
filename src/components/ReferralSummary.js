

function ReferralSummary({referral}) {
  return (
      <div className="row table-hover px-3">
                  <div className='col-lg-6'>
                  <a href={referral.ServiceRequest.fullUrl}>
                    {referral.ServiceRequest.resource.resourceType} : {referral.ServiceRequest.resource.id}
                  </a>
                  </div>
                  <div className='col-lg-6'>
                  <a href={referral.Task.fullUrl}>
                    {referral.Task.resource.resourceType} : {referral.Task.resource.id}
                  </a>
                  </div>
                </div>
  )
}

export default ReferralSummary
