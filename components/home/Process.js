import React from 'react'
import understand from "./../../public/assets/images/icons/understand.png"
import communicate from "./../../public/assets/images/icons/communicating.png"
import deliver from "./../../public/assets/images/icons/deliver.png"
import ProcessCard from './processCard'
function Process() {
    return (
        <>
        <div className="row">
            <ProcessCard
                image={understand}
                heading="UNDERSTAND"
                text="The most important step which we usually skip is to understand the concept and moto of the institution and there needs. It usually happens that we give what we want to and not according to requirement."
             />
            <ProcessCard
                image={communicate}
                heading="COMMUNICATE"
                text="After understanding next essential part whicharises is communication. The establishment of communication through a proper channel is important."
             />
            <ProcessCard
                image={deliver}
                heading="DELIVER"
                text="Last but not the least you reaching out to the NGO and delivering your skills,thoughts and help. NO FRAUD!! DIRECT CONTACT!!"
             />
        </div>  
        </>
    )
}

export default Process
